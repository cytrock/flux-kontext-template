import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// 初始化 Supabase 和 Resend
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. 生成6位数验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 2. 设置5分钟后过期
    const expires_at = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // 3. 将验证码存入数据库
    const { error: dbError } = await supabase
      .from('otp_codes')
      .insert({ email, code, expires_at });

    if (dbError) {
      console.error('Database error storing OTP:', dbError);
      return NextResponse.json({ error: 'Could not save verification code. Please try again.' }, { status: 500 });
    }

    // 4. 使用Resend发送邮件
    const { data, error: emailError } = await resend.emails.send({
      from: 'FluxKontext <onboarding@resend.dev>', // 测试时必须使用 onbarding@resend.dev
      to: [email],
      subject: 'Your Verification Code',
      html: `
        <div style="font-family: sans-serif; text-align: center;">
          <h2>Your Verification Code</h2>
          <p>Use the code below to complete your registration. It is valid for 5 minutes.</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; background: #f0f0f0; padding: 15px; border-radius: 8px;">
            ${code}
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return NextResponse.json({ error: 'Could not send verification email. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Verification code sent successfully.' });

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
} 