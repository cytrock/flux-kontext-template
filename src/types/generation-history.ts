// 🎨 Memory Garden - 生成历史类型定义

export interface GenerationHistory {
  id: string
  user_id: string
  
  // 🎨 生成基本信息
  prompt: string
  action: string // text-to-image-pro, edit-image-pro, etc.
  model: string // pro, max, schnell, anime, etc.
  
  // 🖼️ 图片信息
  image_url: string // 主要图片URL
  image_urls?: string[] // 多张图片URLs
  thumbnail_url?: string // 缩略图URL
  
  // 📐 技术参数
  aspect_ratio?: string // 1:1, 16:9, etc.
  guidance_scale?: number // 3.5
  num_images?: number
  safety_tolerance?: string // "2"
  output_format?: string // jpeg, png
  seed?: number
  
  // 🎨 风格和主题
  style_tags?: string[] // ["ghibli", "anime", "realistic"]
  content_tags?: string[] // ["portrait", "landscape", "character"]
  color_palette?: string[] // ["warm", "cool", "vibrant"]
  
  // 📊 生成元数据
  generation_time_ms?: number // 生成耗时(毫秒)
  credits_consumed: number // 消耗积分数
  fal_request_id?: string // FAL API请求ID
  
  // 🔍 搜索和分类
  is_favorite?: boolean // 用户收藏
  is_public?: boolean // 是否公开展示
  visibility?: 'private' | 'public' | 'shared' // 可见性设置
  
  // 📱 设备和来源信息
  device_type?: string // desktop, mobile, tablet
  user_agent?: string
  
  // 🕐 时间戳
  created_at: string
  updated_at: string
}

// 🎨 创建生成历史的输入类型
export interface CreateGenerationHistoryInput {
  user_id: string
  prompt: string
  action: string
  model: string
  image_url: string
  image_urls?: string[]
  aspect_ratio?: string
  guidance_scale?: number
  num_images?: number
  safety_tolerance?: string
  output_format?: string
  seed?: number
  style_tags?: string[]
  content_tags?: string[]
  color_palette?: string[]
  generation_time_ms?: number
  credits_consumed: number
  fal_request_id?: string
  device_type?: string
  user_agent?: string
}

// 🔍 查询生成历史的过滤器
export interface GenerationHistoryFilter {
  user_id?: string
  action?: string
  model?: string
  style_tags?: string[]
  is_favorite?: boolean
  visibility?: 'private' | 'public' | 'shared'
  date_from?: string
  date_to?: string
  limit?: number
  offset?: number
}

// 📊 生成历史统计信息
export interface GenerationHistoryStats {
  total_generations: number
  total_credits_consumed: number
  favorite_count: number
  models_used: { [key: string]: number }
  actions_used: { [key: string]: number }
  style_tags_used: { [key: string]: number }
  recent_activity: {
    today: number
    this_week: number
    this_month: number
  }
}

// 🎨 风格标签预定义
export const STYLE_TAGS = {
  // 艺术风格
  GHIBLI: 'ghibli',
  ANIME: 'anime', 
  REALISTIC: 'realistic',
  ARTISTIC: 'artistic',
  MINIMAL: 'minimal',
  VINTAGE: 'vintage',
  MODERN: 'modern',
  
  // 色彩风格
  WARM: 'warm',
  COOL: 'cool',
  VIBRANT: 'vibrant',
  MONOCHROME: 'monochrome',
  PASTEL: 'pastel',
  
  // 主题风格
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
  CHARACTER: 'character',
  ABSTRACT: 'abstract',
  NATURE: 'nature',
  URBAN: 'urban',
  FANTASY: 'fantasy'
} as const

export type StyleTag = typeof STYLE_TAGS[keyof typeof STYLE_TAGS]