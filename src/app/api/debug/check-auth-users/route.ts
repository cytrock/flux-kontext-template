import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    // 列出所有认证用户
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
    
    if (authError) {
      console.error('Failed to list auth users:', authError)
      return NextResponse.json({ error: 'Failed to list auth users', details: authError }, { status: 500 })
    }

    // 列出users表中的用户
    const { data: tableUsers, error: tableError } = await supabase
      .from('users')
      .select('email, id, created_at')
      .limit(10)

    if (tableError) {
      console.error('Failed to list table users:', tableError)
      return NextResponse.json({ error: 'Failed to list table users', details: tableError }, { status: 500 })
    }

    return NextResponse.json({ 
      authUsers: authUsers.users.map(u => ({ id: u.id, email: u.email, created_at: u.created_at })),
      tableUsers: tableUsers,
      authUserCount: authUsers.users.length,
      tableUserCount: tableUsers.length
    })

  } catch (error) {
    console.error('An unexpected error occurred:', error)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}