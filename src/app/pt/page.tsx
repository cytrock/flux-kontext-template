import type { Metadata } from 'next'
import { HomeContentSimple } from '@/components/HomeContentSimple'

export const metadata: Metadata = {
  title: 'Mori Studio AI - Plataforma de Transformação IA Estilo Ghibli | Transforme Imagens em Arte Mágica Ghibli',
  description: 'Use o Mori Studio AI para transformar qualquer foto em obras de arte cativantes no estilo Ghibli. Crie novas cenas Ghibli a partir de descrições de texto ou transforme imagens existentes no autêntico estilo artístico Ghibli.',
  keywords: 'ghibli estilo ai, miyazaki estilo arte, anime transformação estilo, ghibli gerador imagens, mori studio, totoro estilo, spirited away estilo',
  openGraph: {
    title: 'Mori Studio AI - Plataforma de Transformação IA Estilo Ghibli',
    description: 'Use o Mori Studio AI para transformar qualquer foto em obras de arte cativantes no estilo Ghibli.',
    url: 'https://moristudio.space/pt',
    siteName: 'Mori Studio',
    locale: 'pt_PT',
    type: 'website',
  },
  alternates: {
    canonical: 'https://moristudio.space/pt',
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

const ptDictionary = {
  hero: {
    badge: "Plataforma Profissional IA Estilo Ghibli",
    title: "Transforme Qualquer Imagem em Estilo Mágico Ghibli",
    subtitle: "Mori Studio AI",
    description: "Traga a magia do Studio Ghibli às suas imagens com o Mori Studio AI. Transforme fotos existentes em obras de arte cativantes no estilo Ghibli ou crie novas cenas mágicas a partir de descrições de texto.",
    cta: {
      primary: "Começar a Criar Magia",
      secondary: "Ver Preços"
    }
  },
  features: {
    title: "Principais Recursos da Plataforma Mori Studio AI",
    subtitle: "Nosso Mori Studio AI combina tecnologia de ponta com a magia artística do Studio Ghibli para entregar transformação e geração de imagens profissionais em uma plataforma perfeita.",
    items: [
      {
        title: "Transformação Estilo Ghibli",
        description: "Transforme qualquer foto em belas obras de arte no estilo Ghibli com designs de personagens autênticos e atmosfera mágica."
      },
      {
        title: "Geração Texto-para-Ghibli",
        description: "Crie novas imagens no estilo Ghibli a partir de descrições de texto com estética autêntica do Studio Ghibli e elementos narrativos."
      },
      {
        title: "Consistência de Personagens",
        description: "Mantenha designs de personagens consistentes ao longo de múltiplas imagens para narrativas coerentes no estilo Ghibli."
      }
    ]
  },
  faq: {
    title: "Perguntas Frequentes",
    subtitle: "Encontre respostas para perguntas comuns sobre nossa plataforma Mori Studio AI e seus recursos mágicos de transformação de imagens no estilo Ghibli.",
    items: [
      {
        question: "O que é Mori Studio AI?",
        answer: "Mori Studio AI é uma plataforma profissional de transformação de imagens que usa inteligência artificial avançada para transformar qualquer foto em obras de arte autênticas no estilo Studio Ghibli ou criar novas imagens no estilo Ghibli a partir de descrições de texto."
      },
      {
        question: "Como funciona a transformação estilo Ghibli?",
        answer: "Nossa IA analisa sua imagem de entrada e aplica os elementos artísticos icônicos do Studio Ghibli: texturas suaves, iluminação mágica, princípios de design de personagens e efeitos atmosféricos naturais para criar obras de arte autênticas no estilo Ghibli."
      }
    ]
  },
  cta: {
    title: "Pronto para Criar Magia Ghibli?",
    subtitle: "Junte-se a milhares de fãs de Ghibli que usam Mori Studio AI para dar vida às suas ideias criativas.",
    button: "Começar Agora"
  },
  footer: {
    brand: {
      name: "Mori Studio",
      description: "Plataforma profissional de transformação IA estilo Ghibli. Transforme fotos em obras de arte mágicas Ghibli, crie novas cenas cativantes e traga a magia do Studio Ghibli aos seus projetos criativos.",
      copyright: "© 2025 Mori Studio. Todos os direitos reservados."
    },
    contact: {
      title: "Contato",
      email: "support@moristudio.space"
    },
    legal: {
      title: "Legal",
      terms: "Termos de Serviço",
      privacy: "Política de Privacidade",
      refund: "Política de Reembolso"
    },
    languages: {
      title: "Idiomas"
    },
    social: {
      builtWith: "Construído com ❤️ para fãs de Ghibli em todo o mundo",
      followUs: "Siga-nos em"
    }
  }
}

export default function PortuguesePage() {
  return <HomeContentSimple dictionary={ptDictionary} />
} 