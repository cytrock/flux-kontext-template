import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 验证用户身份
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // 获取用户信息
    const { prisma } = await import('@/lib/database')
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const generationId = params.id

    // 查询当前收藏状态
    const supabase = createAdminClient()
    const { data: current, error: fetchError } = await supabase
      .from('generations')
      .select('is_favorite')
      .eq('id', generationId)
      .eq('user_id', user.id) // 确保用户只能操作自己的生成记录
      .single()

    if (fetchError || !current) {
      return NextResponse.json(
        { error: 'Generation not found' },
        { status: 404 }
      )
    }

    // 切换收藏状态
    const newFavoriteStatus = !current.is_favorite

    const { error: updateError } = await supabase
      .from('generations')
      .update({ 
        is_favorite: newFavoriteStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', generationId)
      .eq('user_id', user.id)

    if (updateError) {
      console.error('❌ Failed to toggle favorite:', updateError)
      return NextResponse.json(
        { error: 'Failed to update favorite status' },
        { status: 500 }
      )
    }

    console.log(`✅ Toggled favorite for generation ${generationId}: ${newFavoriteStatus}`)

    return NextResponse.json({
      success: true,
      is_favorite: newFavoriteStatus
    })

  } catch (error) {
    console.error('❌ Toggle favorite API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}