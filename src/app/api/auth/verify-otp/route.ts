import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('email', email)
      .eq('code', otp)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid verification code.' }, { status: 400 });
    }

    if (data.used_at) {
      return NextResponse.json({ error: 'This code has already been used.' }, { status: 400 });
    }

    if (new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ error: 'This code has expired.' }, { status: 400 });
    }

    // 如果代码有效，只返回成功消息，但不在这里将其标记为"已使用"。
    // 标记为"已使用"的操作将在最终用户注册时完成。
    return NextResponse.json({ message: 'Verification code is valid.' });

  } catch (err) {
    console.error('Verify OTP error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
} 