import type { Metadata } from 'next'
import { ResourcesContent } from '@/components/ResourcesContent'

export const metadata: Metadata = {
  title: 'AI Image Generation Resources - Mori Studio | Free Tools & Guides',
  description: 'Free AI image generation resources and tools by Mori Studio. Learn how to create professional images with AI. Tutorials, guides, and tips for AI art creation.',
  keywords: [
    'mori studio resources',
    'ai image generation guide', 
    'mori ai tutorials',
    'free ai image tools',
    'ai art creation guide',
    'mori studio tutorials',
    'ai image generation tips',
    'professional ai art resources'
  ],
  alternates: {
    canonical: '/resources',
  },
  openGraph: {
    title: 'AI Image Generation Resources - Mori Studio',
    description: 'Free AI image generation resources and tools by Mori Studio. Learn how to create professional images with AI.',
    url: '/resources',
    images: [
      {
        url: '/og-resources.png',
        width: 1200,
        height: 630,
        alt: 'Mori Studio AI Image Generation Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Image Generation Resources - Mori Studio',
    description: 'Free AI image generation resources and tools by Mori Studio',
    images: ['/twitter-resources.png'],
  },
}

export default function ResourcesPage() {
  return <ResourcesContent />
} 