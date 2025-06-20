"use client"

import { FluxKontextGenerator } from "@/components/FluxKontextGenerator"
import { Badge } from "@/components/ui/badge"
import { Wand2, Sparkles, Zap } from "lucide-react"

export function EnhancedGenerator() {
  return (
    <div className="space-y-8">
      {/* Page title and description */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-8 w-8 text-ghibli-warm animate-gentle-bounce" />
          <h1 className="text-4xl font-bold text-ghibli-cream">
            AI Image Generator Studio
          </h1>
          <Sparkles className="h-8 w-8 text-ghibli-warm animate-gentle-bounce" />
        </div>
        <p className="text-xl text-ghibli-cream/80 max-w-3xl mx-auto">
          Create professional-quality images with our advanced AI generator
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="outline" className="bg-ghibli-warm/20 text-ghibli-warm border-ghibli-warm">
            🎨 Professional Quality
          </Badge>
          <Badge variant="outline" className="bg-ghibli-coral/20 text-ghibli-coral border-ghibli-coral">
            🌟 Multiple Styles
          </Badge>
          <Badge variant="outline" className="bg-ghibli-sky/20 text-ghibli-sky border-ghibli-sky">
            ⚡ High Resolution
          </Badge>
        </div>
      </div>

      {/* Professional Studio description */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-ghibli-forest/20 border border-ghibli-sage/30 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Zap className="h-5 w-5 text-ghibli-warm" />
            <span className="font-medium text-ghibli-cream">Professional Studio</span>
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
      </div>

      {/* Generator content */}
      <div className="relative">
        <FluxKontextGenerator />
      </div>

      {/* Usage tips */}
      <div className="max-w-4xl mx-auto bg-ghibli-sage/10 border border-ghibli-sage/20 rounded-lg p-6">
        <h3 className="text-lg font-medium text-ghibli-cream mb-3 flex items-center">
          <Wand2 className="h-5 w-5 mr-2 text-ghibli-warm" />
          Professional Studio Features
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-ghibli-cream/80">
          <div>
            <h4 className="font-medium text-ghibli-cream mb-2">Perfect for:</h4>
            <ul className="space-y-1">
              <li>• High-precision professional imagery</li>
              <li>• Batch generation of multiple images</li>
              <li>• Complex scenes and character details</li>
              <li>• Diverse artistic style exploration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-ghibli-cream mb-2">Advanced capabilities:</h4>
            <ul className="space-y-1">
              <li>• Text-to-image generation</li>
              <li>• Image-to-image transformation</li>
              <li>• Multiple model options (Pro, Max, etc.)</li>
              <li>• Fine-tuned parameter control</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}