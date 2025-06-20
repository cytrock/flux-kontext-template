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
    console.log('Attempting to create user with email:', email)
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // 因为我们已经通过OTP验证了，所以直接确认为已验证
      user_metadata: { name: name },
    })
    
    console.log('Create user result:', { userData: !!userData, error: createError })

    if (createError) {
      console.error('Supabase user creation error:', createError)
      
      // 更详细地处理Supabase错误
      if (createError.message && createError.message.includes('email_address_not_authorized')) {
        return NextResponse.json({ error: 'Email address not authorized for registration.' }, { status: 400 })
      }
      
      if (createError.message && createError.message.includes('already registered') || createError.message && createError.message.includes('already been registered')) {
        return NextResponse.json({ error: 'A user with this email already exists.', code: 'EMAIL_EXISTS' }, { status: 409 })
      }
      
      // 检查各种可能的邮箱已存在错误
      if (createError.message && (
        createError.message.toLowerCase().includes('user already registered') ||
        createError.message.toLowerCase().includes('email already taken') ||
        createError.message.toLowerCase().includes('email already exists') ||
        createError.message.toLowerCase().includes('duplicate') ||
        createError.code === 'email_address_invalid'
      )) {
        return NextResponse.json({ error: 'A user with this email already exists.', code: 'EMAIL_EXISTS' }, { status: 409 })
      }
      
      return NextResponse.json({ 
        error: 'Failed to create user.',
        details: createError.message || 'Unknown error'
      }, { status: 500 })
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