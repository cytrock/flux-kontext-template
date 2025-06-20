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

    // 查询生成历史统计
    const supabase = createAdminClient()
    const { data: allGenerations, error } = await supabase
      .from('generations')
      .select('action, model, generation_type, studio_type, style_tags, credits_used, is_favorite, created_at')
      .eq('user_id', user.id)

    if (error) {
      console.error('❌ Failed to fetch generation stats:', error)
      return NextResponse.json(
        { error: 'Failed to fetch stats' },
        { status: 500 }
      )
    }

    const generations = allGenerations || []

    // 计算统计信息
    const stats = {
      total_generations: generations.length,
      total_credits_consumed: generations.reduce((sum, gen) => sum + (gen.credits_used || 0), 0),
      favorite_count: generations.filter(gen => gen.is_favorite).length,
      models_used: {} as { [key: string]: number },
      actions_used: {} as { [key: string]: number },
      studio_types_used: {} as { [key: string]: number },
      generation_types_used: {} as { [key: string]: number },
      style_tags_used: {} as { [key: string]: number },
      recent_activity: {
        today: 0,
        this_week: 0,
        this_month: 0
      }
    }

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    generations.forEach(gen => {
      // 统计模型使用
      if (gen.model) {
        stats.models_used[gen.model] = (stats.models_used[gen.model] || 0) + 1
      }

      // 统计动作使用
      if (gen.action) {
        stats.actions_used[gen.action] = (stats.actions_used[gen.action] || 0) + 1
      }

      // 统计工作室类型使用
      if (gen.studio_type) {
        stats.studio_types_used[gen.studio_type] = (stats.studio_types_used[gen.studio_type] || 0) + 1
      }

      // 统计生成类型使用
      if (gen.generation_type) {
        stats.generation_types_used[gen.generation_type] = (stats.generation_types_used[gen.generation_type] || 0) + 1
      }

      // 统计风格标签使用
      if (gen.style_tags && Array.isArray(gen.style_tags)) {
        gen.style_tags.forEach((tag: string) => {
          stats.style_tags_used[tag] = (stats.style_tags_used[tag] || 0) + 1
        })
      }

      // 统计最近活动
      const createdAt = new Date(gen.created_at)
      if (createdAt >= today) stats.recent_activity.today++
      if (createdAt >= weekAgo) stats.recent_activity.this_week++
      if (createdAt >= monthAgo) stats.recent_activity.this_month++
    })

    return NextResponse.json({
      success: true,
      stats
    })

  } catch (error) {
    console.error('❌ Memory Garden stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}