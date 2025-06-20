// 🎨 Memory Garden - 生成历史数据库服务

import { createAdminClient } from '@/lib/supabase/server'
import { 
  GenerationHistory, 
  CreateGenerationHistoryInput, 
  GenerationHistoryFilter,
  GenerationHistoryStats,
  STYLE_TAGS
} from '@/types/generation-history'
import { getUuid } from '@/lib/utils/hash'

export class GenerationHistoryService {
  
  // 🎨 保存生成历史
  static async createGenerationHistory(input: CreateGenerationHistoryInput): Promise<GenerationHistory> {
    const supabase = createAdminClient()
    
    const historyData = {
      id: getUuid(),
      ...input,
      style_tags: input.style_tags || [],
      content_tags: input.content_tags || [],
      color_palette: input.color_palette || [],
      is_favorite: false,
      is_public: false,
      visibility: 'private' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    console.log('🎨 Creating generation history:', {
      id: historyData.id,
      user_id: historyData.user_id,
      action: historyData.action,
      model: historyData.model,
      credits_consumed: historyData.credits_consumed
    })
    
    const { data, error } = await supabase
      .from('generation_history')
      .insert(historyData)
      .select()
      .single()
    
    if (error) {
      console.error('❌ Failed to create generation history:', error)
      throw new Error(`Failed to save generation history: ${error.message}`)
    }
    
    console.log('✅ Generation history created successfully:', data.id)
    return data
  }
  
  // 📚 获取用户的生成历史
  static async getUserGenerationHistory(
    userId: string, 
    filter: GenerationHistoryFilter = {}
  ): Promise<{ data: GenerationHistory[], total: number }> {
    const supabase = createAdminClient()
    
    let query = supabase
      .from('generation_history')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    // 应用过滤器
    if (filter.action) {
      query = query.eq('action', filter.action)
    }
    
    if (filter.model) {
      query = query.eq('model', filter.model)
    }
    
    if (filter.is_favorite !== undefined) {
      query = query.eq('is_favorite', filter.is_favorite)
    }
    
    if (filter.visibility) {
      query = query.eq('visibility', filter.visibility)
    }
    
    if (filter.style_tags && filter.style_tags.length > 0) {
      query = query.overlaps('style_tags', filter.style_tags)
    }
    
    if (filter.date_from) {
      query = query.gte('created_at', filter.date_from)
    }
    
    if (filter.date_to) {
      query = query.lte('created_at', filter.date_to)
    }
    
    // 分页
    const limit = filter.limit || 20
    const offset = filter.offset || 0
    query = query.range(offset, offset + limit - 1)
    
    const { data, error, count } = await query
    
    if (error) {
      console.error('❌ Failed to fetch generation history:', error)
      throw new Error(`Failed to fetch generation history: ${error.message}`)
    }
    
    return {
      data: data || [],
      total: count || 0
    }
  }
  
  // 🌟 切换收藏状态
  static async toggleFavorite(historyId: string, userId: string): Promise<boolean> {
    const supabase = createAdminClient()
    
    // 先获取当前状态
    const { data: current, error: fetchError } = await supabase
      .from('generation_history')
      .select('is_favorite')
      .eq('id', historyId)
      .eq('user_id', userId) // 确保用户只能操作自己的历史
      .single()
    
    if (fetchError || !current) {
      throw new Error('Generation history not found')
    }
    
    const newFavoriteStatus = !current.is_favorite
    
    const { error } = await supabase
      .from('generation_history')
      .update({ 
        is_favorite: newFavoriteStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', historyId)
      .eq('user_id', userId)
    
    if (error) {
      console.error('❌ Failed to toggle favorite:', error)
      throw new Error(`Failed to toggle favorite: ${error.message}`)
    }
    
    console.log(`✅ Toggled favorite for ${historyId}: ${newFavoriteStatus}`)
    return newFavoriteStatus
  }
  
  // 📊 获取用户统计信息
  static async getUserStats(userId: string): Promise<GenerationHistoryStats> {
    const supabase = createAdminClient()
    
    // 获取基本统计
    const { data: allHistory, error } = await supabase
      .from('generation_history')
      .select('action, model, style_tags, credits_consumed, is_favorite, created_at')
      .eq('user_id', userId)
    
    if (error) {
      console.error('❌ Failed to fetch user stats:', error)
      throw new Error(`Failed to fetch user stats: ${error.message}`)
    }
    
    const history = allHistory || []
    
    // 计算统计信息
    const stats: GenerationHistoryStats = {
      total_generations: history.length,
      total_credits_consumed: history.reduce((sum, h) => sum + (h.credits_consumed || 0), 0),
      favorite_count: history.filter(h => h.is_favorite).length,
      models_used: {},
      actions_used: {},
      style_tags_used: {},
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
    
    history.forEach(h => {
      // 统计模型使用
      stats.models_used[h.model] = (stats.models_used[h.model] || 0) + 1
      
      // 统计动作使用
      stats.actions_used[h.action] = (stats.actions_used[h.action] || 0) + 1
      
      // 统计风格标签使用
      if (h.style_tags) {
        h.style_tags.forEach((tag: string) => {
          stats.style_tags_used[tag] = (stats.style_tags_used[tag] || 0) + 1
        })
      }
      
      // 统计最近活动
      const createdAt = new Date(h.created_at)
      if (createdAt >= today) stats.recent_activity.today++
      if (createdAt >= weekAgo) stats.recent_activity.this_week++
      if (createdAt >= monthAgo) stats.recent_activity.this_month++
    })
    
    return stats
  }
  
  // 🗑️ 删除生成历史
  static async deleteGenerationHistory(historyId: string, userId: string): Promise<void> {
    const supabase = createAdminClient()
    
    const { error } = await supabase
      .from('generation_history')
      .delete()
      .eq('id', historyId)
      .eq('user_id', userId) // 确保用户只能删除自己的历史
    
    if (error) {
      console.error('❌ Failed to delete generation history:', error)
      throw new Error(`Failed to delete generation history: ${error.message}`)
    }
    
    console.log(`✅ Deleted generation history: ${historyId}`)
  }
  
  // 🏷️ 自动分析并生成风格标签
  static analyzeStyleTags(prompt: string, action: string, model: string): string[] {
    const tags: string[] = []
    const lowerPrompt = prompt.toLowerCase()
    
    // 基于模型添加风格标签
    if (model === 'anime') tags.push(STYLE_TAGS.ANIME)
    
    // 基于动作添加标签
    if (action.includes('text-to-image')) {
      tags.push('text-to-image')
    } else if (action.includes('edit-image')) {
      tags.push('image-editing')
    }
    
    // 基于prompt内容分析风格
    if (lowerPrompt.includes('ghibli') || lowerPrompt.includes('studio ghibli')) {
      tags.push(STYLE_TAGS.GHIBLI)
    }
    
    if (lowerPrompt.includes('realistic') || lowerPrompt.includes('photorealistic')) {
      tags.push(STYLE_TAGS.REALISTIC)
    }
    
    if (lowerPrompt.includes('anime') || lowerPrompt.includes('manga')) {
      tags.push(STYLE_TAGS.ANIME)
    }
    
    if (lowerPrompt.includes('portrait') || lowerPrompt.includes('face') || lowerPrompt.includes('person')) {
      tags.push(STYLE_TAGS.PORTRAIT)
    }
    
    if (lowerPrompt.includes('landscape') || lowerPrompt.includes('scenery') || lowerPrompt.includes('background')) {
      tags.push(STYLE_TAGS.LANDSCAPE)
    }
    
    if (lowerPrompt.includes('nature') || lowerPrompt.includes('forest') || lowerPrompt.includes('mountain')) {
      tags.push(STYLE_TAGS.NATURE)
    }
    
    if (lowerPrompt.includes('fantasy') || lowerPrompt.includes('magic') || lowerPrompt.includes('dragon')) {
      tags.push(STYLE_TAGS.FANTASY)
    }
    
    // 去重并返回
    return [...new Set(tags)]
  }
}