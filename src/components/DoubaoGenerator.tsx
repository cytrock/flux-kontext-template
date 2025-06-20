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
      setError("Please enter image description text")
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
        throw new Error(data.error || 'Image generation failed')
      }

      if (data.success && data.data && data.data.length > 0) {
        const imageUrl = data.data[0].url
        setGeneratedImage(imageUrl)
        setSuccess("Dreamy Animation image generated successfully!")
        onImageGenerated?.(imageUrl)
      } else {
        throw new Error('No valid image data received')
      }

    } catch (error) {
      console.error('Dreamy Animation text-to-image error:', error)
      setError(error instanceof Error ? error.message : 'Image generation failed, please try again later')
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
      setError('Please select an image file')
      return
    }

    // 验证文件大小 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image file cannot exceed 10MB')
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
      setError('Image reading failed')
    }
    reader.readAsDataURL(file)
  }

  // 图片风格转换
  const handleStyleTransfer = async () => {
    if (!uploadedImage) {
      setError("Please upload an image first")
      return
    }

    if (!stylePrompt.trim()) {
      setError("Please enter style transfer description")
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
        throw new Error(data.error || 'Style transfer failed')
      }

      if (data.success && data.data && data.data.length > 0) {
        const imageUrl = data.data[0].url
        setConvertedImage(imageUrl)
        setSuccess("Dreamy Animation style transferred successfully!")
        onImageGenerated?.(imageUrl)
      } else {
        throw new Error('No valid transfer result received')
      }

    } catch (error) {
      console.error('Dreamy Animation style transfer error:', error)
      setError(error instanceof Error ? error.message : 'Style transfer failed, please try again later')
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
      setError('Image download failed')
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Dreamy Animation service title */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-6 w-6 text-ghibli-warm animate-gentle-bounce" />
          <h2 className="text-2xl font-bold text-ghibli-cream">
            Dreamy Animation Style Generator
          </h2>
          <Sparkles className="h-6 w-6 text-ghibli-warm animate-gentle-bounce" />
        </div>
        <p className="text-ghibli-cream/80">
          Create enchanting animated-style images with magical charm and warmth
        </p>
        <Badge variant="outline" className="bg-ghibli-warm/20 text-ghibli-warm border-ghibli-warm">
          Animation Specialist
        </Badge>
      </div>

      {/* Function tabs */}
      <div className="flex justify-center space-x-4">
        <Button
          variant={activeTab === 'text-to-image' ? 'default' : 'outline'}
          onClick={() => setActiveTab('text-to-image')}
          className="flex items-center space-x-2"
        >
          <ImageIcon className="h-4 w-4" />
          <span>Text to Image</span>
        </Button>
        <Button
          variant={activeTab === 'style-transfer' ? 'default' : 'outline'}
          onClick={() => setActiveTab('style-transfer')}
          className="flex items-center space-x-2"
        >
          <Wand2 className="h-4 w-4" />
          <span>Style Transfer</span>
        </Button>
      </div>

      {/* Error and success messages */}
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

      {/* Text to image */}
      {activeTab === 'text-to-image' && (
        <Card className="card-ghibli p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-prompt" className="text-ghibli-cream font-medium">
                Image Description (Multilingual Support)
              </Label>
              <Textarea
                id="text-prompt"
                placeholder="Example: In a peaceful forest, a white totoro sits under a large tree with dandelions floating around..."
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                className="input-ghibli mt-2 min-h-[100px]"
                maxLength={1000}
              />
              <div className="mt-1 text-xs text-ghibli-cream/80">
                {textPrompt.length}/1000 characters - Auto-optimized for dreamy animation style
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
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Dreamy Animation
                </>
              )}
            </Button>

            {/* Generated image */}
            {generatedImage && (
              <div className="space-y-4">
                <div className="relative group">
                  <img
                    src={generatedImage}
                    alt="Generated image"
                    className="w-full rounded-lg shadow-ghibli-medium"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      onClick={() => downloadImage(generatedImage, `dreamy-animation-${Date.now()}.png`)}
                      className="btn-ghibli-secondary"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Image
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Image style transfer */}
      {activeTab === 'style-transfer' && (
        <Card className="card-ghibli p-6">
          <div className="space-y-4">
            {/* Image upload area */}
            <div>
              <Label className="text-ghibli-cream font-medium">
                Upload Original Image
              </Label>
              <div
                className="mt-2 border-2 border-dashed border-ghibli-sage/40 rounded-lg p-6 text-center hover:border-ghibli-warm/60 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedImage ? (
                  <div className="space-y-2">
                    <img
                      src={uploadedImage}
                      alt="Uploaded image"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-ghibli-cream/80">{uploadedFileName}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        fileInputRef.current?.click()
                      }}
                    >
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-12 w-12 text-ghibli-cream/80 mx-auto" />
                    <p className="text-ghibli-cream">Click to upload image</p>
                    <p className="text-sm text-ghibli-cream/80">
                      Supports JPEG, PNG, WebP formats, max 10MB
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

            {/* Style description */}
            <div>
              <Label htmlFor="style-prompt" className="text-ghibli-cream font-medium">
                Style Transfer Description
              </Label>
              <Textarea
                id="style-prompt"
                placeholder="Example: Transform to dreamy animation style, warm tones, hand-drawn texture, magical atmosphere..."
                value={stylePrompt}
                onChange={(e) => setStylePrompt(e.target.value)}
                className="input-ghibli mt-2"
                maxLength={500}
              />
              <div className="mt-1 text-xs text-ghibli-cream/80">
                {stylePrompt.length}/500 characters - Auto-optimized for dreamy animation style
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
                  Converting...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Apply Dreamy Style
                </>
              )}
            </Button>

            {/* Converted image */}
            {convertedImage && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Original image */}
                  <div>
                    <h4 className="text-sm font-medium text-ghibli-cream mb-2">Original Image</h4>
                    <img
                      src={uploadedImage || ''}
                      alt="Original image"
                      className="w-full rounded-lg shadow-ghibli-light"
                    />
                  </div>
                  
                  {/* Converted image */}
                  <div>
                    <h4 className="text-sm font-medium text-ghibli-cream mb-2">Converted Image</h4>
                    <div className="relative group">
                      <img
                        src={convertedImage}
                        alt="Converted image"
                        className="w-full rounded-lg shadow-ghibli-medium"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button
                          onClick={() => downloadImage(convertedImage, `dreamy-animation-${Date.now()}.png`)}
                          className="btn-ghibli-secondary"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Converted Image
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