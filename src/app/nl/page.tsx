import type { Metadata } from 'next'
import { HomeContentSimple } from '@/components/HomeContentSimple'

export const metadata: Metadata = {
  title: 'Mori Studio AI - Ghibli Stijl AI Transformatie Platform | Transformeer Afbeeldingen naar Magische Ghibli Kunst',
  description: 'Gebruik Mori Studio AI om elke foto te transformeren naar betoverende Ghibli-stijl kunstwerken. Creëer nieuwe Ghibli scènes uit tekstbeschrijvingen of transformeer bestaande afbeeldingen naar authentieke Ghibli kunststijl.',
  keywords: 'ghibli stijl ai, miyazaki kunst stijl, anime stijl transformatie, ghibli afbeelding generator, mori studio, totoro stijl, spirited away stijl',
  openGraph: {
    title: 'Mori Studio AI - Ghibli Stijl AI Transformatie Platform',
    description: 'Gebruik Mori Studio AI om elke foto te transformeren naar betoverende Ghibli-stijl kunstwerken.',
    url: 'https://moristudio.space/nl',
    siteName: 'Mori Studio',
    locale: 'nl_NL',
    type: 'website',
  },
  alternates: {
    canonical: 'https://moristudio.space/nl',
    languages: {
      'en': 'https://moristudio.space',
      'de': 'https://moristudio.space/de',
      'es': 'https://moristudio.space/es',
      'fr': 'https://moristudio.space/fr',
      'it': 'https://moristudio.space/it',
      'ja': 'https://moristudio.space/ja',
      'ko': 'https://moristudio.space/ko',
      'nl': 'https://moristudio.space/nl',
      'pl': 'https://moristudio.space/pl',
      'pt': 'https://moristudio.space/pt',
      'ru': 'https://moristudio.space/ru',
      'tr': 'https://moristudio.space/tr',
      'ar': 'https://moristudio.space/ar',
      'hi': 'https://moristudio.space/hi',
      'bn': 'https://moristudio.space/bn',
      'zh': 'https://moristudio.space/zh'
    }
  }
}

const nlDictionary = {
  hero: {
    badge: "Professioneel Ghibli Stijl AI Platform",
    title: "Transformeer Elke Afbeelding naar Magische Ghibli Stijl",
    subtitle: "Mori Studio AI",
    description: "Breng de magie van Studio Ghibli naar uw afbeeldingen met Mori Studio AI. Transformeer bestaande foto's naar betoverende Ghibli-stijl kunstwerken of creëer nieuwe magische scènes uit tekstbeschrijvingen.",
    cta: {
      primary: "Begin Magie Maken",
      secondary: "Bekijk Prijzen"
    }
  },
  features: {
    title: "Hoofdkenmerken van het Mori Studio AI Platform",
    subtitle: "Onze Mori Studio AI combineert geavanceerde technologie met de artistieke magie van Studio Ghibli om professionele afbeeldingstransformatie en -generatie te leveren in één naadloos platform.",
    items: [
      {
        title: "Ghibli Stijl Transformatie",
        description: "Transformeer elke foto naar prachtige Ghibli-stijl kunstwerken met authentieke karakterontwerpen en magische atmosfeer."
      },
      {
        title: "Tekst-naar-Ghibli Generatie",
        description: "Creëer nieuwe Ghibli-stijl afbeeldingen uit tekstbeschrijvingen met authentieke Studio Ghibli esthetiek en verhalende elementen."
      },
      {
        title: "Karakter Consistentie",
        description: "Behoud consistente karakterontwerpen over meerdere afbeeldingen voor samenhangende Ghibli-stijl verhalen."
      }
    ]
  },
  faq: {
    title: "Veelgestelde Vragen",
    subtitle: "Vind antwoorden op veelgestelde vragen over ons Mori Studio AI platform en zijn magische Ghibli-stijl afbeeldingstransformatie functies.",
    items: [
      {
        question: "Wat is Mori Studio AI?",
        answer: "Mori Studio AI is een professioneel afbeeldingstransformatie platform dat geavanceerde kunstmatige intelligentie gebruikt om elke foto te transformeren naar authentieke Studio Ghibli-stijl kunstwerken of nieuwe Ghibli-stijl afbeeldingen te creëren uit tekstbeschrijvingen."
      },
      {
        question: "Hoe werkt Ghibli stijl transformatie?",
        answer: "Onze AI analyseert uw invoer afbeelding en past de iconische kunstelementen van Studio Ghibli toe: zachte texturen, magische belichting, karakterontwerp principes en natuurlijke atmosferische effecten om authentieke Ghibli-stijl kunstwerken te creëren."
      }
    ]
  },
  cta: {
    title: "Klaar om Ghibli Magie te Maken?",
    subtitle: "Sluit je aan bij duizenden Ghibli fans die Mori Studio AI gebruiken om hun creatieve ideeën tot leven te brengen.",
    button: "Begin Nu"
  },
  footer: {
    brand: {
      name: "Mori Studio",
      description: "Professioneel Ghibli stijl AI transformatie platform. Transformeer foto's naar magische Ghibli kunstwerken, creëer nieuwe betoverende scènes en breng de magie van Studio Ghibli naar uw creatieve projecten.",
      copyright: "© 2025 Mori Studio. Alle rechten voorbehouden."
    },
    contact: {
      title: "Contact",
      email: "support@moristudio.space"
    },
    legal: {
      title: "Juridisch",
      terms: "Servicevoorwaarden",
      privacy: "Privacybeleid",
      refund: "Terugbetalingsbeleid"
    },
    languages: {
      title: "Talen"
    },
    social: {
      builtWith: "Gebouwd met ❤️ voor Ghibli fans wereldwijd",
      followUs: "Volg ons op"
    }
  }
}

export default function NederlandsPage() {
  return <HomeContentSimple dictionary={nlDictionary} />
} 