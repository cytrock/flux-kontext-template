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
        { error: '请先登录才能使用图像风格转换功能' },
        { status: 401 }
      )
    }

    // 检查 Doubao 服务是否启用
    if (process.env.NEXT_PUBLIC_ENABLE_DOUBAO !== 'true') {
      return NextResponse.json(
        { error: '豆包图像风格转换服务未启用' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { image, stylePrompt, size, quality } = body

    // 验证输入参数
    if (!image || typeof image !== 'string') {
      return NextResponse.json(
        { error: '请上传有效的图片文件' },
        { status: 400 }
      )
    }

    if (!stylePrompt || typeof stylePrompt !== 'string' || stylePrompt.trim().length === 0) {
      return NextResponse.json(
        { error: '请输入风格转换描述' },
        { status: 400 }
      )
    }

    if (stylePrompt.length > 500) {
      return NextResponse.json(
        { error: '风格描述不能超过500个字符' },
        { status: 400 }
      )
    }

    // 验证图片格式 (base64)
    const isValidBase64 = /^data:image\/(jpeg|jpg|png|webp);base64,/.test(image)
    if (!isValidBase64) {
      return NextResponse.json(
        { error: '图片格式不支持，请上传 JPEG、PNG 或 WebP 格式的图片' },
        { status: 400 }
      )
    }

    // 提取base64数据部分
    const base64Data = image.split(',')[1]
    
    // 检查图片大小 (base64编码后大约比原始文件大33%)
    const imageSizeBytes = (base64Data.length * 3) / 4
    const maxSizeBytes = 10 * 1024 * 1024 // 10MB
    
    if (imageSizeBytes > maxSizeBytes) {
      return NextResponse.json(
        { error: '图片文件过大，请上传小于10MB的图片' },
        { status: 400 }
      )
    }

    console.log(`用户 ${session.user.email} 请求豆包图片风格转换:`, {
      stylePrompt: stylePrompt.substring(0, 100) + '...',
      imageSize: `${Math.round(imageSizeBytes / 1024)}KB`,
      size,
      quality
    })

    // 调用豆包服务进行风格转换
    const result = await doubaoService.convertImageStyle(base64Data, stylePrompt, {
      size: size || '1024x1024',
      quality: quality || 'standard'
    })

    // 记录成功转换
    console.log(`豆包图片风格转换成功 - 用户: ${session.user.email}`)

    return NextResponse.json({
      success: true,
      data: result.data,
      provider: 'doubao',
      model: doubaoService.getServiceInfo().models.imageEdit,
      originalImageSize: `${Math.round(imageSizeBytes / 1024)}KB`,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('豆包图片风格转换API错误:', error)
    
    return NextResponse.json(
      {
        error: error instanceof Error 
          ? error.message 
          : '豆包图片风格转换服务暂时不可用，请稍后重试',
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
    
    return NextResponse.json({
      service: '豆包图片风格转换',
      status: 'available',
      ...serviceInfo,
      supportedFormats: ['JPEG', 'PNG', 'WebP'],
      maxImageSize: '10MB',
      features: [
        '吉卜力风格转换',
        '艺术风格迁移', 
        '图片编辑和优化',
        '中英文双语描述支持'
      ]
    })
  } catch (error) {
    return NextResponse.json(
      {
        service: '豆包图片风格转换',
        status: 'error',
        error: error instanceof Error ? error.message : '服务检查失败'
      },
      { status: 503 }
    )
  }
}