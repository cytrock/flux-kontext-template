import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Mori Studio',
  description: 'Privacy Policy for Mori Studio AI Ghibli-style transformation platform. Learn how we protect your data when using our professional Ghibli-style AI transformation service.',
  keywords: ['privacy policy', 'mori studio privacy', 'ghibli ai privacy', 'ghibli style transformation privacy'],
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Mori Studio',
    description: 'Privacy Policy for Mori Studio AI Ghibli-style transformation platform.',
    url: '/privacy',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Mori Studio',
    description: 'Privacy Policy for Mori Studio AI Ghibli-style transformation platform',
  },
}

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="text-sm text-muted-foreground mb-8">
              <p>Posted on: January 20, 2025</p>
              <p>Last updated: January 20, 2025</p>
            </div>

            <p className="mb-8">
              At Mori Studio, we are committed to protecting the privacy and security of our users. Understanding the importance of privacy, we strive to ensure that our data collection, usage, and sharing practices respect your privacy rights when using our Ghibli-style AI transformation platform.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
              <p className="mb-4">
                We collect data to enhance your experience and improve our Ghibli-style AI transformation service, utilizing basic, anonymous analytics to understand user behavior without gathering any personally identifiable information (PII). The data we collect encompasses:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">
                  <strong>Usage data</strong>, which includes information on how you interact with the website, such as page visits, Ghibli-style transformation requests, and interaction metrics.
                </li>
                <li className="mb-2">
                  <strong>Anonymous device information</strong> to help us optimize our Ghibli-style AI transformation platform for all users, noting the type of device and browser used to access our website.
                </li>
                <li className="mb-2">
                  <strong>Cookies</strong> to improve the user experience, facilitating features like remembering login details and preferences for our Ghibli-style image transformation service.
                </li>
              </ul>
              <p className="mb-4">
                You have the flexibility to manage or disable cookies through your browser settings, ensuring control over your personal data and how it's used to enhance your browsing experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Use of Data</h2>
              <p className="mb-4">
                The primary purpose behind our data collection efforts is to enhance our Ghibli-style AI transformation website and customize it to better serve our users' needs. By analyzing the data, we aim to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Improve website functionality and user experience for our Ghibli-style AI transformation platform</li>
                <li className="mb-2">Gain insights into user engagement and interaction patterns with our Ghibli-style transformation tools</li>
                <li className="mb-2">Make informed decisions about introducing new features and services for Ghibli-style image creation</li>
              </ul>
              <p className="mb-4">
                It's important to note that we do not use this data for commercial purposes, nor do we sell any information collected from our Ghibli-style transformation users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Sharing</h2>
              <p className="mb-4">
                We are committed to not sharing any data collected from our Ghibli-style transformation users with third parties, except as required by law. Any data sharing will only occur under strict conditions and with your explicit consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="mb-4">
                Your privacy is our top priority, and we are committed to ensuring you have full control over your personal data when using our Ghibli-style AI transformation service. As part of this commitment, you are entitled to various rights including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">The right to access any personal data we hold about you</li>
                <li className="mb-2">The right to rectify any inaccuracies in your personal data</li>
                <li className="mb-2">The right to request the erasure of your personal data from our records</li>
                <li className="mb-2">The right to opt out of data analytics and cookies to prevent data collection during your visits to our Ghibli-style transformation platform</li>
              </ul>
              <p className="mb-4">
                If you wish to exercise any of these rights, please reach out to our website administrator using the contact information available on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We reserve the right to update our Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically for any updates.
              </p>
            </section>

            <section className="mb-8">
              <p className="mb-4">
                By using our Ghibli-style AI transformation website, you acknowledge that you have read and understand this Privacy Policy. For any questions or concerns regarding this policy or your personal data, please contact us directly at support@moristudio.space.
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