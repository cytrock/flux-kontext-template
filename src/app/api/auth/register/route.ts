import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/database'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { name, email, otp, password } = await request.json()

    if (!name || !email || !otp || !password) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // 1. 查找并验证OTP
    const { data: otpData, error: otpError } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('email', email)
      .eq('code', otp)
      .single()

    if (otpError || !otpData) {
      return NextResponse.json({ error: 'Invalid or expired verification code.' }, { status: 400 })
    }

    // 检查OTP是否已使用或已过期
    if (otpData.used_at) {
      return NextResponse.json({ error: 'This verification code has already been used.' }, { status: 400 })
    }
    if (new Date(otpData.expires_at) < new Date()) {
      return NextResponse.json({ error: 'This verification code has expired.' }, { status: 400 })
    }

    // 2. 创建用户
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // 因为我们已经通过OTP验证了，所以直接确认为已验证
      user_metadata: { name: name },
    })

    if (createError) {
      // 更可靠地处理Supabase特定的错误
      if ('code' in createError && createError.code === 'email_exists') {
        return NextResponse.json({ error: 'A user with this email already exists.', code: 'EMAIL_EXISTS' }, { status: 409 })
      }
      console.error('Supabase user creation error:', createError)
      return NextResponse.json({ error: 'Failed to create user.' }, { status: 500 })
    }

    // 3. 标记OTP为已使用
    await supabase
      .from('otp_codes')
      .update({ used_at: new Date().toISOString() })
      .eq('id', otpData.id)

    return NextResponse.json({ message: 'User registered successfully.', userId: userData.user.id })

  } catch (error) {
    console.error('An unexpected error occurred:', error)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}

// 支持的HTTP方法
export async function GET() {
  return NextResponse.json({
    message: '用户注册API - 使用POST方法注册新用户',
    requiredFields: ['email', 'password'],
    optionalFields: ['name']
  })
} 