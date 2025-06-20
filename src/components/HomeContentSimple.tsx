import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"

interface Dictionary {
  hero: {
    badge: string
    title: string
    description: string
    cta: {
      primary: string
      secondary: string
    }
  }
  features: {
    title: string
    items: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  faq: {
    title: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  footer: {
    brand: {
      name: string
      description: string
    }
    contact: {
      title: string
      email: string
    }
    legal: {
      title: string
      privacy: string
      terms: string
    }
  }
}

interface HomeContentSimpleProps {
  dictionary: Dictionary
}

export function HomeContentSimple({ dictionary }: HomeContentSimpleProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-ghibli-mint/10">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section - 吉卜力风格英雄区域 */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden hero-gradient">
        {/* 背景装饰 - 更加细腻的牛油果绿渐变层次 */}
        <div className="absolute inset-0 bg-gradient-to-br from-ghibli-mint/8 via-transparent to-ghibli-sage/6 pointer-events-none" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-ghibli-warm/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-ghibli-forest/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-ghibli-coral/12 rounded-full blur-2xl animate-gentle-bounce" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-block px-4 py-2 bg-ghibli-mint/25 border border-ghibli-sage/40 rounded-full text-ghibli-forest text-sm mb-6 backdrop-blur-sm shadow-lg">
            {dictionary.hero.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-ghibli-gradient">
            {dictionary.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-ghibli-olive mb-8 max-w-3xl mx-auto px-4 md:px-0 leading-relaxed">
            {dictionary.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/generate">
              <Button 
                variant="ghibli"
                size="xl" 
                className="px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-ghibli-forest/50 magical-glow"
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" fill="currentColor"/>
                  </svg>
                }
              >
                {dictionary.hero.cta.primary}
              </Button>
            </Link>
            <Link href="/pricing">
              <Button 
                variant="ghibliOutline" 
                size="xl" 
                className="px-8 py-4 text-lg font-semibold"
              >
                {dictionary.hero.cta.secondary}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - 特色功能区域 */}
      <section className="py-20 px-4 bg-gradient-to-r from-ghibli-mint/8 to-ghibli-sage/8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-ghibli-forest">
            {dictionary.features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dictionary.features.items.map((feature, index) => (
              <div key={`feature-${index}`} className="card-ghibli group hover:scale-105 transition-all duration-500 p-6">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 text-ghibli-warm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-ghibli-forest group-hover:text-ghibli-moss transition-colors">
                  {feature.title}
                </h3>
                <p className="text-ghibli-olive leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - 常见问题区域 */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-ghibli-forest">
            {dictionary.faq.title}
          </h2>
          <div className="space-y-6">
            {dictionary.faq.items.map((faq, index) => (
              <div key={`faq-${index}`} className="card-ghibli p-6 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-semibold text-ghibli-forest mb-3">
                  {faq.question}
                </h3>
                <p className="text-ghibli-olive leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - 行动号召区域 */}
      <section className="py-20 px-4 bg-gradient-to-r from-ghibli-sage/12 via-ghibli-mint/8 to-ghibli-warm/6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-ghibli-gradient animate-gradient-x">
            Ready to Create Magic?
          </h2>
          <p className="text-lg text-ghibli-olive mb-8 max-w-2xl mx-auto">
            Join the creative revolution and bring your imagination to life with our powerful AI tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generate">
              <Button 
                variant="ghibliPrimary"
                size="xl" 
                className="px-8 py-4 text-lg font-semibold min-w-[200px]"
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
                  </svg>
                }
              >
                Start Creating Now
              </Button>
            </Link>
            <Link href="/pricing">
              <Button 
                variant="ghibliSecondary" 
                size="xl" 
                className="px-8 py-4 text-lg font-semibold min-w-[200px]"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - 页脚区域 */}
      <footer className="py-16 px-4 border-t border-ghibli-sage/30 bg-gradient-to-t from-ghibli-mint/5 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-ghibli-forest">
                {dictionary.footer.brand.name}
              </h3>
              <p className="text-ghibli-olive leading-relaxed">
                {dictionary.footer.brand.description}
              </p>
            </div>

            {/* Contact & Legal Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-ghibli-forest mb-3">
                  {dictionary.footer.contact.title}
                </h4>
                <div className="space-y-2 text-sm text-ghibli-olive">
                  <div>{dictionary.footer.contact.email}</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-ghibli-forest mb-3">
                  {dictionary.footer.legal.title}
                </h4>
                <div className="space-y-2 text-sm text-ghibli-olive">
                  <div>{dictionary.footer.legal.privacy}</div>
                  <div>{dictionary.footer.legal.terms}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-ghibli-sage/20 text-center text-sm text-ghibli-olive">
            <p>© 2024 Mori Studio. Crafted with 🌿 for creators worldwide.</p>
          </div>
        </div>
      </footer>

      {/* 推特脚本 - 确保推特内容正常加载 */}
      <Script 
        src="https://platform.twitter.com/widgets.js" 
        strategy="lazyOnload"
      />
    </div>
  )
} 