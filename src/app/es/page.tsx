import type { Metadata } from 'next'
import { HomeContentSimple } from '@/components/HomeContentSimple'

// 西班牙语页面SEO元数据
export const metadata: Metadata = {
  title: 'Mori Studio AI - Plataforma de Transformación Estilo Ghibli | Transforma Imágenes a Arte Mágico Ghibli',
  description: 'Usa Mori Studio AI para transformar cualquier foto en encantadoras obras de arte estilo Ghibli. Crea nuevas escenas Ghibli desde descripciones de texto o convierte imágenes existentes a auténtico estilo artístico Ghibli.',
  keywords: 'IA estilo Ghibli, estilo artístico Miyazaki, transformación estilo anime, generador imágenes Ghibli, Mori Studio, estilo Totoro, estilo El Viaje de Chihiro',
  openGraph: {
    title: 'Mori Studio AI - Plataforma de Transformación Estilo Ghibli',
    description: 'Usa Mori Studio AI para transformar cualquier foto en encantadoras obras de arte estilo Ghibli.',
    url: 'https://moristudio.space/es',
    siteName: 'Mori Studio',
    locale: 'es_ES',
    type: 'website',
  },
  alternates: {
    canonical: 'https://moristudio.space/es',
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

// 西班牙语内容字典
const esDictionary = {
  hero: {
    badge: "Plataforma Profesional IA Estilo Ghibli",
    title: "Transforma Cualquier Imagen al Mágico Estilo Ghibli",
    subtitle: "Mori Studio AI",
    description: "Usa Mori Studio AI para traer la magia de Studio Ghibli a tus imágenes. Convierte fotos existentes en encantadoras obras de arte estilo Ghibli o crea nuevas escenas mágicas desde descripciones de texto.",
    cta: {
      primary: "Comenzar a Crear Magia",
      secondary: "Ver Precios"
    }
  },
  features: {
    title: "Características Principales de la Plataforma Mori Studio AI",
    subtitle: "Nuestro Mori Studio AI combina tecnología de vanguardia con la magia artística de Studio Ghibli para ofrecer transformación y generación de imágenes profesionales en una plataforma perfecta.",
    items: [
      {
        title: "Transformación Estilo Ghibli",
        description: "Transforma cualquier foto en hermosas obras de arte estilo Ghibli con diseños de personajes auténticos y atmósfera mágica."
      },
      {
        title: "Generación Texto a Ghibli",
        description: "Crea nuevas imágenes estilo Ghibli desde descripciones de texto con estética auténtica de Studio Ghibli y elementos narrativos."
      },
      {
        title: "Consistencia de Personajes",
        description: "Mantén diseños de personajes consistentes a través de múltiples imágenes para narrativas coherentes estilo Ghibli."
      }
    ]
  },
  faq: {
    title: "Preguntas Frecuentes",
    subtitle: "Encuentra respuestas a preguntas comunes sobre nuestra plataforma Mori Studio AI y sus características de transformación de imágenes mágicas estilo Ghibli.",
    items: [
      {
        question: "¿Qué es Mori Studio AI?",
        answer: "Mori Studio AI es una plataforma especializada de transformación de imágenes que usa inteligencia artificial avanzada para convertir cualquier foto en auténticas obras de arte estilo Studio Ghibli o crear nuevas imágenes estilo Ghibli desde descripciones de texto."
      },
      {
        question: "¿Cómo funciona la transformación estilo Ghibli?",
        answer: "Nuestra IA analiza tu imagen de entrada y aplica elementos artísticos icónicos de Studio Ghibli: texturas suaves, iluminación mágica, principios de diseño de personajes y efectos atmosféricos naturales para crear obras de arte auténticas estilo Ghibli."
      }
    ]
  },
  cta: {
    title: "¿Listo para Crear Magia Ghibli?",
    subtitle: "Únete a miles de fanáticos de Ghibli que usan Mori Studio AI para hacer realidad sus ideas creativas.",
    button: "Empezar Ahora"
  },
  footer: {
    brand: {
      name: "Mori Studio",
      description: "Plataforma profesional de transformación IA estilo Ghibli. Transforma fotos en obras de arte mágicas Ghibli, crea nuevas escenas encantadoras y trae la magia de Studio Ghibli a tus proyectos creativos.",
      copyright: "© 2025 Mori Studio. Todos los derechos reservados."
    },
    contact: {
      title: "Contacto",
      email: "support@moristudio.space"
    },
    legal: {
      title: "Legal",
      terms: "Términos de Servicio",
      privacy: "Política de Privacidad",
      refund: "Política de Reembolso"
    },
    languages: {
      title: "Idiomas"
    },
    social: {
      builtWith: "Construido con ❤️ para fanáticos de Ghibli de todo el mundo",
      followUs: "Síguenos en"
    }
  }
}

export default function EspanolPage() {
  return <HomeContentSimple dictionary={esDictionary} />
} 