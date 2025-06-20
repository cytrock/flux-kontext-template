import type { Metadata } from 'next'
import { HomeContent } from '@/components/HomeContent'
import { generateMultilingualMetadata } from '@/lib/seo/metadata-generator'

export const metadata: Metadata = generateMultilingualMetadata({
  title: 'Mori Studio AI - Transform Images to Magical Ghibli Style Platform',
  description: 'Transform any photo into enchanting Studio Ghibli-style artwork with Mori Studio AI. Create magical Ghibli scenes from text or convert existing images to authentic Studio Ghibli art style.',
  keywords: [
    'mori studio ai', 
    'ghibli style transformation', 
    'studio ghibli art generator',
    'ghibli style converter',
    'miyazaki art style',
    'ghibli character creator',
    'totoro style art',
    'spirited away style',
    'ghibli image transformation',
    'anime style generator',
    'studio ghibli ai',
    'magical art creator',
    'ghibli style platform',
    'enchanted art generation',
    'mystical image transformation'
  ],
  path: '/',
  images: ['/og-home.png'],
})

export default function Home() {
  return <HomeContent />
}
