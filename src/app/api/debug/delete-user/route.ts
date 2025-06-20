import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    console.log('Attempting to delete user with email:', email)

    // 1. 首先从 Supabase Auth 中查找用户ID
    const { data: authUsers, error: listError } = await supabase.auth.admin.listUsers()
    
    if (listError) {
      console.error('Failed to list users:', listError)
      return NextResponse.json({ error: 'Failed to list users' }, { status: 500 })
    }

    const userToDelete = authUsers.users.find(user => user.email === email)
    
    if (!userToDelete) {
      return NextResponse.json({ error: 'User not found in Supabase Auth' }, { status: 404 })
    }

    console.log('Found user to delete:', { id: userToDelete.id, email: userToDelete.email })

    // 2. 从 Supabase Auth 中删除用户
    const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(userToDelete.id)
    
    if (deleteAuthError) {
      console.error('Failed to delete user from Auth:', deleteAuthError)
      return NextResponse.json({ error: 'Failed to delete user from Auth', details: deleteAuthError }, { status: 500 })
    }

    console.log('Successfully deleted user from Supabase Auth')

    // 3. 从 users 表中删除用户数据（如果存在）
    const { error: deleteTableError } = await supabase
      .from('users')
      .delete()
      .eq('email', email)

    if (deleteTableError) {
      console.error('Failed to delete user from users table:', deleteTableError)
      // 不返回错误，因为用户可能不在 users 表中
    } else {
      console.log('Successfully deleted user from users table')
    }

    // 4. 删除相关的 OTP 记录
    const { error: deleteOtpError } = await supabase
      .from('otp_codes')
      .delete()
      .eq('email', email)

    if (deleteOtpError) {
      console.error('Failed to delete OTP codes:', deleteOtpError)
    } else {
      console.log('Successfully deleted OTP codes')
    }

    return NextResponse.json({ 
      message: 'User deleted successfully',
      deletedUserId: userToDelete.id,
      deletedEmail: email
    })

  } catch (error) {
    console.error('An unexpected error occurred:', error)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'User deletion API - Use DELETE method with email in request body',
    example: {
      method: 'DELETE',
      body: { email: 'user@example.com' }
    }
  })
}