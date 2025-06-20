import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    console.log('Testing Supabase connection...');
    console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 测试数据库连接
    const { data, error } = await supabase
      .from('otp_codes')
      .select('*', { count: 'exact' })
      .limit(1);

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({ 
        error: 'Database connection failed', 
        details: error,
        env_check: {
          url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          key: !!process.env.SUPABASE_SERVICE_ROLE_KEY
        }
      }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Supabase connection successful',
      data,
      env_check: {
        url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      }
    });

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ 
      error: 'Unexpected error', 
      details: err instanceof Error ? err.message : String(err),
      env_check: {
        url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      }
    }, { status: 500 });
  }
}