"use client"

import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/Navigation"
import { KeyFeatures } from "@/components/KeyFeatures"
import { HowToSteps } from "@/components/HowToSteps"
import { FAQ } from "@/components/FAQ"
import { Footer } from "@/components/Footer"
import { OrganizationSchema, WebSiteSchema, SoftwareApplicationSchema } from "@/components/StructuredData"
import { home, common, seo } from "@/lib/content"

export function HomeContent() {
  return (
    <div className="min-h-screen bg-ghibli-olive text-ghibli-cream">
      {/* Navigation */}
      <Navigation />

      {/* 结构化数据 - Structured Data */}
      <OrganizationSchema />
      <WebSiteSchema />
      <SoftwareApplicationSchema />

      {/* JSON-LD 应用程序数据 */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Flux Kontext AI",
            "description": seo.meta.description,
            "url": "https://fluxkontext.space",
            "applicationCategory": "ImageEditingApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "description": "Professional AI image generation and editing"
            },
            "creator": {
              "@type": "Organization",
              "name": "Flux Kontext AI"
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-ghibli-olive via-ghibli-olive/95 to-ghibli-forest">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="hero-gradient absolute inset-0 pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-block px-4 py-2 bg-ghibli-cream/10 border border-ghibli-cream/20 rounded-full text-ghibli-cream text-sm mb-6">
              {home.hero.badge}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-ghibli-cream">
              {home.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-ghibli-cream/80 mb-8 max-w-3xl mx-auto px-4 md:px-0 leading-relaxed">
              {home.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/generate">
                <Button 
                  variant="ghibli"
                  size="lg" 
                  className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" fill="currentColor"/>
                  </svg>
                  {common.buttons.startCreating}
                </Button>
              </Link>
              <Link href="/pricing">
                <Button 
                  variant="ghibliOutline" 
                  size="lg" 
                  className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
                >
                  {common.buttons.viewPricing}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Showcase Section */}
      <section className="py-16 px-4 bg-ghibli-forest/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ghibli-cream mb-4">
              ✨ Created with Mori Studio
            </h2>
            <p className="text-lg text-ghibli-cream/80 max-w-2xl mx-auto">
              Discover the magical transformations our AI can create. From enchanting Ghibli-style artwork to stunning image enhancements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-ghibli-cream/10 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="aspect-square relative">
                <img 
                  src="/images/Generate_a_Ghibli_style_little_1750415316822.png" 
                  alt="Enchanting Ghibli-style little character creation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-ghibli-cream mb-2">
                  Magical Character Creation
                </h3>
                <p className="text-sm text-ghibli-cream/70">
                  Transform simple prompts into enchanting Ghibli-style characters with incredible detail and authentic Studio Ghibli aesthetics.
                </p>
              </div>
            </div>
            
            <div className="bg-ghibli-cream/10 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="aspect-square relative">
                <img 
                  src="/images/enhance_this_image_with_Studio_1750416007932.png" 
                  alt="Professional Studio Ghibli image enhancement"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-ghibli-cream mb-2">
                  Studio Enhancement Magic
                </h3>
                <p className="text-sm text-ghibli-cream/70">
                  Elevate your existing images with our professional Studio enhancement, adding depth, atmosphere, and cinematic quality.
                </p>
              </div>
            </div>
            
            <div className="bg-ghibli-cream/10 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="aspect-square relative">
                <img 
                  src="/images/WX20250620-182949@2x.png" 
                  alt="Advanced AI transformation showcase"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-ghibli-cream mb-2">
                  Creative Transformation
                </h3>
                <p className="text-sm text-ghibli-cream/70">
                  Experience the power of advanced AI transformation, turning ordinary concepts into extraordinary visual masterpieces.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/generate">
              <Button 
                variant="ghibli"
                size="lg" 
                className="px-8 py-4 text-lg"
              >
                🎨 Create Your Own Magic
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <KeyFeatures />

      {/* How-to Steps Section */}
      <HowToSteps />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />

    </div>
  )
} 