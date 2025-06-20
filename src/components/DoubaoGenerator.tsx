"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  ImageIcon, 
  Wand2, 
  Upload, 
  Download, 
  Sparkles, 
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react"

interface DoubaoGeneratorProps {
  onImageGenerated?: (imageUrl: string) => void
}

export function DoubaoGenerator({ onImageGenerated }: DoubaoGeneratorProps) {
  // 状态管理
  const [activeTab, setActiveTab] = useState<'text-to-image' | 'style-transfer'>('text-to-image')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // 文字生成图片状态
  const [textPrompt, setTextPrompt] = useState("")
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  
  // 图片风格转换状态
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)
  const [stylePrompt, setStylePrompt] = useState("")
  const [convertedImage, setConvertedImage] = useState<string | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 重置消息
  const resetMessages = () => {
    setError(null)
    setSuccess(null)
  }

  // 文字生成图片
  const handleTextToImage = async () => {
    if (!textPrompt.trim()) {
      setError("请输入图像描述文字")
      return
    }

    setIsLoading(true)
    resetMessages()

    try {
      const response = await fetch('/api/doubao/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: textPrompt,
          size: '1024x1024',
          quality: 'standard'
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '图像生成失败')
      }

      if (data.success && data.data && data.data.length > 0) {
        const imageUrl = data.data[0].url
        setGeneratedImage(imageUrl)
        setSuccess("吉卜力风格图像生成成功！")
        onImageGenerated?.(imageUrl)
      } else {
        throw new Error('没有收到有效的图像数据')
      }

    } catch (error) {
      console.error('豆包文字生成图片错误:', error)
      setError(error instanceof Error ? error.message : '图像生成失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      setError('请选择图片文件')
      return
    }

    // 验证文件大小 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('图片文件不能超过10MB')
      return
    }

    resetMessages()
    setUploadedFileName(file.name)

    // 转换为base64
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setUploadedImage(result)
    }
    reader.onerror = () => {
      setError('图片读取失败')
    }
    reader.readAsDataURL(file)
  }

  // 图片风格转换
  const handleStyleTransfer = async () => {
    if (!uploadedImage) {
      setError("请先上传图片")
      return
    }

    if (!stylePrompt.trim()) {
      setError("请输入风格转换描述")
      return
    }

    setIsLoading(true)
    resetMessages()

    try {
      const response = await fetch('/api/doubao/style-transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: uploadedImage,
          stylePrompt: stylePrompt,
          size: '1024x1024',
          quality: 'standard'
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '风格转换失败')
      }

      if (data.success && data.data && data.data.length > 0) {
        const imageUrl = data.data[0].url
        setConvertedImage(imageUrl)
        setSuccess("吉卜力风格转换成功！")
        onImageGenerated?.(imageUrl)
      } else {
        throw new Error('没有收到有效的转换结果')
      }

    } catch (error) {
      console.error('豆包图片风格转换错误:', error)
      setError(error instanceof Error ? error.message : '风格转换失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  // 下载图片
  const downloadImage = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      window.URL.revokeObjectURL(url)
    } catch (error) {
      setError('图片下载失败')
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 豆包AI服务标题 */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-6 w-6 text-ghibli-warm animate-gentle-bounce" />
          <h2 className="text-2xl font-bold text-ghibli-cream">
            豆包 AI 吉卜力风格图像生成
          </h2>
          <Sparkles className="h-6 w-6 text-ghibli-warm animate-gentle-bounce" />
        </div>
        <p className="text-ghibli-sage">
          使用豆包大模型创建梦幻的吉卜力风格图像，支持文字生成和风格转换
        </p>
        <Badge variant="outline" className="bg-ghibli-warm/20 text-ghibli-warm border-ghibli-warm">
          ByteDance Doubao AI
        </Badge>
      </div>

      {/* 功能选项卡 */}
      <div className="flex justify-center space-x-4">
        <Button
          variant={activeTab === 'text-to-image' ? 'default' : 'outline'}
          onClick={() => setActiveTab('text-to-image')}
          className="flex items-center space-x-2"
        >
          <ImageIcon className="h-4 w-4" />
          <span>文字生成图片</span>
        </Button>
        <Button
          variant={activeTab === 'style-transfer' ? 'default' : 'outline'}
          onClick={() => setActiveTab('style-transfer')}
          className="flex items-center space-x-2"
        >
          <Wand2 className="h-4 w-4" />
          <span>图片风格转换</span>
        </Button>
      </div>

      {/* 错误和成功消息 */}
      {error && (
        <div className="flex items-center space-x-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <span className="text-destructive">{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center space-x-2 p-4 bg-success/10 border border-success/20 rounded-lg">
          <CheckCircle className="h-5 w-5 text-success" />
          <span className="text-success">{success}</span>
        </div>
      )}

      {/* 文字生成图片 */}
      {activeTab === 'text-to-image' && (
        <Card className="card-ghibli p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-prompt" className="text-ghibli-cream font-medium">
                图像描述 (支持中英文)
              </Label>
              <Textarea
                id="text-prompt"
                placeholder="例如：在宁静的森林中，一只白色的龙猫坐在大树下，周围飘着蒲公英..."
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                className="input-ghibli mt-2 min-h-[100px]"
                maxLength={1000}
              />
              <div className="mt-1 text-xs text-ghibli-sage">
                {textPrompt.length}/1000 字符 - 自动优化为吉卜力风格
              </div>
            </div>

            <Button
              onClick={handleTextToImage}
              disabled={isLoading || !textPrompt.trim()}
              className="btn-ghibli w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  生成吉卜力风格图像
                </>
              )}
            </Button>

            {/* 生成的图片 */}
            {generatedImage && (
              <div className="space-y-4">
                <div className="relative group">
                  <img
                    src={generatedImage}
                    alt="生成的图像"
                    className="w-full rounded-lg shadow-ghibli-medium"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      onClick={() => downloadImage(generatedImage, `doubao-generated-${Date.now()}.png`)}
                      className="btn-ghibli-secondary"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      下载图片
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* 图片风格转换 */}
      {activeTab === 'style-transfer' && (
        <Card className="card-ghibli p-6">
          <div className="space-y-4">
            {/* 图片上传区域 */}
            <div>
              <Label className="text-ghibli-cream font-medium">
                上传原始图片
              </Label>
              <div
                className="mt-2 border-2 border-dashed border-ghibli-sage/40 rounded-lg p-6 text-center hover:border-ghibli-warm/60 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedImage ? (
                  <div className="space-y-2">
                    <img
                      src={uploadedImage}
                      alt="上传的图片"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-ghibli-sage">{uploadedFileName}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        fileInputRef.current?.click()
                      }}
                    >
                      更换图片
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-12 w-12 text-ghibli-sage mx-auto" />
                    <p className="text-ghibli-cream">点击上传图片</p>
                    <p className="text-sm text-ghibli-sage">
                      支持 JPEG、PNG、WebP 格式，最大 10MB
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* 风格描述 */}
            <div>
              <Label htmlFor="style-prompt" className="text-ghibli-cream font-medium">
                风格转换描述
              </Label>
              <Textarea
                id="style-prompt"
                placeholder="例如：转换为吉卜力动画风格，温暖的色调，手绘质感，梦幻氛围..."
                value={stylePrompt}
                onChange={(e) => setStylePrompt(e.target.value)}
                className="input-ghibli mt-2"
                maxLength={500}
              />
              <div className="mt-1 text-xs text-ghibli-sage">
                {stylePrompt.length}/500 字符 - 自动优化为吉卜力风格
              </div>
            </div>

            <Button
              onClick={handleStyleTransfer}
              disabled={isLoading || !uploadedImage || !stylePrompt.trim()}
              className="btn-ghibli w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  转换中...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  开始风格转换
                </>
              )}
            </Button>

            {/* 转换后的图片 */}
            {convertedImage && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* 原图 */}
                  <div>
                    <h4 className="text-sm font-medium text-ghibli-cream mb-2">原始图片</h4>
                    <img
                      src={uploadedImage || ''}
                      alt="原始图片"
                      className="w-full rounded-lg shadow-ghibli-light"
                    />
                  </div>
                  
                  {/* 转换后 */}
                  <div>
                    <h4 className="text-sm font-medium text-ghibli-cream mb-2">转换后</h4>
                    <div className="relative group">
                      <img
                        src={convertedImage}
                        alt="转换后的图片"
                        className="w-full rounded-lg shadow-ghibli-medium"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button
                          onClick={() => downloadImage(convertedImage, `doubao-converted-${Date.now()}.png`)}
                          className="btn-ghibli-secondary"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          下载转换图片
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}