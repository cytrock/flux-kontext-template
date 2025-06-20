import { NextRequest, NextResponse } from 'next/server'
import { doubaoService } from '@/lib/doubao'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // 检查用户认证
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: '请先登录才能使用图像生成功能' },
        { status: 401 }
      )
    }

    // 检查 Doubao 服务是否启用
    if (process.env.NEXT_PUBLIC_ENABLE_DOUBAO !== 'true') {
      return NextResponse.json(
        { error: '豆包图像生成服务未启用' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { prompt, size, quality, style } = body

    // 验证输入参数
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: '请输入有效的图像描述文字' },
        { status: 400 }
      )
    }

    if (prompt.length > 1000) {
      return NextResponse.json(
        { error: '图像描述文字不能超过1000个字符' },
        { status: 400 }
      )
    }

    console.log(`用户 ${session.user.email} 请求豆包文字生成图片:`, {
      prompt: prompt.substring(0, 100) + '...',
      size,
      quality
    })

    // 调用豆包服务生成图片
    const result = await doubaoService.generateImage(prompt, {
      size: size || '1024x1024',
      quality: quality || 'standard',
      style: style,
      n: 1
    })

    // 记录成功生成
    console.log(`豆包图像生成成功 - 用户: ${session.user.email}`)

    return NextResponse.json({
      success: true,
      data: result.data,
      provider: 'doubao',
      model: doubaoService.getServiceInfo().models.textToImage,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('豆包文字生成图片API错误:', error)
    
    return NextResponse.json(
      {
        error: error instanceof Error 
          ? error.message 
          : '豆包图像生成服务暂时不可用，请稍后重试',
        provider: 'doubao'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // 获取服务状态信息
    const serviceInfo = doubaoService.getServiceInfo()
    const isHealthy = await doubaoService.checkHealth()

    return NextResponse.json({
      service: '豆包文字生成图片',
      status: isHealthy ? 'healthy' : 'unhealthy',
      ...serviceInfo
    })
  } catch (error) {
    return NextResponse.json(
      {
        service: '豆包文字生成图片',
        status: 'error',
        error: error instanceof Error ? error.message : '服务检查失败'
      },
      { status: 503 }
    )
  }
}