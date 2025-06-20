# Mori Studio - Ghibli-Style AI Transformation Platform

A professional Next.js 15 platform for creating magical Ghibli-style AI transformations. Transform your photos into enchanting Studio Ghibli artwork with advanced AI technology.

## ✨ Features

- **Ghibli-Style Transformations**: Professional AI-powered image transformation to Studio Ghibli art style
- **Modern UI/UX**: Built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI
- **Responsive Design**: Mobile-first approach with beautiful responsive layouts
- **SEO Optimized**: Complete metadata and Open Graph optimization
- **Legal Pages**: Comprehensive Terms of Service, Privacy Policy, and Refund Policy
- **Professional Branding**: Cohesive Mori Studio brand identity throughout

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Radix UI
- **Fonts**: Geist (Next.js optimized)
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage (English only)
│   ├── generate/           # Transformation page
│   ├── pricing/            # Pricing page
│   ├── terms/              # Terms of Service
│   ├── privacy/            # Privacy Policy
│   └── refund/             # Refund Policy
├── components/
│   ├── ui/                 # Shadcn UI components
│   └── ...                 # Custom components
└── lib/
    └── utils.ts            # Utility functions
```

## 🔄 Recent Updates

### Version 2.1 - 吉卜力温暖配色系统 (January 2025)

#### 🎨 配色系统重大改革:
- **背景色更改**: 从深森林夜色 (#0c1410) 改为温暖奶cream背景 (#faf8f3)
- **主色调整**: 更新为温润森林绿 (#7ba05b) 更贴近吉卜力美学
- **副色添加**: 新增温暖土黄色 (#d4a574) 营造暖色调
- **强调色**: 引入天空蓝色 (#87ceeb) 增强视觉层次
- **文字优化**: 采用深墨绿 (#2d4a22) 确保在浅色背景上的对比度

#### 🌟 视觉效果提升:
- **治愈风格**: 整体配色从暗沉转向温暖治愈的吉卜力童话风格
- **按钮变体**: 新增ghibliWarm和ghibliSky等主题按钮样式
- **渐变优化**: 调整所有渐变效果以适配温暖色调
- **阴影重构**: 更新阴影颜色为温暖色系，增强立体感

#### ✨ 技术改进:
- **CSS变量系统**: 完整更新所有颜色变量以支持新配色
- **深色模式**: 同步更新深色模式以保持温暖感
- **全局一致性**: 所有组件自动适配新的配色方案

### Version 2.0 - Project Restructure (January 2025)

#### 🔥 Major Changes:
- **Removed Multilingual Support**: Deleted all language versions (zh, ja, es, de, fr, it, ko, nl, pl, pt, ru, tr, ar, hi, bn)
- **Single Language Focus**: Now maintains only English version for simplified management
- **Brand Transformation**: Complete rebrand from "Flux Kontext" to "Mori Studio"

#### 📜 Legal Documents Updated:
- **Terms of Service**: Updated to reflect Ghibli-style AI transformation platform
- **Privacy Policy**: Comprehensive update for Mori Studio branding and Ghibli-style services
- **Refund Policy**: Restructured refund conditions for AI transformation services

#### 🎯 Brand Consistency:
- Navigation updated: "Generate" → "Transform"
- Email contact: support@moristudio.space
- Product description: "Professional Ghibli-style AI transformation platform"
- SEO metadata: Complete optimization for Mori Studio keywords

#### ⚡ Performance Improvements:
- Reduced bundle size by removing 15 language directories
- Simplified routing and navigation
- Focused content strategy for better user experience

### Previous Versions:
- **Version 1.x**: Multi-language platform with 16 language support
- **Version 1.0**: Initial Flux Kontext platform setup

## 🛠 Development

### Prerequisites
- Node.js 18+
- npm or yarn or pnpm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd flux-kontext-template

# Install dependencies
npm install

# Run development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server on port 3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Design System

### Color Scheme
- Primary: Studio Ghibli inspired warm tones
- Background: Clean, minimal design
- Typography: Geist font family for optimal readability

### Components
- Built with Shadcn UI for consistency
- Responsive design patterns
- Accessible component architecture

## 📱 Pages Overview

### Core Pages:
- **Homepage** (`/`): Hero section, features, FAQ, and CTA
- **Transform** (`/generate`): AI transformation interface
- **Pricing** (`/pricing`): Subscription and credit plans

### Legal Pages:
- **Terms of Service** (`/terms`): Service usage terms and conditions
- **Privacy Policy** (`/privacy`): Data protection and privacy practices
- **Refund Policy** (`/refund`): Refund conditions and processes

## 🔧 Configuration

### SEO Configuration
Each page includes comprehensive metadata:
- Title and description optimization
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs
- Keywords optimization

### Styling Configuration
- Tailwind CSS with custom theme
- Shadcn UI component system
- Mobile-first responsive design
- Dark/light mode support

## 📝 Content Strategy

### Brand Voice:
- Professional yet approachable
- Emphasis on magical transformation
- Studio Ghibli aesthetic appreciation
- User-friendly language

### Key Messaging:
- "Transform photos into magical Ghibli artwork"
- "Professional Ghibli-style AI transformation platform"
- Focus on quality and magical experience

## 🚀 Deployment

The project is optimized for deployment on:
- Vercel (recommended for Next.js)
- Netlify
- Any static hosting service

### Environment Variables
```env
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=https://moristudio.space
```

## 📞 Support

For questions, issues, or feature requests:
- Email: support@moristudio.space
- Response time: Within 24 hours during business days

## 📄 License

© 2025 Mori Studio. All rights reserved.

---

**Note**: This project has been simplified to focus on core functionality with a single language version. The previous multilingual approach has been removed to improve maintainability and performance. 