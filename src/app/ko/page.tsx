import type { Metadata } from 'next'
import { HomeContentSimple } from '@/components/HomeContentSimple'

export const metadata: Metadata = {
  title: 'Mori Studio AI - 지브리 스타일 AI 변환 플랫폼 | 이미지를 마법의 지브리 아트로 변환',
  description: 'Mori Studio AI를 사용하여 모든 사진을 매혹적인 지브리 스타일 아트워크로 변환하세요. 텍스트 설명에서 새로운 지브리 장면을 만들거나 기존 이미지를 정통 지브리 아트 스타일로 변환하세요.',
  keywords: '지브리 스타일 AI, 미야자키 아트 스타일, 애니메 스타일 변환, 지브리 이미지 생성기, Mori Studio, 토토로 스타일, 센과 치히로 스타일',
  openGraph: {
    title: 'Mori Studio AI - 지브리 스타일 AI 변환 플랫폼',
    description: 'Mori Studio AI를 사용하여 모든 사진을 매혹적인 지브리 스타일 아트워크로 변환하세요.',
    url: 'https://moristudio.space/ko',
    siteName: 'Mori Studio',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://moristudio.space/ko',
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

const koDictionary = {
  hero: {
    badge: "전문 지브리 스타일 AI 플랫폼",
    title: "모든 이미지를 마법의 지브리 스타일로 변환",
    subtitle: "Mori Studio AI",
    description: "Mori Studio AI를 사용하여 이미지에 스튜디오 지브리의 마법을 가져오세요. 기존 사진을 매혹적인 지브리 스타일 아트워크로 변환하거나 텍스트 설명에서 새로운 마법의 장면을 만드세요.",
    cta: {
      primary: "마법 만들기 시작",
      secondary: "가격 보기"
    }
  },
  features: {
    title: "Mori Studio AI 플랫폼의 주요 기능",
    subtitle: "우리의 Mori Studio AI는 최첨단 기술과 스튜디오 지브리의 예술적 마법을 결합하여 하나의 완벽한 플랫폼에서 전문적인 이미지 변환과 생성을 제공합니다.",
    items: [
      {
        title: "지브리 스타일 변환",
        description: "정통 캐릭터 디자인과 마법적 분위기로 모든 사진을 아름다운 지브리 스타일 아트워크로 변환하세요."
      },
      {
        title: "텍스트-지브리 생성",
        description: "정통 스튜디오 지브리 미학과 서사적 요소로 텍스트 설명에서 새로운 지브리 스타일 이미지를 만드세요."
      },
      {
        title: "캐릭터 일관성",
        description: "일관된 지브리 스타일 내러티브를 위해 여러 이미지에서 일관된 캐릭터 디자인을 유지하세요."
      }
    ]
  },
  faq: {
    title: "자주 묻는 질문",
    subtitle: "Mori Studio AI 플랫폼과 마법의 지브리 스타일 이미지 변환 기능에 대한 일반적인 질문의 답변을 찾아보세요.",
    items: [
      {
        question: "Mori Studio AI란 무엇인가요?",
        answer: "Mori Studio AI는 고급 인공지능을 사용하여 모든 사진을 정통 스튜디오 지브리 스타일 아트워크로 변환하거나 텍스트 설명에서 새로운 지브리 스타일 이미지를 만드는 전문 이미지 변환 플랫폼입니다."
      },
      {
        question: "지브리 스타일 변환은 어떻게 작동하나요?",
        answer: "우리의 AI는 입력 이미지를 분석하고 스튜디오 지브리의 상징적인 예술 요소를 적용합니다: 부드러운 텍스처, 마법적 조명, 캐릭터 디자인 원칙, 자연적 대기 효과로 정통 지브리 스타일 아트워크를 만듭니다."
      }
    ]
  },
  cta: {
    title: "지브리 마법을 만들 준비가 되셨나요?",
    subtitle: "Mori Studio AI를 사용하여 창의적 아이디어를 실현하는 수천 명의 지브리 팬들과 함께하세요.",
    button: "지금 시작하기"
  },
  footer: {
    brand: {
      name: "Mori Studio",
      description: "전문 지브리 스타일 AI 변환 플랫폼. 사진을 마법의 지브리 아트워크로 변환하고, 새로운 매혹적인 장면을 만들며, 창의적 프로젝트에 스튜디오 지브리의 마법을 가져오세요.",
      copyright: "© 2025 Mori Studio. 모든 권리 보유."
    },
    contact: {
      title: "연락처",
      email: "support@moristudio.space"
    },
    legal: {
      title: "법적 고지",
      terms: "서비스 약관",
      privacy: "개인정보 보호정책",
      refund: "환불 정책"
    },
    languages: {
      title: "언어"
    },
    social: {
      builtWith: "전 세계 지브리 팬을 위해 ❤️로 제작",
      followUs: "팔로우하기"
    }
  }
}

export default function KoreanPage() {
  return <HomeContentSimple dictionary={koDictionary} />
} 