"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Zap, Star, ArrowRight, X, Sparkles } from "lucide-react"
import { UserType, getUpgradeSuggestion, pricingPlans } from "@/lib/user-tiers"
import Link from 'next/link'

interface UpgradePromptProps {
  userType: UserType
  feature?: string
  className?: string
  compact?: boolean
}

export function UpgradePrompt({ userType, feature, className = "", compact = false }: UpgradePromptProps) {
  const suggestion = getUpgradeSuggestion(userType, feature)
  
  if (!suggestion || userType === UserType.PREMIUM) {
    return null
  }

  if (compact) {
    return (
      <div className={`bg-gradient-to-r from-primary to-accent p-3 rounded-lg text-primary-foreground ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4" />
            <span className="text-sm font-medium">{suggestion.title}</span>
          </div>
          <Button variant="secondary" size="sm" className="text-primary">
            {suggestion.action}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className={`border-2 border-border bg-card ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-full">
            <Crown className="h-6 w-6 text-primary-foreground" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{suggestion.title}</h3>
              {userType === UserType.ANONYMOUS && (
                <Badge variant="secondary" className="bg-success/10 text-success">
                  免费
                </Badge>
              )}
              {suggestion.nextTier === UserType.PREMIUM && (
                <Badge variant="secondary" className="bg-accent/10 text-accent-foreground">
                  $29/月
                </Badge>
              )}
            </div>
            
            <p className="text-muted-foreground mb-4">{suggestion.description}</p>
            
            {/* 功能列表 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {userType === UserType.ANONYMOUS && (
                <>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Flux Kontext Max模型</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Star className="h-4 w-4 text-primary" />
                    <span>生成1-4张图片</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Crown className="h-4 w-4 text-primary" />
                    <span>历史记录同步</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>更多宽高比选项</span>
                  </div>
                </>
              )}
              
              {userType === UserType.REGISTERED && (
                <>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Crown className="h-4 w-4 text-primary" />
                    <span>批量生成1-12张</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Zap className="h-4 w-4 text-primary" />
                    <span>Private Mode私人模式</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Star className="h-4 w-4 text-primary" />
                    <span>优先队列快速生成</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>无限制使用频率</span>
                  </div>
                </>
              )}
            </div>
            
            {/* 特殊优惠 */}
            {suggestion.nextTier === UserType.PREMIUM && (
              <div className="bg-warning/10 border border-warning rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-warning-foreground">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    年付方案节省20% - 仅需$290/年
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex gap-3">
              {userType === UserType.ANONYMOUS && (
                <Button variant="outline" className="flex-1">
                  免费注册
                </Button>
              )}
              <Button 
                className="flex-1 btn-ghibli"
              >
                {suggestion.action}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 功能锁定提示组件
interface FeatureLockedProps {
  userType: UserType
  feature: string
  requiredTier: UserType
  className?: string
}

export function FeatureLocked({ userType, feature, requiredTier, className = "" }: FeatureLockedProps) {
  const tierNames = {
    [UserType.ANONYMOUS]: "免费用户",
    [UserType.REGISTERED]: "注册用户", 
    [UserType.PREMIUM]: "Premium用户"
  }
  
  return (
    <div className={`bg-muted/20 border-2 border-dashed border-border rounded-lg p-4 text-center ${className}`}>
      <Crown className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
      <h4 className="font-medium text-foreground mb-1">{feature}</h4>
      <p className="text-sm text-muted-foreground mb-3">
        此功能需要{tierNames[requiredTier]}权限
      </p>
      <UpgradePrompt userType={userType} feature={feature} compact />
    </div>
  )
}

// 使用量提示组件
interface UsageLimitProps {
  current: number
  limit: number
  period: string
  userType: UserType
}

export function UsageLimit({ current, limit, period, userType }: UsageLimitProps) {
  const percentage = (current / limit) * 100
  const isNearLimit = percentage >= 80
  const isOverLimit = current >= limit
  
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">
          使用量 ({period})
        </span>
        <span className="text-sm text-muted-foreground">
          {current} / {limit === Infinity ? '∞' : limit}
        </span>
      </div>
      
      {limit !== Infinity && (
        <div className="w-full bg-muted/20 rounded-full h-2 mb-3">
          <div 
            className={`h-2 rounded-full transition-all ${
              isOverLimit ? 'bg-error' : 
              isNearLimit ? 'bg-warning' : 
              'bg-success'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      )}
      
      {isNearLimit && !isOverLimit && (
        <p className="text-sm text-warning-foreground mb-3">
          使用量即将达到上限，考虑升级以获得更多配额
        </p>
      )}
      
      {isOverLimit && (
        <p className="text-sm text-error-foreground mb-3">
          已达到使用上限，请升级以继续使用
        </p>
      )}
      
      <UpgradePrompt userType={userType} compact />
    </div>
  )
}

export function UpgradePromptNotification() {
  const { data: session } = useSession()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 检查用户是否需要看到升级提示
    if (session?.user?.email) {
      const lastDismissed = localStorage.getItem('upgrade-prompt-dismissed')
      if (!lastDismissed || Date.now() - parseInt(lastDismissed) > 24 * 60 * 60 * 1000) {
        setIsVisible(true)
      }
    }
  }, [session])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('upgrade-prompt-dismissed', Date.now().toString())
  }

  if (!isVisible || !session?.user) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="card-ghibli animate-scale-in">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-accent rounded-full transition-colors"
          aria-label="Dismiss upgrade prompt"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="pr-8">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center">
              <Crown className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Upgrade to Pro</h3>
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Limited Time
              </Badge>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            Unlock unlimited generations, priority processing, and exclusive Ghibli-style filters.
          </p>

          <div className="flex flex-col space-y-2">
            <Link 
              href="/pricing" 
              className="btn-ghibli-accent text-center text-sm py-2"
              onClick={() => setIsVisible(false)}
            >
              <Zap className="w-4 h-4 mr-1 inline" />
              Upgrade Now
            </Link>
            <button
              onClick={handleDismiss}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 