/**
 * 豆包 (Doubao) AI 图像生成服务
 * 支持文字生成图片和图片风格转换
 * 特别优化吉卜力风格图像生成
 */

interface DoubaoTextToImageRequest {
  prompt: string
  size?: string
  quality?: string
  style?: string
  n?: number
}

interface DoubaoImageEditRequest {
  image: string // Base64编码的原始图像
  prompt: string // 编辑指令
  size?: string
  quality?: string
}

interface DoubaoImageResponse {
  data: Array<{
    url?: string
    b64_json?: string
    revised_prompt?: string
  }>
}

class DoubaoService {
  private apiKey: string
  private apiUrl: string
  private textToImageModel: string
  private imageEditModel: string

  constructor() {
    this.apiKey = process.env.DOUBAO_API_KEY || ''
    this.apiUrl = process.env.DOUBAO_API_URL || 'https://ark.cn-beijing.volces.com/api/v3'
    this.textToImageModel = process.env.DOUBAO_MODEL_TEXT_TO_IMAGE || 'doubao-seedream-3-0-t2i-250415'
    this.imageEditModel = process.env.DOUBAO_MODEL_IMAGE_EDIT || 'doubao-seededit-2-0'

    if (!this.apiKey) {
      throw new Error('豆包 API Key 未配置，请在环境变量中设置 DOUBAO_API_KEY')
    }
  }

  /**
   * 增强提示词，添加吉卜力风格描述
   */
  private enhanceGhibliPrompt(originalPrompt: string): string {
    const ghibliStyleEnhancement = `
Studio Ghibli style, magical realism, whimsical atmosphere, 
soft watercolor textures, hand-drawn animation aesthetics, 
warm natural lighting, fantastical creatures, 
peaceful countryside scenery, dreamy clouds, 
vintage color palette with earth tones, 
emotional storytelling through visuals, 
detailed environmental backgrounds, 
organic flowing shapes, gentle character expressions.
`

    // 如果是中文提示词，添加中文的吉卜力风格描述
    const chineseEnhancement = `
吉卜力工作室风格，魔幻现实主义，奇幻温馨氛围，
柔和水彩质感，手绘动画美学，温暖自然光线，
奇幻生物，宁静乡村风景，梦幻云朵，
复古色调配以大地色系，通过视觉讲述情感故事，
精细环境背景，有机流动形状，温和角色表情。
`

    // 检测是否包含中文字符
    const hasChinese = /[\u4e00-\u9fff]/.test(originalPrompt)
    
    if (hasChinese) {
      return `${originalPrompt}，${chineseEnhancement}`
    } else {
      return `${originalPrompt}, ${ghibliStyleEnhancement}`
    }
  }

  /**
   * 创建HTTP请求头
   */
  private getHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  /**
   * 文字生成图片 (Text-to-Image)
   * 
   * @param prompt 文字描述
   * @param options 生成选项
   * @returns 生成的图片数据
   */
  async generateImage(
    prompt: string, 
    options: Partial<DoubaoTextToImageRequest> = {}
  ): Promise<DoubaoImageResponse> {
    try {
      // 增强提示词以生成吉卜力风格
      const enhancedPrompt = this.enhanceGhibliPrompt(prompt)

      const requestBody = {
        model: this.textToImageModel,
        prompt: enhancedPrompt,
        size: options.size || "1024x1024",
        quality: options.quality || "standard",
        n: options.n || 1,
        response_format: "url"
      }

      console.log('豆包 文字生成图片请求:', {
        model: this.textToImageModel,
        prompt: enhancedPrompt.substring(0, 100) + '...',
        size: requestBody.size
      })

      const response = await fetch(`${this.apiUrl}/images/generations`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`豆包 API 错误 (${response.status}): ${errorText}`)
      }

      const result = await response.json()
      console.log('豆包 文字生成图片成功:', result)
      
      return result
    } catch (error) {
      console.error('豆包 文字生成图片失败:', error)
      throw new Error(
        error instanceof Error 
          ? `豆包图像生成失败: ${error.message}`
          : '豆包图像生成服务不可用'
      )
    }
  }

  /**
   * 图片风格转换 (Image Style Transfer)
   * 
   * @param imageBase64 原始图片的Base64编码
   * @param stylePrompt 风格转换描述
   * @param options 转换选项
   * @returns 转换后的图片数据
   */
  async convertImageStyle(
    imageBase64: string,
    stylePrompt: string,
    options: Partial<DoubaoImageEditRequest> = {}
  ): Promise<DoubaoImageResponse> {
    try {
      // 增强风格转换提示词
      const enhancedPrompt = this.enhanceGhibliPrompt(
        `Convert this image to: ${stylePrompt}`
      )

      const requestBody = {
        model: this.imageEditModel,
        image: imageBase64,
        prompt: enhancedPrompt,
        size: options.size || "1024x1024",
        quality: options.quality || "standard",
        response_format: "url"
      }

      console.log('豆包 图片风格转换请求:', {
        model: this.imageEditModel,
        prompt: enhancedPrompt.substring(0, 100) + '...',
        size: requestBody.size
      })

      const response = await fetch(`${this.apiUrl}/images/edits`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`豆包 API 错误 (${response.status}): ${errorText}`)
      }

      const result = await response.json()
      console.log('豆包 图片风格转换成功:', result)
      
      return result
    } catch (error) {
      console.error('豆包 图片风格转换失败:', error)
      throw new Error(
        error instanceof Error 
          ? `豆包风格转换失败: ${error.message}`
          : '豆包风格转换服务不可用'
      )
    }
  }

  /**
   * 检查服务是否可用
   */
  async checkHealth(): Promise<boolean> {
    try {
      // 尝试生成一个简单的测试图片
      const testResponse = await this.generateImage("test image", { n: 1 })
      return testResponse && testResponse.data && testResponse.data.length > 0
    } catch (error) {
      console.error('豆包服务健康检查失败:', error)
      return false
    }
  }

  /**
   * 获取服务配置信息
   */
  getServiceInfo() {
    return {
      serviceName: '豆包 (Doubao) AI 图像生成',
      provider: 'ByteDance/Volcano Engine',
      models: {
        textToImage: this.textToImageModel,
        imageEdit: this.imageEditModel
      },
      apiUrl: this.apiUrl,
      isConfigured: !!this.apiKey
    }
  }
}

// 导出单例实例
export const doubaoService = new DoubaoService()

// 导出类型定义
export type {
  DoubaoTextToImageRequest,
  DoubaoImageEditRequest,
  DoubaoImageResponse
}

export default DoubaoService