import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy | Mori Studio',
  description: 'Refund Policy for Mori Studio AI Ghibli-style transformation platform. Learn about our refund conditions and process for our professional Ghibli-style AI transformation service.',
  keywords: ['refund policy', 'mori studio refund', 'ghibli ai refund', 'ghibli style transformation refund'],
  alternates: {
    canonical: '/refund',
  },
  openGraph: {
    title: 'Refund Policy | Mori Studio',
    description: 'Refund Policy for Mori Studio AI Ghibli-style transformation platform.',
    url: '/refund',
  },
  twitter: {
    card: 'summary',
    title: 'Refund Policy | Mori Studio',
    description: 'Refund Policy for Mori Studio AI Ghibli-style transformation platform',
  },
}

export default function RefundPage() {
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
            <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
            
            <div className="text-sm text-muted-foreground mb-8">
              <p>Posted on: January 20, 2025</p>
              <p>Last updated: January 20, 2025</p>
            </div>

            <p className="mb-8">
              At Mori Studio, we strive to provide exceptional Ghibli-style AI transformation services to all our users. We understand that circumstances may arise where a refund is necessary. This refund policy outlines the conditions under which refunds may be issued for our Ghibli-style image transformation services.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">General Refund Conditions</h2>
              <p className="mb-4">
                Refunds may be issued under the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">
                  <strong>Technical Issues:</strong> If our Ghibli-style AI transformation platform experiences prolonged technical issues that prevent you from using the service.
                </li>
                <li className="mb-2">
                  <strong>Service Unavailability:</strong> If our Ghibli-style transformation service becomes unavailable for an extended period due to circumstances within our control.
                </li>
                <li className="mb-2">
                  <strong>Billing Errors:</strong> If you have been charged incorrectly for our Ghibli-style AI transformation services.
                </li>
                <li className="mb-2">
                  <strong>Unsatisfactory Service:</strong> If you are genuinely unsatisfied with the quality of our Ghibli-style transformations within the first 7 days of purchase.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Subscription Refunds</h2>
              <p className="mb-4">
                For monthly or annual subscriptions to our Ghibli-style AI transformation platform:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Refunds are prorated based on the unused portion of your subscription period.</li>
                <li className="mb-2">Subscription refunds must be requested within 7 days of the billing date.</li>
                <li className="mb-2">Once a refund is processed, your access to premium Ghibli-style transformation features will be immediately revoked.</li>
                <li className="mb-2">Refunds for annual subscriptions are available within the first 30 days of purchase.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Credit Purchase Refunds</h2>
              <p className="mb-4">
                For credit purchases used for individual Ghibli-style transformations:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Unused credits may be refunded within 30 days of purchase.</li>
                <li className="mb-2">Partially used credit packages may be refunded for the unused portion only.</li>
                <li className="mb-2">Credits that have been fully consumed cannot be refunded unless there were technical issues with the Ghibli-style transformations.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Non-Refundable Circumstances</h2>
              <p className="mb-4">
                Refunds will not be issued in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">You have violated our terms of service while using the Ghibli-style transformation platform.</li>
                <li className="mb-2">You have used the majority of your credits or subscription benefits for Ghibli-style transformations.</li>
                <li className="mb-2">You request a refund after the specified refund period has expired.</li>
                <li className="mb-2">You are unsatisfied with results that meet our stated quality standards for Ghibli-style transformations.</li>
                <li className="mb-2">Technical issues on your end prevent you from using our Ghibli-style AI transformation service.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Refund Process</h2>
              <p className="mb-4">
                To request a refund for our Ghibli-style AI transformation services:
              </p>
              <ol className="list-decimal pl-6 mb-4">
                <li className="mb-2">Contact our support team at support@moristudio.space with your refund request.</li>
                <li className="mb-2">Provide your account information and the reason for the refund request.</li>
                <li className="mb-2">Include any relevant documentation or screenshots related to your Ghibli-style transformation experience.</li>
                <li className="mb-2">Our team will review your request within 3-5 business days.</li>
                <li className="mb-2">If approved, refunds will be processed within 7-10 business days to your original payment method.</li>
              </ol>
              <p className="mb-4">
                Please note that processing times may vary depending on your payment provider and bank.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="mb-4">
                If you have any questions about our refund policy or need to request a refund for our Ghibli-style AI transformation services, please contact us:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Email: support@moristudio.space</li>
                <li className="mb-2">Response time: Within 24 hours during business days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Policy Updates</h2>
              <p className="mb-4">
                We reserve the right to update this refund policy at any time. Any changes will be posted on this page with an updated revision date. Continued use of our Ghibli-style AI transformation service after any changes constitutes acceptance of the new policy.
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