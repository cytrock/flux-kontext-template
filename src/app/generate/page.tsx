import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EnhancedGenerator } from '@/components/EnhancedGenerator'
import { generateMultilingualMetadata } from '@/lib/seo/metadata-generator'

export const metadata: Metadata = generateMultilingualMetadata({
  title: 'AI Image Generator - Professional Studio Quality | Create Beautiful Images',
  description: 'Generate professional quality images with our advanced AI image generator. Studio-grade output with multiple styles and fine control for all your creative needs.',
  keywords: [
    'AI image generator',
    'professional images',
    'text to image',
    'image editing',
    'studio quality art',
    'image generation ai',
    'ai art creator',
    'professional ai images',
    'ai powered imaging',
    'creative AI',
    'high resolution images',
    'batch generation',
    'image transformation',
    'AI art studio'
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