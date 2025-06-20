import type { Metadata } from 'next'
import { HomeContentSimple } from '@/components/HomeContentSimple'

export const metadata: Metadata = {
  title: 'Mori Studio AI - ジブリスタイルAI変換プラットフォーム | 画像を魔法のジブリアートに変換',
  description: 'Mori Studio AIを使用して、あらゆる写真を魅力的なジブリスタイルのアートワークに変換します。テキスト説明から新しいジブリシーンを作成するか、既存の画像を本格的なジブリアートスタイルに変換します。',
  keywords: 'ジブリスタイルAI, 宮崎駿アートスタイル, アニメスタイル変換, ジブリ画像生成器, Mori Studio, トトロスタイル, 千と千尋スタイル',
  openGraph: {
    title: 'Mori Studio AI - ジブリスタイルAI変換プラットフォーム',
    description: 'Mori Studio AIを使用して、あらゆる写真を魅力的なジブリスタイルのアートワークに変換します。',
    url: 'https://moristudio.space/ja',
    siteName: 'Mori Studio',
    locale: 'ja_JP',
    type: 'website',
  },
  alternates: {
    canonical: 'https://moristudio.space/ja',
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

const jaDictionary = {
  hero: {
    badge: "プロフェッショナルジブリスタイルAIプラットフォーム",
    title: "あらゆる画像を魔法のジブリスタイルに変換",
    subtitle: "Mori Studio AI",
    description: "Mori Studio AIを使用して、画像にスタジオジブリの魔法を与えます。既存の写真を魅力的なジブリスタイルのアートワークに変換するか、テキスト説明から新しい魔法のシーンを作成します。",
    cta: {
      primary: "魔法の創造を始める",
      secondary: "価格を見る"
    }
  },
  features: {
    title: "Mori Studio AIプラットフォームの主要機能",
    subtitle: "私たちのMori Studio AIは最先端技術とスタジオジブリの芸術的魔法を組み合わせ、シームレスなプラットフォームでプロフェッショナルな画像変換と生成を提供します。",
    items: [
      {
        title: "ジブリスタイル変換",
        description: "あらゆる写真を美しいジブリスタイルのアートワークに変換し、本格的なキャラクターデザインと魔法の雰囲気を実現します。"
      },
      {
        title: "テキストからジブリ生成",
        description: "テキスト説明から新しいジブリスタイルの画像を作成し、本格的なスタジオジブリの美学と物語要素を持つ作品を生成します。"
      },
      {
        title: "キャラクター一貫性",
        description: "複数の画像間で一貫したキャラクターデザインを維持し、一貫したジブリスタイルの物語を作成します。"
      }
    ]
  },
  faq: {
    title: "よくある質問",
    subtitle: "Mori Studio AIプラットフォームとその魔法のジブリスタイル画像変換機能に関するよくある質問の回答を見つけてください。",
    items: [
      {
        question: "Mori Studio AIとは何ですか？",
        answer: "Mori Studio AIは、高度な人工知能を使用してあらゆる写真を本格的なスタジオジブリスタイルのアートワークに変換する、または テキスト説明から新しいジブリスタイルの画像を作成する専門の画像変換プラットフォームです。"
      },
      {
        question: "ジブリスタイル変換はどのように機能しますか？",
        answer: "私たちのAIは入力画像を分析し、スタジオジブリの象徴的な芸術要素を適用します：柔らかいテクスチャ、魔法の照明、キャラクターデザインの原則、自然の大気効果により、本格的なジブリスタイルのアートワークを作成します。"
      }
    ]
  },
  cta: {
    title: "ジブリの魔法を創造する準備はできましたか？",
    subtitle: "Mori Studio AIを使ってクリエイティブを実現している何千ものジブリファンに参加しましょう。",
    button: "今すぐ始める"
  },
  footer: {
    brand: {
      name: "Mori Studio",
      description: "プロフェッショナルジブリスタイルAI変換プラットフォーム。写真を魔法のジブリアートワークに変換し、新しい魅力的なシーンを作成し、クリエイティブプロジェクトにスタジオジブリの魔法をもたらします。",
      copyright: "© 2025 Mori Studio. 全著作権所有。"
    },
    contact: {
      title: "お問い合わせ",
      email: "support@moristudio.space"
    },
    legal: {
      title: "法的事項",
      terms: "利用規約",
      privacy: "プライバシーポリシー",
      refund: "返金ポリシー"
    },
    languages: {
      title: "言語"
    },
    social: {
      builtWith: "世界中のジブリファンのために❤️で構築",
      followUs: "フォローする"
    }
  }
}

export default function JapanesePage() {
  return <HomeContentSimple dictionary={jaDictionary} />
} 