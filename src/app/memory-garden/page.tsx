import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { MemoryGardenContent } from '@/components/MemoryGardenContent'

export const metadata: Metadata = {
  title: 'Memory Garden - Your Creative Journey',
  description: 'Explore your AI art creation history and relive every creative moment. Collect and manage your generated artworks in this poetic digital garden.',
}

export default async function MemoryGardenPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect('/auth/signin?callbackUrl=/memory-garden')
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-ghibli-sage/5 via-ghibli-cream/10 to-ghibli-sage/15 pt-16">
        <MemoryGardenContent />
      </div>
    </>
  )
}