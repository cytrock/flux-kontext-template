import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EnhancedGenerator } from '@/components/EnhancedGenerator'
import { generateMultilingualMetadata } from '@/lib/seo/metadata-generator'

export const metadata: Metadata = generateMultilingualMetadata({
  title: 'AI Image Generator - Flux Kontext & Doubao | Create Professional Ghibli Images',
  description: 'Generate and edit professional images with Flux Kontext and Doubao AI. Text-to-image generation, Ghibli style conversion, and multi-model image processing.',
  keywords: [
    'AI image generator',
    'Flux Kontext',
    'Doubao AI',
    'text to image',
    'image editing',
    'Ghibli style',
    'Studio Ghibli art',
    'professional images',
    'image generation ai',
    'ai art creator',
    'flux ai generator',
    'doubao image generation',
    'ai image creation',
    'professional ai images',
    'ai powered imaging',
    'style transfer',
    'ByteDance AI'
  ],
  path: '/generate',
  images: ['/og-generate.png'],
})

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-ghibli-olive text-ghibli-cream">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <EnhancedGenerator />
      </main>

      <Footer />
    </div>
  )
} 