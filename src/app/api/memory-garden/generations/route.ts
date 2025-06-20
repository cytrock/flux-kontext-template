import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
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

    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const offset = parseInt(searchParams.get('offset') || '0')
    const filter = searchParams.get('filter') || ''
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []
    const filterType = searchParams.get('filterType') || 'all'
    const filterStudio = searchParams.get('filterStudio') || 'all'

    // 查询生成历史
    const supabase = createAdminClient()
    let query = supabase
      .from('generations')
      .select('*')
      .eq('user_id', user.id)
      .order(sortBy, { ascending: false })
      .range(offset, offset + limit - 1)

    // 应用过滤器
    if (filter) {
      query = query.or(`prompt.ilike.%${filter}%,model.ilike.%${filter}%,action.ilike.%${filter}%`)
    }

    if (tags.length > 0) {
      query = query.overlaps('style_tags', tags)
    }

    if (filterType !== 'all') {
      query = query.eq('generation_type', filterType)
    }

    if (filterStudio !== 'all') {
      query = query.eq('studio_type', filterStudio)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('❌ Failed to fetch generations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch generations' },
        { status: 500 }
      )
    }

    // 转换数据格式
    const generations = (data || []).map(gen => ({
      id: gen.id,
      prompt: gen.prompt,
      action: gen.action || 'text-to-image-pro',
      model: gen.model,
      generation_type: gen.generation_type || 'text-to-image',
      studio_type: gen.studio_type || 'professional-studio',
      input_image_count: gen.input_image_count || 0,
      image_urls: gen.image_urls || [],
      style_tags: gen.style_tags || [],
      content_tags: gen.content_tags || [],
      is_favorite: gen.is_favorite || false,
      generation_time_ms: gen.generation_time_ms || 0,
      credits_used: gen.credits_used,
      created_at: gen.created_at,
      settings: gen.settings || {}
    }))

    return NextResponse.json({
      success: true,
      generations,
      total: count || 0,
      limit,
      offset
    })

  } catch (error) {
    console.error('❌ Memory Garden API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}