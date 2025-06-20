import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    // 验证邮箱格式
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10分钟过期

    // 删除该邮箱之前的OTP记录
    await supabase
      .from('otp_codes')
      .delete()
      .eq('email', email);

    // 插入新的OTP记录
    const { error: insertError } = await supabase
      .from('otp_codes')
      .insert([
        {
          email,
          code: otp,
          expires_at: expiresAt.toISOString(),
          created_at: new Date().toISOString(),
        },
      ]);

    if (insertError) {
      console.error('Failed to save OTP:', insertError);
      return NextResponse.json({ error: 'Could not save verification code. Please try again.' }, { status: 500 });
    }

    // 发送邮件
    try {
      const { data, error: emailError } = await resend.emails.send({
        from: 'Flux Kontext <onboarding@resend.dev>',
        to: [email],
        subject: 'Your Verification Code - Flux Kontext',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">Your Verification Code</h2>
            <div style="background-color: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; padding: 30px; text-align: center; margin: 20px 0;">
              <h1 style="color: #495057; font-size: 32px; margin: 0; letter-spacing: 8px;">${otp}</h1>
            </div>
            <p style="color: #666; text-align: center; margin: 20px 0;">
              This code will expire in <strong>10 minutes</strong>.
            </p>
            <p style="color: #666; text-align: center; font-size: 14px;">
              If you didn't request this code, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">
            <p style="color: #999; text-align: center; font-size: 12px;">
              © 2024 Flux Kontext. All rights reserved.
            </p>
          </div>
        `,
      });

      if (emailError) {
        console.error('Failed to send email:', emailError);
        return NextResponse.json({ error: 'Failed to send verification email. Please try again.' }, { status: 500 });
      }

      return NextResponse.json({ message: 'Verification code sent successfully.' });
    } catch (emailError) {
      console.error('Email service error:', emailError);
      return NextResponse.json({ error: 'Failed to send verification email. Please try again.' }, { status: 500 });
    }

  } catch (err) {
    console.error('Send OTP error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}