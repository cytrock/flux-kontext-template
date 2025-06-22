"use client"

import { useState } from "react"
import Link from "next/link"

// 忘记密码内容组件
export function ForgotPasswordContent() {
  // 邮箱输入状态
  const [email, setEmail] = useState("")
  // 是否正在提交
  const [isLoading, setIsLoading] = useState(false)
  // 错误信息
  const [error, setError] = useState("")
  // 成功提示
  const [success, setSuccess] = useState("")

  // 处理表单提交
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")
    try {
      // 这里应调用后端API发送重置邮件（可根据实际API调整）
      // 示例：await fetch('/api/auth/forgot-password', ...)
      await new Promise((resolve) => setTimeout(resolve, 1200)) // 模拟请求
      setSuccess("If this email is registered, a reset link has been sent.")
    } catch (err) {
      setError("Failed to send reset email. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter your email address and we will send you a password reset link.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder-gray-400 text-foreground rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <div>
            <button
              type="submit"
              disabled={isLoading || !email}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? "Sending..." : "Send reset link"}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link href="/auth/signin" className="text-primary hover:underline text-sm">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
} 