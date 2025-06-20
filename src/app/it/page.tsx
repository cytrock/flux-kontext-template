import type { Metadata } from 'next'
import { HomeContentSimple } from '@/components/HomeContentSimple'

export const metadata: Metadata = {
  title: 'Mori Studio AI - Piattaforma di Trasformazione Stile Ghibli | Trasforma Immagini in Arte Magica Ghibli',
  description: 'Usa Mori Studio AI per trasformare qualsiasi foto in incantevoli opere d\'arte in stile Ghibli. Crea nuove scene Ghibli da descrizioni testuali o converti immagini esistenti in autentico stile artistico Ghibli.',
  keywords: 'IA stile Ghibli, stile artistico Miyazaki, trasformazione stile anime, generatore immagini Ghibli, Mori Studio, stile Totoro, stile La Città Incantata',
  openGraph: {
    title: 'Mori Studio AI - Piattaforma di Trasformazione Stile Ghibli',
    description: 'Usa Mori Studio AI per trasformare qualsiasi foto in incantevoli opere d\'arte in stile Ghibli.',
    url: 'https://moristudio.space/it',
    siteName: 'Mori Studio',
    locale: 'it_IT',
    type: 'website',
  },
  alternates: {
    canonical: 'https://moristudio.space/it',
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

const itDictionary = {
  hero: {
    badge: "Piattaforma Professionale IA Stile Ghibli",
    title: "Trasforma Qualsiasi Immagine in Magico Stile Ghibli",
    subtitle: "Mori Studio AI",
    description: "Usa Mori Studio AI per portare la magia di Studio Ghibli alle tue immagini. Converti foto esistenti in incantevoli opere d'arte in stile Ghibli o crea nuove scene magiche da descrizioni testuali.",
    cta: {
      primary: "Inizia a Creare Magia",
      secondary: "Vedi Prezzi"
    }
  },
  features: {
    title: "Caratteristiche Principali della Piattaforma Mori Studio AI",
    subtitle: "Il nostro Mori Studio AI combina tecnologia all'avanguardia con la magia artistica di Studio Ghibli per offrire trasformazione e generazione di immagini professionali in una piattaforma senza soluzione di continuità.",
    items: [
      {
        title: "Trasformazione Stile Ghibli",
        description: "Trasforma qualsiasi foto in bellissime opere d'arte in stile Ghibli con design di personaggi autentici e atmosfera magica."
      },
      {
        title: "Generazione Testo a Ghibli",
        description: "Crea nuove immagini in stile Ghibli da descrizioni testuali con estetica autentica di Studio Ghibli ed elementi narrativi."
      },
      {
        title: "Coerenza dei Personaggi",
        description: "Mantieni design di personaggi coerenti attraverso più immagini per narrative in stile Ghibli coerenti."
      }
    ]
  },
  faq: {
    title: "Domande Frequenti",
    subtitle: "Trova risposte alle domande comuni sulla nostra piattaforma Mori Studio AI e le sue caratteristiche magiche di trasformazione di immagini in stile Ghibli.",
    items: [
      {
        question: "Cos'è Mori Studio AI?",
        answer: "Mori Studio AI è una piattaforma specializzata di trasformazione immagini che utilizza intelligenza artificiale avanzata per convertire qualsiasi foto in autentiche opere d'arte in stile Studio Ghibli o creare nuove immagini in stile Ghibli da descrizioni testuali."
      },
      {
        question: "Come funziona la trasformazione stile Ghibli?",
        answer: "La nostra IA analizza la tua immagine di input e applica elementi artistici iconici di Studio Ghibli: texture morbide, illuminazione magica, principi di design dei personaggi ed effetti atmosferici naturali per creare autentiche opere d'arte in stile Ghibli."
      }
    ]
  },
  cta: {
    title: "Pronto a Creare Magia Ghibli?",
    subtitle: "Unisciti a migliaia di fan di Ghibli che usano Mori Studio AI per dare vita alle loro idee creative.",
    button: "Inizia Ora"
  },
  footer: {
    brand: {
      name: "Mori Studio",
      description: "Piattaforma professionale di trasformazione IA stile Ghibli. Trasforma foto in opere d'arte magiche Ghibli, crea nuove scene incantevoli e porta la magia di Studio Ghibli ai tuoi progetti creativi.",
      copyright: "© 2025 Mori Studio. Tutti i diritti riservati."
    },
    contact: {
      title: "Contatto",
      email: "support@moristudio.space"
    },
    legal: {
      title: "Legale",
      terms: "Termini di Servizio",
      privacy: "Politica sulla Privacy",
      refund: "Politica di Rimborso"
    },
    languages: {
      title: "Lingue"
    },
    social: {
      builtWith: "Costruito con ❤️ per fan di Ghibli in tutto il mondo",
      followUs: "Seguici su"
    }
  }
}

export default function ItalianoPage() {
  return <HomeContentSimple dictionary={itDictionary} />
} 