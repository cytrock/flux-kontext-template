import type { Metadata } from 'next'
import { HomeContentSimple } from '@/components/HomeContentSimple'

// 德语页面SEO元数据
export const metadata: Metadata = {
  title: 'Mori Studio AI - Ghibli-Stil KI-Transformationsplattform | Verwandle Bilder in magische Ghibli-Kunst',
  description: 'Verwende Mori Studio AI, um jedes Foto in bezaubernde Ghibli-Stil-Kunstwerke zu verwandeln. Erstelle neue Ghibli-Szenen aus Textbeschreibungen oder konvertiere bestehende Bilder in authentischen Ghibli-Kunststil.',
  keywords: 'Ghibli-Stil KI, Miyazaki-Kunststil, Anime-Stil-Transformation, Ghibli-Bildgenerator, Mori Studio, Totoro-Stil, Chihiros Reise-Stil',
  openGraph: {
    title: 'Mori Studio AI - Ghibli-Stil KI-Transformationsplattform',
    description: 'Verwende Mori Studio AI, um jedes Foto in bezaubernde Ghibli-Stil-Kunstwerke zu verwandeln.',
    url: 'https://moristudio.space/de',
    siteName: 'Mori Studio',
    locale: 'de_DE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://moristudio.space/de',
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

// 德语内容字典
const deDictionary = {
  hero: {
    badge: "Professionelle Ghibli-Stil KI-Plattform",
    title: "Verwandle jedes Bild in magischen Ghibli-Stil",
    subtitle: "Mori Studio AI",
    description: "Verwende Mori Studio AI, um die Magie von Studio Ghibli in deine Bilder zu bringen. Konvertiere bestehende Fotos in bezaubernde Ghibli-Stil-Kunstwerke oder erstelle neue magische Szenen aus Textbeschreibungen.",
    cta: {
      primary: "Beginne Magie zu erschaffen",
      secondary: "Preise ansehen"
    }
  },
  features: {
    title: "Hauptfunktionen der Mori Studio AI Plattform",
    subtitle: "Unser Mori Studio AI kombiniert modernste Technologie mit der künstlerischen Magie von Studio Ghibli, um professionelle Bildtransformation und -generierung in einer nahtlosen Plattform zu liefern.",
    items: [
      {
        title: "Ghibli-Stil-Transformation",
        description: "Verwandle jedes Foto in wunderschöne Ghibli-Stil-Kunstwerke mit authentischen Charakterdesigns und magischer Atmosphäre."
      },
      {
        title: "Text-zu-Ghibli-Generierung",
        description: "Erstelle neue Ghibli-Stil-Bilder aus Textbeschreibungen mit authentischer Studio Ghibli-Ästhetik und narrativen Elementen."
      },
      {
        title: "Charakter-Konsistenz",
        description: "Erhalte konsistente Charakterdesigns über mehrere Bilder hinweg für kohärente Ghibli-Stil-Erzählungen."
      }
    ]
  },
  faq: {
    title: "Häufig gestellte Fragen",
    subtitle: "Finde Antworten auf häufige Fragen zu unserer Mori Studio AI Plattform und ihren magischen Ghibli-Stil-Bildtransformationsfunktionen.",
    items: [
      {
        question: "Was ist Mori Studio AI?",
        answer: "Mori Studio AI ist eine spezialisierte Bildtransformationsplattform, die fortschrittliche künstliche Intelligenz nutzt, um jedes Foto in authentische Studio Ghibli-Stil-Kunstwerke zu verwandeln oder neue Ghibli-Stil-Bilder aus Textbeschreibungen zu erstellen."
      },
      {
        question: "Wie funktioniert die Ghibli-Stil-Transformation?",
        answer: "Unsere KI analysiert dein Eingabebild und wendet ikonische Studio Ghibli-Kunstelemente an: weiche Texturen, magische Beleuchtung, Charakterdesign-Prinzipien und natürliche atmosphärische Effekte, um authentische Ghibli-Stil-Kunstwerke zu erstellen."
      }
    ]
  },
  cta: {
    title: "Bereit, Ghibli-Magie zu erschaffen?",
    subtitle: "Schließe dich Tausenden von Ghibli-Fans an, die Mori Studio AI nutzen, um ihre kreativen Ideen zum Leben zu erwecken.",
    button: "Jetzt loslegen"
  },
  footer: {
    brand: {
      name: "Mori Studio",
      description: "Professionelle Ghibli-Stil KI-Transformationsplattform. Verwandle Fotos in magische Ghibli-Kunstwerke, erstelle neue bezaubernde Szenen und bringe die Magie von Studio Ghibli in deine kreativen Projekte.",
      copyright: "© 2025 Mori Studio. Alle Rechte vorbehalten."
    },
    contact: {
      title: "Kontakt",
      email: "support@moristudio.space"
    },
    legal: {
      title: "Rechtliches",
      terms: "Nutzungsbedingungen",
      privacy: "Datenschutzrichtlinie",
      refund: "Rückerstattungsrichtlinie"
    },
    languages: {
      title: "Sprachen"
    },
    social: {
      builtWith: "Mit ❤️ für Ghibli-Fans weltweit entwickelt",
      followUs: "Folge uns auf"
    }
  }
}

export default function DeutschPage() {
  return <HomeContentSimple dictionary={deDictionary} />
} 