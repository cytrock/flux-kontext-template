import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EnhancedGenerator } from '@/components/EnhancedGenerator'
import { generateMultilingualMetadata } from '@/lib/seo/metadata-generator'

export const metadata: Metadata = generateMultilingualMetadata({
  title: 'AI Style Generator - Professional & Dreamy Art Creation | Create Beautiful Images',
  description: 'Generate professional and dreamy style images with our dual AI style generator. Professional studio quality and charming animation styles for all your creative needs.',
  keywords: [
    'AI image generator',
    'professional style',
    'dreamy animation',
    'text to image',
    'image editing',
    'animation style',
    'studio quality art',
    'professional images',
    'image generation ai',
    'ai art creator',
    'style generator',
    'animation image generation',
    'ai image creation',
    'professional ai images',
    'ai powered imaging',
    'style transfer',
    'creative AI'
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