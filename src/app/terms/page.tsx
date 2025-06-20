import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Mori Studio',
  description: 'Terms of Service for Mori Studio AI Ghibli-style transformation platform. Read our terms and conditions for using our professional Ghibli-style AI image transformation service.',
  keywords: ['terms of service', 'mori studio terms', 'ghibli ai terms', 'ghibli style transformation terms'],
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service | Mori Studio',
    description: 'Terms of Service for Mori Studio AI Ghibli-style transformation platform.',
    url: '/terms',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service | Mori Studio',
    description: 'Terms of Service for Mori Studio AI Ghibli-style transformation platform',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl md:text-2xl font-bold text-primary">
              Mori Studio
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
              <Link href="/generate" className="text-foreground hover:text-primary transition-colors">Transform</Link>
              <Link href="/pricing" className="text-foreground hover:text-primary transition-colors">Pricing</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="text-sm text-muted-foreground mb-8">
              <p>Posted on: January 20, 2025</p>
              <p>Last updated: January 20, 2025</p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                This website is operated by Mori Studio. Throughout the site, the terms "we", "us", and "our" refer to Mori Studio. 
                Mori Studio provides this website, including all information, tools, and services available from this site to you, 
                the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
              </p>
              <p className="mb-4">
                By accessing our site and/or using our Ghibli-style AI transformation service, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Use of the Service</h2>
              <p className="mb-4">
                You are permitted to use this website for transforming images to Ghibli-style artwork and generating new Ghibli-inspired images using our AI technology. The Service must not be used for any illegal or unauthorized purposes. You agree to comply with all applicable laws, rules, and regulations in connection with your use of the website and its content.
              </p>
              <p className="mb-4">
                You may not use our Ghibli-style AI transformation service to create content that is harmful, offensive, violates any third-party rights, or infringes on intellectual property. All transformations must respect the family-friendly spirit of Studio Ghibli.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Access</h2>
              <p className="mb-4">
                We reserve the right, at our sole discretion, to withdraw or modify this website and any service or material we provide on the website, without notice. We will not be liable if, for any reason, all or any part of the website is unavailable at any time or for any duration.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property Rights</h2>
              <p className="mb-4">
                All content and materials on this website are the property of Mori Studio and are protected by copyright, trademark, and other relevant laws. You may view, copy, and print materials from the website strictly in accordance with these Terms of Service.
              </p>
              <p className="mb-4">
                Images transformed using our Ghibli-style AI transformation service belong to you, the user, subject to our usage policies and applicable laws. However, the underlying AI models and transformation technology remain the property of Mori Studio.
              </p>
              <p className="mb-4">
                While our service creates Ghibli-inspired artwork, all original Studio Ghibli intellectual property remains the property of Studio Ghibli Inc. Our service provides artistic transformations inspired by the Ghibli aesthetic without claiming ownership of original Studio Ghibli characters or designs.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Disclaimer of Warranties & Limitations of Liability</h2>
              <p className="mb-4">
                This website, along with all the information, content, and materials, is provided by Mori Studio on an "as is" and "as available" basis. Mori Studio makes no representations or warranties of any kind, whether express or implied.
              </p>
              <p className="mb-4">
                Mori Studio will not be liable for any damages of any kind arising from your use of this website or our Ghibli-style AI transformation service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
              <p className="mb-4">
                These Terms will be governed by and interpreted in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Changes To Terms of Service</h2>
              <p className="mb-4">
                The most current version of the Terms of Service can always be reviewed on this page. We reserve the right, at our sole discretion, to update, change, or replace any part of these Terms of Service by posting updates and changes to our website.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-xl font-bold text-primary mb-4">Mori Studio</div>
            <p className="text-muted-foreground text-sm mb-4">
              Professional Ghibli-style AI transformation platform. Transform photos into magical Ghibli artwork and create enchanting scenes.
            </p>
            <div className="text-sm text-muted-foreground">
              © 2025 Mori Studio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 