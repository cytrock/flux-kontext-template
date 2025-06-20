import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"
import { getClientIp } from "@/lib/utils/ip"
import { getIsoTimestr } from "@/lib/utils/time"
import { getUuid } from "@/lib/utils/hash"
import { saveUser } from "@/lib/services/user"
import { User } from "@/lib/types/user"
import { createClient } from '@supabase/supabase-js'

const providers: any[] = []

// Google Auth (如果配置了)
if (
  process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true" &&
  process.env.GOOGLE_ID &&
  process.env.GOOGLE_SECRET
) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  )
}

// Github Auth (如果配置了)
if (
  process.env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === "true" &&
  process.env.AUTH_GITHUB_ID &&
  process.env.AUTH_GITHUB_SECRET
) {
  providers.push(
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    })
  )
}

// 🔥 简化的邮箱登录 - 只使用Supabase认证
if (process.env.NEXT_PUBLIC_AUTH_CREDENTIALS_ENABLED === "true") {
  providers.push(
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password.")
        }

        // 🎯 开发环境测试账户（无需数据库）
        if (process.env.NODE_ENV === 'development' && 
            credentials.email === "test@example.com" && 
            credentials.password === "password") {
          return {
            id: "test-user-id",
            email: "test@example.com",
            name: "Test User",
          }
        }

        // 🚀 生产环境：使用Supabase认证（自带邮箱验证）
        try {
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
          )

          // 🔐 Supabase登录验证（自动检查邮箱验证状态）
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (error) {
            console.log('Login failed:', error.message)
            // Return more specific messages based on Supabase error
            if (error.message.includes('Invalid login credentials')) {
              throw new Error('Invalid email or password. Please try again.')
            }
            if (error.message.includes('Email not confirmed')) {
              throw new Error('Your email has not been verified. Please check your inbox.')
            }
            throw new Error('An unknown error occurred during login.')
          }

          if (!data.user) {
            console.log('User does not exist')
            throw new Error('User not found or password incorrect.')
          }

          // ✅ Double-check email verification status for safety
          if (!data.user.email_confirmed_at) {
            console.log('Email not verified')
            throw new Error('Your email has not been verified. Please check your inbox.')
          }

          // 🎉 Login successful
          return {
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name || data.user.email!,
          }

        } catch (error) {
          console.error('Supabase认证错误:', error)
          // 重新抛出错误，以便NextAuth可以捕获它
          throw error
        }
      },
    })
  )
}

export const providerMap = providers
  .map((provider: any) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })

export const authOptions: NextAuthOptions = {
  providers,
  pages: {
    signIn: "/auth/signin",
  },
  // 🍪 Cookie安全配置 - 优化以支持Google One Tap
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',        // 🔧 设置为lax而非strict，支持第三方登录
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? 'fluxkontext.space' : undefined, // 🌐 明确指定域名
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: 'lax',        // 🔧 支持跨站点回调
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? 'fluxkontext.space' : undefined,
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',        // 🔧 支持CSRF保护但允许第三方登录
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? 'fluxkontext.space' : undefined,
      },
    },
    // 🔧 添加状态Cookie配置以支持Google One Tap
    state: {
      name: `next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 900, // 15分钟
        domain: process.env.NODE_ENV === 'production' ? 'fluxkontext.space' : undefined,
      },
    },
    pkceCodeVerifier: {
      name: `next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 900, // 15分钟
        domain: process.env.NODE_ENV === 'production' ? 'fluxkontext.space' : undefined,
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // 🎯 处理用户登录和首次注册赠送积分
      console.log('🔍 signIn回调触发:', { 
        user: user, 
        account: account?.provider, 
        profile: profile?.email 
      })
      
      try {
        if (user?.email) {
          console.log('🔍 开始处理用户:', user.email)
          
          // 🔧 使用Supabase替代Prisma，确保数据库访问一致性
          const { createAdminClient } = await import('@/lib/supabase/server')
          const { getUuid } = await import('@/lib/utils/hash')
          
          console.log('🔍 Supabase模块导入成功')
          
          const supabase = createAdminClient()
          
          // 🔐 CRITICAL SECURITY CHECK: 对于凭据登录，确保用户确实存在于Supabase Auth中
          if (account?.provider === 'credentials') {
            console.log('🔍 凭据登录 - 验证用户是否真实存在于Supabase Auth中...')
            
            // 验证用户是否真的在Supabase Auth系统中存在且已验证
            const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(user.id)
            
            if (authError || !authUser.user) {
              console.error('🚨 安全风险：凭据登录用户在Supabase Auth中不存在:', authError)
              return false // 拒绝登录
            }
            
            if (!authUser.user.email_confirmed_at) {
              console.error('🚨 安全风险：用户邮箱未验证')
              return false // 拒绝登录
            }
            
            console.log('✅ 凭据登录用户验证通过')
          }
          
          // 检查用户是否已存在于users表中
          console.log('🔍 查询现有用户...')
          const { data: existingUser, error: findError } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .limit(1)
            .single()
          
          console.log('🔍 查询结果:', existingUser ? '用户已存在' : '用户不存在')

          if (findError && findError.code === 'PGRST116') {
            // 用户不存在，创建新用户 - 但只对OAuth用户或已验证的凭据用户
            console.log('🎁 开始创建新用户...')
            
            const newUserData = {
              id: user.id || getUuid(),
              email: user.email,
              name: user.name || user.email,
              image: user.image || '',
              credits: 100, // 🎁 新用户赠送100积分
              signin_type: account?.type || 'oauth',
              signin_provider: account?.provider || 'google',
              signin_openid: account?.providerAccountId || '',
              signin_ip: 'unknown',
              last_signin_at: new Date().toISOString(),
              signin_count: 1,
              location: 'US',
              preferred_currency: 'USD',
              preferred_payment_provider: 'creem'
            }

            const { data: newUser, error: createError } = await supabase
              .from('users')
              .insert(newUserData)
              .select()
              .single()

            if (createError) {
              console.error('🚨 新用户创建失败:', createError)
              // 对于OAuth用户，即使创建失败也允许登录
              // 对于凭据用户，如果创建失败则拒绝登录
              if (account?.provider === 'credentials') {
                return false
              }
            } else {
              console.log('🎉 新用户创建成功:', newUser.id)

              // 🎁 创建积分赠送记录
              try {
                await supabase
                  .from('credit_transactions')
                  .insert({
                    id: getUuid(),
                    user_id: newUser.id,
                    amount: 100,
                    type: 'gift',
                    description: '新用户注册赠送积分',
                    reference_id: 'welcome_bonus'
                  })
                
                console.log(`🎁 新用户注册成功，赠送100积分: ${user.email}`)
              } catch (creditError) {
                console.error('⚠️ 积分记录创建失败:', creditError)
              }
            }
          } else if (!findError && existingUser) {
            console.log('🔄 更新现有用户登录信息...')
            
            // 🔄 现有用户：更新登录信息
            const updateData = {
              last_signin_at: new Date().toISOString(),
              signin_count: (existingUser.signin_count || 0) + 1,
              // 更新头像和昵称（如果有变化）
              ...(user.image && { image: user.image }),
              ...(user.name && { name: user.name }),
            }

            await supabase
              .from('users')
              .update(updateData)
              .eq('id', existingUser.id)
            
            console.log('✅ 现有用户登录信息更新完成')
          } else {
            console.error('🚨 数据库查询异常:', findError)
            // 对于凭据用户，数据库异常时拒绝登录
            if (account?.provider === 'credentials') {
              return false
            }
          }
        } else {
          console.log('⚠️ 用户邮箱为空，跳过数据库操作')
        }
      } catch (error) {
        console.error('❌ 用户登录处理失败:', error)
        // 对于凭据用户，处理失败时拒绝登录
        if (account?.provider === 'credentials') {
          return false
        }
      }

      console.log('✅ signIn回调完成，返回true')
      return true
    },
    async redirect({ url, baseUrl }) {
      // 🎯 修改重定向逻辑 - 优先跳转到generate页面
      
      // 如果URL包含callbackUrl参数，使用该参数
      if (url.includes('callbackUrl=')) {
        const urlParams = new URLSearchParams(url.split('?')[1])
        const callbackUrl = urlParams.get('callbackUrl')
        if (callbackUrl) {
          // 解码callbackUrl
          const decodedCallback = decodeURIComponent(callbackUrl)
          if (decodedCallback.startsWith("/")) return `${baseUrl}${decodedCallback}`
          else if (new URL(decodedCallback).origin === baseUrl) return decodedCallback
        }
      }
      
      // If it's a relative path, add baseUrl
      if (url.startsWith("/")) return `${baseUrl}${url}`
      
      // If it's a full URL on the same domain, return it directly
      if (new URL(url).origin === baseUrl) return url
      
      // 🎯 Default to the dashboard page
      return `${baseUrl}/dashboard`
    },
    async session({ session, token }) {
      // 🎯 会话信息处理
      return session
    },
    async jwt({ token, user, account }: { token: any; user?: any; account?: any }) {
      // 🎯 JWT token 处理
      if (user) {
        token.user = user as any
      }
      return token
    },
  },
}

// 检测用户地理位置的函数
async function detectUserLocation(): Promise<string> {
  try {
    // 这里可以使用IP地理位置检测服务
    // 暂时返回默认值，实际项目中可以集成 ipapi.co 等服务
    return "US" // 默认为美国
  } catch (error) {
    console.error("地理位置检测失败:", error)
    return "US"
  }
} 