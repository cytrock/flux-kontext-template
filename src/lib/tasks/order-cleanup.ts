import { 
  getExpiredOrders, 
  markOrdersAsExpired,
  getOrderStatistics,
  getPaymentProviderStats 
} from "@/lib/services/payment-database"

/**
 * 订单清理任务 - 处理过期订单
 */
export async function cleanupExpiredOrders() {
  try {
    console.log("🧹 开始清理过期订单...")
    
    // 1. 获取所有过期的待支付订单
    const expiredOrders = await getExpiredOrders()
    
    if (expiredOrders.length === 0) {
      console.log("✅ 没有过期订单需要处理")
      return { processed: 0, errors: 0 }
    }
    
    console.log(`📋 发现 ${expiredOrders.length} 个过期订单`)
    
    // 2. 批量标记为过期
    const orderIds = expiredOrders.map(order => order.id)
    await markOrdersAsExpired(orderIds)
    
    // 3. 记录详细信息
    expiredOrders.forEach(order => {
      console.log(`⏰ 订单过期: ${order.orderNumber} (${order.paymentProvider}) - 用户: ${order.user?.email}`)
    })
    
    console.log(`✅ 订单清理完成: 处理了 ${expiredOrders.length} 个过期订单`)
    
    return {
      processed: expiredOrders.length,
      errors: 0
    }
    
  } catch (error) {
    console.error("❌ 订单清理失败:", error)
    return {
      processed: 0,
      errors: 1
    }
  }
}

/**
 * 订单统计报告
 */
export async function generateOrderReport() {
  try {
    console.log("📊 生成订单统计报告...")
    
    // 获取全局统计 - 使用静态导入
    const globalStats = await getOrderStatistics()
    
    console.log("📈 全局订单统计:")
    console.log(`  总订单数: ${globalStats.total}`)
    console.log(`  已完成: ${globalStats.completed}`)
    console.log(`  待支付: ${globalStats.pending}`)
    console.log(`  失败订单: ${globalStats.failed}`)
    console.log(`  总收入: ¥${(globalStats.totalRevenue / 100).toFixed(2)}`)
    
    return globalStats
    
  } catch (error) {
    console.error("❌ 生成订单报告失败:", error)
    return null
  }
}

/**
 * 支付提供商负载报告
 */
export async function generateProviderLoadReport() {
  try {
    console.log("⚖️ 生成支付提供商负载报告...")
    
    // 使用静态导入
    const stats = await getPaymentProviderStats(24) // 24小时统计
    
    console.log("📊 支付提供商负载 (24小时):")
    stats.forEach(stat => {
      console.log(`  ${stat.provider}: ${stat.count} 订单 (最后使用: ${stat.lastUsed.toLocaleString()})`)
    })
    
    return stats
    
  } catch (error) {
    console.error("❌ 生成负载报告失败:", error)
    return []
  }
}

/**
 * 完整的系统维护任务
 */
export async function runSystemMaintenance() {
  console.log("🔧 开始系统维护任务...")
  
  const results = {
    orderCleanup: await cleanupExpiredOrders(),
    orderReport: await generateOrderReport(),
    providerReport: await generateProviderLoadReport()
  }
  
  console.log("✅ 系统维护任务完成")
  
  return results
} 