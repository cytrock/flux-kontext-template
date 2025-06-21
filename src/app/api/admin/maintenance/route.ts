import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { 
  respData, 
  respAuthErr, 
  respInternalErr,
  withErrorHandler 
} from "@/lib/utils/response"
import { runSystemMaintenance } from "@/lib/tasks/order-cleanup"
import { getOrderStatistics, getPaymentProviderStats } from "@/lib/services/payment-database"

/**
 * 系统维护API - 只允许管理员访问
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  // 1. 验证管理员权限
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return respAuthErr("Authentication required")
  }
  
  // 2. 检查是否为管理员（这里可以根据实际需求调整）
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
  if (!adminEmails.includes(session.user.email)) {
    return respAuthErr("Admin access required")
  }
  
  console.log(`🔧 管理员 ${session.user.email} 触发系统维护`)
  
  // 3. 执行系统维护任务
  const results = await runSystemMaintenance()
  
  return respData({
    message: "System maintenance completed successfully",
    results,
    timestamp: new Date().toISOString(),
    triggeredBy: session.user.email
  })
})

/**
 * 获取系统状态 - 只允许管理员访问
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  // 1. 验证管理员权限
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return respAuthErr("Authentication required")
  }
  
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
  if (!adminEmails.includes(session.user.email)) {
    return respAuthErr("Admin access required")
  }
  
  // 2. 获取系统状态 - 使用静态导入
  const [orderStats, providerStats] = await Promise.all([
    getOrderStatistics(),
    getPaymentProviderStats(24)
  ])
  
  return respData({
    system: {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    },
    orders: orderStats,
    providers: providerStats,
    environment: {
      nodeEnv: process.env.NODE_ENV,
      stripeEnabled: !!process.env.STRIPE_PRIVATE_KEY,
      creemEnabled: !!process.env.CREEM_API_KEY
    }
  })
}) 