'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Download, Eye, Calendar, Clock, Palette, Sparkles, Filter, Grid, List, Star, Image as ImageIcon, Zap } from 'lucide-react'

interface Generation {
  id: string
  prompt: string
  action: string
  model: string
  generation_type: string
  studio_type: string
  input_image_count: number
  image_urls: string[]
  style_tags: string[]
  content_tags: string[]
  is_favorite: boolean
  generation_time_ms: number
  credits_used: number
  created_at: string
  settings: {
    aspect_ratio?: string
    guidance_scale?: number
    num_images?: number
  }
}

interface GenerationStats {
  total_generations: number
  total_credits_consumed: number
  favorite_count: number
  models_used: { [key: string]: number }
  actions_used: { [key: string]: number }
  studio_types_used: { [key: string]: number }
  generation_types_used: { [key: string]: number }
  style_tags_used: { [key: string]: number }
}

export function MemoryGardenContent() {
  const { data: session } = useSession()
  const [generations, setGenerations] = useState<Generation[]>([])
  const [stats, setStats] = useState<GenerationStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filterType, setFilterType] = useState('all') // all, text-to-image, image-to-image

  useEffect(() => {
    if (session?.user?.email) {
      fetchGenerations()
      fetchStats()
    }
  }, [session])

  const fetchGenerations = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/memory-garden/generations?limit=100')
      if (response.ok) {
        const data = await response.json()
        setGenerations(data.generations || [])
      }
    } catch (error) {
      console.error('Failed to fetch generations:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/memory-garden/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const toggleFavorite = async (generationId: string) => {
    try {
      const response = await fetch(`/api/memory-garden/generations/${generationId}/favorite`, {
        method: 'POST'
      })
      if (response.ok) {
        setGenerations(prev => prev.map(gen => 
          gen.id === generationId 
            ? { ...gen, is_favorite: !gen.is_favorite }
            : gen
        ))
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    }
  }

  const filteredGenerations = generations.filter(gen => {
    const matchesFilter = !filter || 
      gen.prompt.toLowerCase().includes(filter.toLowerCase()) ||
      gen.model.toLowerCase().includes(filter.toLowerCase())
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => gen.style_tags.includes(tag))
    
    const matchesType = filterType === 'all' || gen.generation_type === filterType
    
    return matchesFilter && matchesTags && matchesType
  })

  const sortedGenerations = [...filteredGenerations].sort((a, b) => {
    switch (sortBy) {
      case 'created_at':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case 'favorites':
        return (b.is_favorite ? 1 : 0) - (a.is_favorite ? 1 : 0)
      case 'credits':
        return b.credits_used - a.credits_used
      default:
        return 0
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDuration = (ms: number) => {
    const seconds = Math.round(ms / 1000)
    return `${seconds}s`
  }

  const getModelColor = (model: string) => {
    const colors = {
      'pro': 'bg-blue-100 text-blue-800 border-blue-200',
      'max': 'bg-purple-100 text-purple-800 border-purple-200',
      'schnell': 'bg-green-100 text-green-800 border-green-200',
      'anime': 'bg-pink-100 text-pink-800 border-pink-200',
      'realism': 'bg-orange-100 text-orange-800 border-orange-200'
    }
    return colors[model as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }


  const getGenerationTypeIcon = (type: string) => {
    if (type === 'image-to-image') return <ImageIcon className="w-4 h-4" />
    return <Zap className="w-4 h-4" />
  }

  const allStyleTags = Array.from(new Set(generations.flatMap(gen => gen.style_tags)))

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading your creative garden...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          🌸 Memory Garden
        </h1>
        <p className="text-lg text-white font-medium mb-1">Your Creative Journey</p>
        <p className="text-white/80">
          Relive every creative moment in this poetic digital garden
        </p>
      </div>

      {/* Statistics Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.total_generations}</div>
              <div className="text-sm text-white font-medium">Total Creations</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.total_credits_consumed}</div>
              <div className="text-sm text-white font-medium">Credits Used</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.favorite_count}</div>
              <div className="text-sm text-white font-medium">Favorites</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {Object.keys(stats.models_used || {}).length}
              </div>
              <div className="text-sm text-white font-medium">Models Used</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search prompts, models..."
            className="w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 bg-white/10"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white bg-white/10"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all" className="text-gray-800">All Types</option>
          <option value="text-to-image" className="text-gray-800">Text to Image</option>
          <option value="image-to-image" className="text-gray-800">Image to Image</option>
        </select>
        <select
          className="px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white bg-white/10"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="created_at" className="text-gray-800">By Creation Time</option>
          <option value="favorites" className="text-gray-800">By Favorites</option>
          <option value="credits" className="text-gray-800">By Credits Used</option>
        </select>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Style Tags Filter */}
      {allStyleTags.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {allStyleTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedTags(prev => 
                    prev.includes(tag) 
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  )
                }}
              >
                {tag}
              </Button>
            ))}
            {selectedTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTags([])}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Generation History Display */}
      {sortedGenerations.length === 0 ? (
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-8 text-center">
            <Sparkles className="w-12 h-12 text-white/60 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Your creative garden is empty
            </h3>
            <p className="text-white/80 mb-4">
              Start your first AI art creation and leave beautiful memories here
            </p>
            <Button onClick={() => window.location.href = '/generate'}>
              Start Creating
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {sortedGenerations.map((generation) => (
            <Card key={generation.id} className="overflow-hidden hover:shadow-lg transition-shadow border-white/20 bg-white/10">
              {viewMode === 'grid' ? (
                <>
                  {/* Grid View */}
                  <div className="aspect-square relative">
                    {generation.image_urls[0] && (
                      <Image
                        src={generation.image_urls[0]}
                        alt={generation.prompt.substring(0, 50)}
                        fill
                        className="object-cover"
                      />
                    )}
                    <button
                      onClick={() => toggleFavorite(generation.id)}
                      className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-sm"
                    >
                      <Heart 
                        className={`w-4 h-4 ${generation.is_favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                      />
                    </button>
                    <div className="absolute top-2 left-2 flex gap-1">
                      <Badge className="bg-white/90 text-gray-800 border-0">
                        {getGenerationTypeIcon(generation.generation_type)}
                        <span className="ml-1 text-xs">
                          {generation.generation_type === 'image-to-image' ? 'I2I' : 'T2I'}
                        </span>
                      </Badge>
                      {generation.input_image_count > 0 && (
                        <Badge className="bg-white/90 text-gray-800 border-0 text-xs">
                          +{generation.input_image_count}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-white font-medium mb-2 line-clamp-2">
                      {generation.prompt}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getModelColor(generation.model)}>
                        {generation.model}
                      </Badge>
                      <span className="text-xs text-white font-medium">
                        {generation.credits_used} credits
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {generation.style_tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs text-white border-white/30">
                          {tag}
                        </Badge>
                      ))}
                      {generation.style_tags.length > 3 && (
                        <span className="text-xs text-white/80">
                          +{generation.style_tags.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/80">
                      <span>{formatDate(generation.created_at)}</span>
                      <span>{formatDuration(generation.generation_time_ms)}</span>
                    </div>
                  </CardContent>
                </>
              ) : (
                <>
                  {/* List View */}
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 relative flex-shrink-0 rounded-lg overflow-hidden">
                        {generation.image_urls[0] && (
                          <Image
                            src={generation.image_urls[0]}
                            alt={generation.prompt.substring(0, 50)}
                            fill
                            className="object-cover"
                          />
                        )}
                        <div className="absolute top-1 left-1">
                          <Badge className="bg-white/90 text-gray-800 border-0 text-xs p-1">
                            {getGenerationTypeIcon(generation.generation_type)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm text-white font-medium line-clamp-2 flex-1">
                            {generation.prompt}
                          </p>
                          <button
                            onClick={() => toggleFavorite(generation.id)}
                            className="ml-2 p-1"
                          >
                            <Heart 
                              className={`w-4 h-4 ${generation.is_favorite ? 'fill-red-500 text-red-500' : 'text-white/60'}`}
                            />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getModelColor(generation.model)}>
                            {generation.model}
                          </Badge>
                          <span className="text-xs text-white font-medium">
                            {generation.credits_used} credits
                          </span>
                          <span className="text-xs text-white/80">
                            {formatDuration(generation.generation_time_ms)}
                          </span>
                          {generation.input_image_count > 0 && (
                            <Badge className="text-xs text-white border-white/30 bg-white/20">
                              +{generation.input_image_count} input
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {generation.style_tags.slice(0, 4).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs text-white border-white/30">
                                {tag}
                              </Badge>
                            ))}
                            {generation.style_tags.length > 4 && (
                              <span className="text-xs text-white/80">
                                +{generation.style_tags.length - 4}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-white/80">
                            {formatDate(generation.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}