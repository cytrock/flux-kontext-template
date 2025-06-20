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
      {/* Page title and description */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-8 w-8 text-ghibli-warm animate-gentle-bounce" />
          <h1 className="text-4xl font-bold text-ghibli-cream">
            AI Style Generator Studio
          </h1>
          <Sparkles className="h-8 w-8 text-ghibli-warm animate-gentle-bounce" />
        </div>
        <p className="text-xl text-ghibli-cream/80 max-w-3xl mx-auto">
          Choose your preferred art style and create professional-quality images with our dual AI generator
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="outline" className="bg-ghibli-warm/20 text-ghibli-warm border-ghibli-warm">
            🎨 Dual Style Support
          </Badge>
          <Badge variant="outline" className="bg-ghibli-coral/20 text-ghibli-coral border-ghibli-coral">
            🌟 Animation Specialized
          </Badge>
          <Badge variant="outline" className="bg-ghibli-sky/20 text-ghibli-sky border-ghibli-sky">
            ⚡ High Quality Output
          </Badge>
        </div>
      </div>

      {/* Style selector */}
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
            <div className="font-medium">Professional Studio</div>
            <div className="text-xs opacity-75">High-precision imagery</div>
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
            <div className="font-medium">Dreamy Animation</div>
            <div className="text-xs opacity-75">Charming animated art</div>
          </div>
          {activeGenerator === 'doubao' && (
            <Crown className="h-4 w-4 text-ghibli-warm" />
          )}
        </Button>
      </div>

      {/* Style feature description */}
      <div className="max-w-4xl mx-auto">
        {activeGenerator === 'flux-kontext' && (
          <div className="bg-ghibli-forest/20 border border-ghibli-sage/30 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Zap className="h-5 w-5 text-ghibli-warm" />
              <span className="font-medium text-ghibli-cream">Professional Studio Style</span>
            </div>
            <p className="text-sm text-ghibli-cream/80">
              Advanced AI technology delivers studio-quality imagery with exceptional detail and precision.
              Perfect for professional projects requiring high-resolution output and versatile artistic styles.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <Badge variant="secondary" className="text-xs">High Resolution</Badge>
              <Badge variant="secondary" className="text-xs">Versatile Styles</Badge>
              <Badge variant="secondary" className="text-xs">Fine Control</Badge>
              <Badge variant="secondary" className="text-xs">Batch Generation</Badge>
            </div>
          </div>
        )}

        {activeGenerator === 'doubao' && (
          <div className="bg-ghibli-warm/20 border border-ghibli-warm/30 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="h-5 w-5 text-ghibli-warm" />
              <span className="font-medium text-ghibli-cream">Dreamy Animation Style</span>
            </div>
            <p className="text-sm text-ghibli-cream/80">
              Specialized in creating enchanting animated artwork with a focus on warmth and charm.
              Excels in style transfer and brings a magical, hand-drawn quality to every creation.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <Badge variant="secondary" className="text-xs">Animation Focus</Badge>
              <Badge variant="secondary" className="text-xs">Style Transfer</Badge>
              <Badge variant="secondary" className="text-xs">Multilingual</Badge>
              <Badge variant="secondary" className="text-xs">Artistic Charm</Badge>
            </div>
          </div>
        )}
      </div>

      {/* Generator content */}
      <div className="relative">
        {/* Animation transition container */}
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

      {/* Usage tips */}
      <div className="max-w-4xl mx-auto bg-ghibli-sage/10 border border-ghibli-sage/20 rounded-lg p-6">
        <h3 className="text-lg font-medium text-ghibli-cream mb-3 flex items-center">
          <Wand2 className="h-5 w-5 mr-2 text-ghibli-warm" />
          Style Recommendations
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-ghibli-cream/80">
          <div>
            <h4 className="font-medium text-ghibli-cream mb-2">Professional Studio is perfect for:</h4>
            <ul className="space-y-1">
              <li>• High-precision professional imagery</li>
              <li>• Batch generation of multiple images</li>
              <li>• Complex scenes and character details</li>
              <li>• Diverse artistic style exploration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-ghibli-cream mb-2">Dreamy Animation works best for:</h4>
            <ul className="space-y-1">
              <li>• Enchanting animated-style images</li>
              <li>• Style transfer from existing photos</li>
              <li>• Warm, charming, and cozy artwork</li>
              <li>• Hand-drawn artistic aesthetics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}