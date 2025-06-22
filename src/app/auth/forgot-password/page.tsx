import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ForgotPasswordContent } from '@/components/ForgotPasswordContent'

export const metadata: Metadata = {
  title: 'Forgot Password - Reset Your Account | Flux Kontext',
  description: 'Reset your Flux Kontext account password. Enter your email to receive a password reset link and regain access to your AI image generation account.',
  keywords: [
    'forgot password',
    'reset password',
    'password recovery',
    'flux kontext',
    'ai image generator password reset',
    'account recovery'
  ],
  alternates: {
    canonical: '/auth/forgot-password',
  },
  openGraph: {
    title: 'Forgot Password - Flux Kontext',
    description: 'Reset your account password',
    url: '/auth/forgot-password',
  },
  robots: {
    index: false, // 找回密码页面不需要被搜索引擎索引
    follow: true,
  }
}

// 加载组件
function ForgotPasswordLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading forgot password page...</p>
        </div>
      </div>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<ForgotPasswordLoading />}>
      <ForgotPasswordContent />
    </Suspense>
  )
} 