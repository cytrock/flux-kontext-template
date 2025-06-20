"use client"

import { useState, useEffect } from "react"
import { signIn, getProviders } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Home } from "lucide-react"
// 导入认证文案模块
import { auth, common } from "@/lib/content"

export function SignInContent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [providers, setProviders] = useState<any>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // 检查凭据登录是否启用
  const isCredentialsEnabled = process.env.NEXT_PUBLIC_AUTH_CREDENTIALS_ENABLED === "true"

  // 获取可用的认证提供商
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [])

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        // Handle different error types from NextAuth and Supabase
        console.log('Login error:', result.error)
        
        // 根据错误信息提供具体的中文提示
        if (result.error === "CredentialsSignin") {
          setError("Invalid email or password. Please try again.")
        } else if (result.error.includes("Invalid email or password")) {
          setError("Invalid email or password. Please try again.")
        } else if (result.error.includes("Email not confirmed") || result.error.includes("Email not verified")) {
          setError("Your email has not been verified. Please check your inbox.")
        } else if (result.error.includes("User not found")) {
          setError("No account found with this email. Please sign up first.")
        } else if (result.error.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please try again.")
        } else {
          setError("Invalid email or password. Please try again.")
        }
      } else {
        // 获取回调URL或默认跳转到dashboard页面
        const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
        router.push(callbackUrl)
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(true)
    setError("")
    
    try {
      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
      await signIn(provider, { 
        callbackUrl,
        redirect: true 
      })
    } catch (error) {
      setError(common.messages.loginFailed)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* 返回首页按钮 */}
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-ghibli-forest bg-ghibli-cream hover:bg-ghibli-cream/90 transition-all duration-200"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-ghibli-cream">
            {auth.signIn.title}
          </h2>
          
          {/* 🎁 登录赠送积分提示 */}
          <div className="mt-4 mx-auto max-w-sm">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-ghibli-cream" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-ghibli-cream">
                  Sign up and get 100 free credits!
                </span>
                <svg className="w-5 h-5 text-ghibli-cream" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
          
          <p className="mt-2 text-center text-sm text-ghibli-cream">
            {auth.signIn.noAccount}{" "}
            <Link
              href="/auth/signup"
              className="font-bold text-ghibli-cream hover:text-ghibli-cream/80 transition-colors"
            >
              {auth.signIn.createNewAccount}
            </Link>
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {/* OAuth 登录按钮 */}
          {providers && (
            <div className="space-y-3">
              {/* Google 登录 - 只有在启用时才显示 */}
              {providers.google && process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true" && (
                <button
                  onClick={() => handleOAuthSignIn("google")}
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-border text-sm font-medium rounded-md text-foreground bg-card hover:bg-card/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {isLoading ? common.buttons.signingIn : common.buttons.continueWithGoogle}
                </button>
              )}

              {/* GitHub 登录 - 只有在启用时才显示 */}
              {providers.github && process.env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === "true" && (
                <button
                  onClick={() => handleOAuthSignIn("github")}
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {isLoading ? common.buttons.signingIn : common.buttons.continueWithGitHub}
                </button>
              )}
            </div>
          )}

          {/* 分隔线 - 只有在有OAuth提供商且凭据登录启用时才显示 */}
          {providers && ((providers.google && process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true") || (providers.github && process.env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === "true")) && isCredentialsEnabled && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-ghibli-cream">{auth.signIn.orContinueWith}</span>
              </div>
            </div>
          )}

          {/* 邮箱密码登录表单 - 只有在启用凭据登录时才显示 */}
          {isCredentialsEnabled ? (
            <form className="mt-8 space-y-6" onSubmit={handleEmailSignIn}>
              {error && (
                <div className="rounded-md bg-destructive/10 p-4 border border-destructive/20">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-destructive">{error}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-black bg-white rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-black bg-white rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm pr-10"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center justify-center h-full w-10 text-gray-900"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-ghibli-cream">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="font-medium text-ghibli-cream hover:text-ghibli-cream/80 transition-colors">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
          ) : (
            // 凭据登录禁用时显示的提示信息
            <div className="mt-8 p-6 bg-accent/50 border border-border rounded-lg">
              <div className="text-center">
                <svg className="w-8 h-8 text-primary mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-sm text-ghibli-cream">
                  Please use Google login above to sign in.
                </p>
              </div>
            </div>
          )}

          {/* 分隔线 */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-ghibli-cream">
                {auth.signIn.noAccount}
              </span>
            </div>
          </div>

          {/* 注册按钮 */}
          <div>
            <Link href="/auth/signup" passHref>
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-input text-sm font-bold rounded-md text-ghibli-forest bg-ghibli-cream hover:bg-ghibli-cream/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {auth.signIn.createNewAccount}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 