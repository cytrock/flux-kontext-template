"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogoVariants } from "@/components/Logo"
import { ChevronDown, User, LogOut, Code, BookOpen, Menu, X, Home, Zap, CreditCard, Flower2 } from "lucide-react"
// 导入文案系统
import { common } from "@/lib/content"

const navigationLinks = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Generate",
    href: "/generate",
    icon: Zap,
  },
  {
    name: "Memory Garden",
    href: "/memory-garden",
    icon: Flower2,
    requiresAuth: true,
  },
  {
    name: "Pricing",
    href: "/pricing",
    icon: CreditCard,
  },
  {
    name: "Resources",
    href: "/resources",
    icon: BookOpen,
  },
]

export function Navigation() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.user-dropdown')) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 关闭移动菜单当路由改变时
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false)
    }

    // 监听路由变化
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A') {
        handleRouteChange()
      }
    })

    return () => {
      document.removeEventListener('click', handleRouteChange)
    }
  }, [])

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <header className="nav-ghibli fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center">
        {/* 左侧：Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-ghibli-cream to-ghibli-mint rounded-lg shadow-ghibli-medium group-hover:shadow-ghibli-magical transition-all duration-300"></div>
              <div className="absolute inset-0 w-8 h-8 bg-gradient-to-tr from-ghibli-warm/60 to-transparent rounded-lg group-hover:animate-pulse"></div>
            </div>
            <span className="text-xl font-bold text-ghibli-cream group-hover:text-white transition-all duration-300">
              Mori Studio
            </span>
          </Link>
        </div>
        
        {/* 中间：桌面端导航菜单 - 居中显示 */}
        <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
          {navigationLinks.map((link) => {
            // 如果需要认证但用户未登录，则不显示
            if (link.requiresAuth && !session) {
              return null
            }
            
            return (
              <div key={link.name} className="relative">
                {/* 普通导航链接 */}
                <Link 
                  href={link.href} 
                  className={`relative transition-all duration-200 hover:font-semibold active:scale-95 ${
                    pathname === link.href || 
                    (link.href === '/resources' && pathname.startsWith('/resources')) ||
                    (link.href === '/memory-garden' && pathname.startsWith('/memory-garden'))
                      ? 'text-ghibli-warm font-semibold' 
                      : 'text-ghibli-cream hover:text-ghibli-warm'
                  }`}
                >
                  {link.name}
                  {(pathname === link.href || 
                    (link.href === '/resources' && pathname.startsWith('/resources')) ||
                    (link.href === '/memory-garden' && pathname.startsWith('/memory-garden'))) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ghibli-warm rounded-full" />
                  )}
                </Link>
              </div>
            )
          })}
        </nav>

        {/* 右侧：桌面端用户状态和按钮 */}
        <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
          {status === "loading" ? (
            <div className="w-8 h-8 animate-spin rounded-full border-2 border-ghibli-warm border-t-transparent" />
          ) : session ? (
            // 已登录状态
            <div className="relative user-dropdown">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-ghibli-forest/20 transition-colors"
              >
                {session.user?.image ? (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || "User"} 
                    className="w-8 h-8 rounded-full border-2 border-ghibli-warm"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-ghibli-warm/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-ghibli-warm" />
                  </div>
                )}
                <span className="text-sm font-medium text-ghibli-cream">{session.user?.name || session.user?.email}</span>
                <ChevronDown className={`w-4 h-4 text-ghibli-cream transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* 用户下拉菜单 */}
              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-ghibli-olive/98 backdrop-blur-xl border border-ghibli-forest/30 rounded-xl shadow-ghibli-strong z-[9999]">
                  <div className="p-2">
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 text-sm text-ghibli-cream hover:text-ghibli-warm hover:bg-ghibli-forest/20 rounded-lg transition-all duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {common.navigation.dashboard}
                    </Link>
                    <hr className="my-2 border-ghibli-forest/20" />
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-3 py-2 text-sm text-ghibli-cream hover:text-ghibli-warm hover:bg-ghibli-forest/20 rounded-lg transition-all duration-200 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{common.buttons.signOut}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // 未登录状态
            <>
              <Link href={`/auth/signin?callbackUrl=${pathname}`}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-ghibli-cream hover:text-ghibli-warm hover:bg-ghibli-forest/20 hover:font-semibold active:scale-95 transition-all duration-200"
                >
                  {common.navigation.login}
                </Button>
              </Link>
              <Link href={`/auth/signup?callbackUrl=${pathname}`}>
                <Button 
                  variant="ghibli"
                  size="sm" 
                  className="font-medium shadow-ghibli-button hover:shadow-ghibli-magical transition-all duration-300"
                >
                  {common.buttons.signUp}
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* 移动端汉堡菜单按钮 */}
        <div className="md:hidden flex-shrink-0">
          <button
            className="p-2 hover:bg-ghibli-forest/20 rounded-md active:scale-95 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-ghibli-cream transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`block w-5 h-0.5 bg-ghibli-cream transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-ghibli-cream transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-ghibli-olive/98 backdrop-blur-xl border-t border-ghibli-forest/20">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* 移动端导航链接 */}
            {navigationLinks.map((link) => {
              // 如果需要认证但用户未登录，则不显示
              if (link.requiresAuth && !session) {
                return null
              }
              
              return (
                <div key={link.name}>
                  {/* 普通移动端导航链接 */}
                  <Link
                    href={link.href}
                    className={`block py-2 px-3 rounded-md transition-all duration-200 hover:bg-ghibli-forest/20 hover:font-semibold active:scale-95 ${
                      pathname === link.href || 
                      (link.href === '/resources' && pathname.startsWith('/resources')) ||
                      (link.href === '/memory-garden' && pathname.startsWith('/memory-garden'))
                        ? 'text-ghibli-warm font-semibold bg-ghibli-forest/20' 
                        : 'text-ghibli-cream'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </div>
              )
            })}
            
            {/* 移动端用户状态按钮 */}
            <div className="border-t border-ghibli-forest/20 pt-4">
              {status === 'loading' ? (
                <div className="flex justify-center">
                  <div className="w-8 h-8 animate-spin rounded-full border-2 border-ghibli-warm border-t-transparent" />
                </div>
              ) : session ? (
                // 移动端已登录状态
                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 py-2 px-3 rounded-md text-ghibli-cream hover:text-ghibli-warm hover:bg-ghibli-forest/20 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>{common.navigation.dashboard}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full text-left flex items-center space-x-3 py-2 px-3 rounded-md text-ghibli-cream hover:text-ghibli-warm hover:bg-ghibli-forest/20 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{common.buttons.signOut}</span>
                  </button>
                </div>
              ) : (
                // 移动端未登录状态
                <div className="space-y-2">
                  <Link href={`/auth/signin?callbackUrl=${pathname}`}>
                    <Button
                      variant="ghibliOutline"
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {common.navigation.login}
                    </Button>
                  </Link>
                  <Link href={`/auth/signup?callbackUrl=${pathname}`}>
                    <Button
                      variant="ghibli"
                      className="w-full font-medium shadow-ghibli-button"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {common.buttons.signUp}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 