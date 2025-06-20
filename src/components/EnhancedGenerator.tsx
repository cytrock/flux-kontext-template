"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FluxKontextGenerator } from "@/components/FluxKontextGenerator"
import { DoubaoGenerator } from "@/components/DoubaoGenerator"
import { Wand2, Sparkles, Zap, Crown } from "lucide-react"

type GeneratorType = 'flux-kontext' | 'doubao'

export function EnhancedGenerator() {
  const [activeGenerator, setActiveGenerator] = useState<GeneratorType>('flux-kontext')

  return (
    <div className="space-y-8">
      {/* 页面标题和描述 */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-8 w-8 text-ghibli-warm animate-gentle-bounce" />
          <h1 className="text-4xl font-bold text-ghibli-cream">
            AI 图像生成工作室
          </h1>
          <Sparkles className="h-8 w-8 text-ghibli-warm animate-gentle-bounce" />
        </div>
        <p className="text-xl text-ghibli-sage max-w-3xl mx-auto">
          选择您喜欢的 AI 模型，创作专业级的吉卜力风格图像
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="outline" className="bg-ghibli-warm/20 text-ghibli-warm border-ghibli-warm">
            🎨 双模型支持
          </Badge>
          <Badge variant="outline" className="bg-ghibli-coral/20 text-ghibli-coral border-ghibli-coral">
            🌟 吉卜力风格特化
          </Badge>
          <Badge variant="outline" className="bg-ghibli-sky/20 text-ghibli-sky border-ghibli-sky">
            ⚡ 高质量生成
          </Badge>
        </div>
      </div>

      {/* 模型选择器 */}
      <div className="flex justify-center space-x-4">
        <Button
          variant={activeGenerator === 'flux-kontext' ? 'default' : 'outline'}
          onClick={() => setActiveGenerator('flux-kontext')}
          className={`flex items-center space-x-3 px-6 py-3 ${
            activeGenerator === 'flux-kontext' 
              ? 'btn-ghibli' 
              : 'border-ghibli-sage/40 text-ghibli-cream hover:border-ghibli-warm/60'
          }`}
        >
          <Zap className="h-5 w-5" />
          <div className="text-left">
            <div className="font-medium">Flux Kontext</div>
            <div className="text-xs opacity-75">专业图像生成</div>
          </div>
          {activeGenerator === 'flux-kontext' && (
            <Crown className="h-4 w-4 text-ghibli-warm" />
          )}
        </Button>

        <Button
          variant={activeGenerator === 'doubao' ? 'default' : 'outline'}
          onClick={() => setActiveGenerator('doubao')}
          className={`flex items-center space-x-3 px-6 py-3 ${
            activeGenerator === 'doubao' 
              ? 'btn-ghibli' 
              : 'border-ghibli-sage/40 text-ghibli-cream hover:border-ghibli-warm/60'
          }`}
        >
          <Sparkles className="h-5 w-5" />
          <div className="text-left">
            <div className="font-medium">豆包 AI</div>
            <div className="text-xs opacity-75">吉卜力风格专精</div>
          </div>
          {activeGenerator === 'doubao' && (
            <Crown className="h-4 w-4 text-ghibli-warm" />
          )}
        </Button>
      </div>

      {/* 模型特色说明 */}
      <div className="max-w-4xl mx-auto">
        {activeGenerator === 'flux-kontext' && (
          <div className="bg-ghibli-forest/20 border border-ghibli-sage/30 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Zap className="h-5 w-5 text-ghibli-warm" />
              <span className="font-medium text-ghibli-cream">Flux Kontext AI</span>
            </div>
            <p className="text-sm text-ghibli-sage">
              基于 FAL AI 的高性能图像生成模型，支持多种风格和高分辨率输出，
              拥有强大的文本理解能力和细节表现力。
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <Badge variant="secondary" className="text-xs">高分辨率</Badge>
              <Badge variant="secondary" className="text-xs">多样化风格</Badge>
              <Badge variant="secondary" className="text-xs">精细控制</Badge>
              <Badge variant="secondary" className="text-xs">批量生成</Badge>
            </div>
          </div>
        )}

        {activeGenerator === 'doubao' && (
          <div className="bg-ghibli-warm/20 border border-ghibli-warm/30 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="h-5 w-5 text-ghibli-warm" />
              <span className="font-medium text-ghibli-cream">豆包 (Doubao) AI</span>
            </div>
            <p className="text-sm text-ghibli-sage">
              字节跳动推出的多模态大模型，特别擅长吉卜力风格图像生成和风格转换，
              支持中英文双语描述，在动画风格表现上有独特优势。
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <Badge variant="secondary" className="text-xs">吉卜力专精</Badge>
              <Badge variant="secondary" className="text-xs">风格转换</Badge>
              <Badge variant="secondary" className="text-xs">中英双语</Badge>
              <Badge variant="secondary" className="text-xs">动画风格</Badge>
            </div>
          </div>
        )}
      </div>

      {/* 生成器内容 */}
      <div className="relative">
        {/* 切换动画容器 */}
        <div className={`transition-opacity duration-300 ${
          activeGenerator === 'flux-kontext' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
        }`}>
          {activeGenerator === 'flux-kontext' && <FluxKontextGenerator />}
        </div>

        <div className={`transition-opacity duration-300 ${
          activeGenerator === 'doubao' ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
        }`}>
          {activeGenerator === 'doubao' && <DoubaoGenerator />}
        </div>
      </div>

      {/* 使用提示 */}
      <div className="max-w-4xl mx-auto bg-ghibli-sage/10 border border-ghibli-sage/20 rounded-lg p-6">
        <h3 className="text-lg font-medium text-ghibli-cream mb-3 flex items-center">
          <Wand2 className="h-5 w-5 mr-2 text-ghibli-warm" />
          使用建议
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-ghibli-sage">
          <div>
            <h4 className="font-medium text-ghibli-cream mb-2">Flux Kontext 适合：</h4>
            <ul className="space-y-1">
              <li>• 需要高精度和细节的专业图像</li>
              <li>• 批量生成多张图片</li>
              <li>• 复杂场景和人物描述</li>
              <li>• 多种艺术风格探索</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-ghibli-cream mb-2">豆包 AI 适合：</h4>
            <ul className="space-y-1">
              <li>• 吉卜力动画风格图像生成</li>
              <li>• 已有图片的风格转换</li>
              <li>• 中文描述的精准理解</li>
              <li>• 温馨治愈系画面创作</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}