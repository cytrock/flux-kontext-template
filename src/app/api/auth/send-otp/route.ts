import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// 初始化 Supabase 和 Resend
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

// 确保 otp_codes 表存在
async function ensureOtpTableExists() {
  try {
    // 先尝试查询表，如果表不存在会报错
    const { error: testError } = await supabase
      .from('otp_codes')
      .select('id')
      .limit(1);

    if (testError && testError.message?.includes('does not exist')) {
      console.log('otp_codes 表不存在，正在创建...');
      
      // 直接执行 SQL 来创建表
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS public.otp_codes (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT NOT NULL,
          code TEXT NOT NULL,
          expires_at TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          used_at TIMESTAMPTZ
        );
      `;

      // 使用 rpc 执行 SQL（如果可用）
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql: createTableSQL
      });

      if (createError) {
        console.error('创建表失败:', createError);
        // 如果 rpc 不可用，尝试其他方法
        throw new Error(`Unable to create otp_codes table: ${createError.message}`);
      }

      console.log('otp_codes 表创建成功');
    }
    
    return true;
  } catch (error) {
    console.error('确保表存在时出错:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 确保 otp_codes 表存在
    const tableReady = await ensureOtpTableExists();
    if (!tableReady) {
      return NextResponse.json({ 
        error: 'Database setup required. Please contact administrator.' 
      }, { status: 500 });
    }

    // 1. 首先删除该邮箱的所有旧验证码（避免重复记录）
    const { error: deleteError } = await supabase
      .from('otp_codes')
      .delete()
      .eq('email', email);

    if (deleteError) {
      console.error('Error deleting old OTP codes:', deleteError);
      // 不中断流程，继续执行
    }

    // 2. 生成6位数验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 3. 设置5分钟后过期
    const expires_at = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // 4. 将验证码存入数据库
    const { error: dbError } = await supabase
      .from('otp_codes')
      .insert({ 
        email, 
        code, 
        expires_at,
        created_at: new Date().toISOString()
      });

    if (dbError) {
      console.error('Database error storing OTP:', dbError);
      console.error('Full error details:', JSON.stringify(dbError, null, 2));
      
      return NextResponse.json({ 
        error: 'Could not save verification code. Please try again.' 
      }, { status: 500 });
    }

    // 5. 使用Resend发送邮件
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