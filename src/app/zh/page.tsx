import type { Metadata } from 'next'
import { HomeContentSimple } from '@/components/HomeContentSimple'

// 中文页面SEO元数据
export const metadata: Metadata = {
  title: 'Mori Studio AI - 吉卜力风格AI转换平台 | 将图像转换为魔法吉卜力艺术',
  description: '使用Mori Studio AI将任何照片转换为迷人的吉卜力风格艺术作品。从文本描述创建新的吉卜力场景，或将现有图像转换为正宗的吉卜力艺术风格。',
  keywords: '吉卜力风格AI, 宫崎骏艺术风格, 动画风格转换, 吉卜力图像生成器, Mori Studio, 龙猫风格, 千与千寻风格',
  openGraph: {
    title: 'Mori Studio AI - 吉卜力风格AI转换平台',
    description: '使用Mori Studio AI将任何照片转换为迷人的吉卜力风格艺术作品。',
    url: 'https://moristudio.space/zh',
    siteName: 'Mori Studio',
    locale: 'zh_CN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://moristudio.space/zh',
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

// 中文内容字典
const zhDictionary = {
  hero: {
    badge: "专业吉卜力风格AI平台",
    title: "将任何图像转换为魔法吉卜力风格",
    subtitle: "Mori Studio AI",
    description: "使用Mori Studio AI为您的图像带来吉卜力工作室的魔力。将现有照片转换为迷人的吉卜力风格艺术作品，或从文本描述创建新的魔法场景。",
    cta: {
      primary: "开始创造魔法",
      secondary: "查看价格"
    }
  },
  features: {
    title: "Mori Studio AI平台的主要功能",
    subtitle: "我们的Mori Studio AI结合尖端技术与吉卜力工作室的艺术魔力，在一个无缝平台中提供专业的图像转换和生成。",
    items: [
      {
        title: "吉卜力风格转换",
        description: "将任何照片转换为美丽的吉卜力风格艺术作品，具有正宗的角色设计和魔法氛围。"
      },
      {
        title: "文本转吉卜力生成",
        description: "从文本描述创建新的吉卜力风格图像，具有正宗的吉卜力工作室美学和叙事元素。"
      },
      {
        title: "角色一致性",
        description: "在多个图像中保持一致的角色设计，用于连贯的吉卜力风格叙事。"
      }
    ]
  },
  faq: {
    title: "常见问题",
    subtitle: "找到关于我们Mori Studio AI平台及其魔法吉卜力风格图像转换功能的常见问题答案。",
    items: [
      {
        question: "什么是Mori Studio AI？",
        answer: "Mori Studio AI是一个专门的图像转换平台，使用先进的人工智能将任何照片转换为正宗的吉卜力工作室风格艺术作品，或从文本描述创建新的吉卜力风格图像。"
      },
      {
        question: "吉卜力风格转换是如何工作的？",
        answer: "我们的AI分析您的输入图像，并应用吉卜力工作室的标志性艺术元素：柔和的纹理、魔法照明、角色设计原则和自然大气效果，创建正宗的吉卜力风格艺术作品。"
      }
    ]
  },
  cta: {
    title: "准备创造吉卜力魔法了吗？",
    subtitle: "加入成千上万使用Mori Studio AI将创意变为现实的吉卜力粉丝。",
    button: "立即开始"
  },
  footer: {
    brand: {
      name: "Mori Studio",
      description: "专业吉卜力风格AI转换平台。将照片转换为魔法吉卜力艺术作品，创建新的迷人场景，为您的创意项目带来吉卜力工作室的魔力。",
      copyright: "© 2025 Mori Studio. 保留所有权利。"
    },
    contact: {
      title: "联系我们",
      email: "support@moristudio.space"
    },
    legal: {
      title: "法律条款",
      terms: "服务条款",
      privacy: "隐私政策",
      refund: "退款政策"
    },
    languages: {
      title: "语言"
    },
    social: {
      builtWith: "用❤️为全世界的吉卜力粉丝打造",
      followUs: "关注我们"
    }
  }
}

export default function ChinesePage() {
  return <HomeContentSimple dictionary={zhDictionary} />
} 