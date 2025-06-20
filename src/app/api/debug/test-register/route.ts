import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log('Testing user creation for email:', email)

    // 1. 首先检查用户是否已存在于 Supabase Auth
    const { data: existingUser, error: getUserError } = await supabase.auth.admin.getUserById('fake-id')
    
    // 2. 尝试创建用户
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: { name: 'Test User' },
    })

    if (createError) {
      console.error('Supabase user creation error:', createError)
      return NextResponse.json({ 
        error: 'Failed to create user',
        details: createError,
        errorCode: createError.code,
        errorMessage: createError.message
      }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'User created successfully',
      userId: userData.user.id,
      email: userData.user.email
    })

  } catch (error) {
    console.error('An unexpected error occurred:', error)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}