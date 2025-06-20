import type { Metadata } from 'next'
import { HomeContentSimple } from '@/components/HomeContentSimple'

export const metadata: Metadata = {
  title: 'Mori Studio AI - Platforma Transformacji AI w Stylu Ghibli | Przekształć Obrazy w Magiczną Sztukę Ghibli',
  description: 'Użyj Mori Studio AI, aby przekształcić każde zdjęcie w urzekające dzieła sztuki w stylu Ghibli. Twórz nowe sceny Ghibli z opisów tekstowych lub przekształcaj istniejące obrazy w autentyczny styl artystyczny Ghibli.',
  keywords: 'ghibli styl ai, miyazaki styl artystyczny, anime transformacja stylu, generator obrazów ghibli, mori studio, styl totoro, styl spirited away',
  openGraph: {
    title: 'Mori Studio AI - Platforma Transformacji AI w Stylu Ghibli',
    description: 'Użyj Mori Studio AI, aby przekształcić każde zdjęcie w urzekające dzieła sztuki w stylu Ghibli.',
    url: 'https://moristudio.space/pl',
    siteName: 'Mori Studio',
    locale: 'pl_PL',
    type: 'website',
  },
  alternates: {
    canonical: 'https://moristudio.space/pl',
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

const plDictionary = {
  hero: {
    badge: "Profesjonalna Platforma AI w Stylu Ghibli",
    title: "Przekształć Każdy Obraz w Magiczny Styl Ghibli",
    subtitle: "Mori Studio AI",
    description: "Wprowadź magię Studio Ghibli do swoich obrazów z Mori Studio AI. Przekształć istniejące zdjęcia w urzekające dzieła sztuki w stylu Ghibli lub twórz nowe magiczne sceny z opisów tekstowych.",
    cta: {
      primary: "Zacznij Tworzyć Magię",
      secondary: "Zobacz Ceny"
    }
  },
  features: {
    title: "Główne Funkcje Platformy Mori Studio AI",
    subtitle: "Nasze Mori Studio AI łączy najnowocześniejszą technologię z artystyczną magią Studio Ghibli, aby dostarczyć profesjonalną transformację i generowanie obrazów w jednej płynnej platformie.",
    items: [
      {
        title: "Transformacja Stylu Ghibli",
        description: "Przekształć każde zdjęcie w piękne dzieła sztuki w stylu Ghibli z autentycznymi projektami postaci i magiczną atmosferą."
      },
      {
        title: "Generowanie Tekst-Ghibli",
        description: "Twórz nowe obrazy w stylu Ghibli z opisów tekstowych z autentyczną estetyką Studio Ghibli i elementami narracyjnymi."
      },
      {
        title: "Spójność Postaci",
        description: "Zachowaj spójne projekty postaci w wielu obrazach dla spójnych narracji w stylu Ghibli."
      }
    ]
  },
  faq: {
    title: "Często Zadawane Pytania",
    subtitle: "Znajdź odpowiedzi na często zadawane pytania dotyczące naszej platformy Mori Studio AI i jej magicznych funkcji transformacji obrazów w stylu Ghibli.",
    items: [
      {
        question: "Czym jest Mori Studio AI?",
        answer: "Mori Studio AI to profesjonalna platforma transformacji obrazów, która wykorzystuje zaawansowaną sztuczną inteligencję do przekształcania każdego zdjęcia w autentyczne dzieła sztuki w stylu Studio Ghibli lub tworzenia nowych obrazów w stylu Ghibli z opisów tekstowych."
      },
      {
        question: "Jak działa transformacja stylu Ghibli?",
        answer: "Nasza AI analizuje obraz wejściowy i stosuje ikoniczne elementy artystyczne Studio Ghibli: miękkie tekstury, magiczne oświetlenie, zasady projektowania postaci i naturalne efekty atmosferyczne, aby tworzyć autentyczne dzieła sztuki w stylu Ghibli."
      }
    ]
  },
  cta: {
    title: "Gotowy na Tworzenie Magii Ghibli?",
    subtitle: "Dołącz do tysięcy fanów Ghibli, którzy używają Mori Studio AI do ożywienia swoich kreatywnych pomysłów.",
    button: "Zacznij Teraz"
  },
  footer: {
    brand: {
      name: "Mori Studio",
      description: "Profesjonalna platforma transformacji AI w stylu Ghibli. Przekształcaj zdjęcia w magiczne dzieła sztuki Ghibli, twórz nowe urzekające sceny i wprowadzaj magię Studio Ghibli do swoich kreatywnych projektów.",
      copyright: "© 2025 Mori Studio. Wszelkie prawa zastrzeżone."
    },
    contact: {
      title: "Kontakt",
      email: "support@moristudio.space"
    },
    legal: {
      title: "Prawne",
      terms: "Warunki Usługi",
      privacy: "Polityka Prywatności",
      refund: "Polityka Zwrotów"
    },
    languages: {
      title: "Języki"
    },
    social: {
      builtWith: "Zbudowane z ❤️ dla fanów Ghibli na całym świecie",
      followUs: "Śledź nas na"
    }
  }
}

export default function PolishPage() {
  return <HomeContentSimple dictionary={plDictionary} />
} 