"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background/80 backdrop-blur-sm shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        /* 🎨 Ghibli风格按钮变体 - 优化颜色对比度确保文字清晰可见 */
        ghibli: "bg-gradient-to-br from-ghibli-forest to-ghibli-moss text-ghibli-cream shadow-lg hover:shadow-xl hover:from-ghibli-moss hover:to-ghibli-sage transform transition-all duration-300 hover:shadow-ghibli-forest/40 border border-ghibli-sage/40 backdrop-blur-sm font-medium",
        
        ghibliOutline: "border-2 border-ghibli-forest text-ghibli-cream bg-ghibli-forest/10 hover:bg-ghibli-forest hover:text-ghibli-cream shadow-md hover:shadow-lg hover:shadow-ghibli-forest/30 backdrop-blur-sm transition-all duration-300 font-medium",
        
        ghibliSoft: "bg-ghibli-mint/50 text-ghibli-forest border border-ghibli-sage/60 hover:bg-ghibli-mint/70 hover:border-ghibli-sage/80 hover:shadow-md hover:text-ghibli-forest backdrop-blur-sm transition-all duration-300 font-medium",
        
        ghibliWarm: "bg-gradient-to-br from-ghibli-warm to-ghibli-sunset text-ghibli-forest shadow-lg hover:shadow-xl hover:from-ghibli-sunset hover:to-ghibli-coral transform transition-all duration-300 hover:shadow-ghibli-warm/40 border border-ghibli-warm/30 font-medium",
        
        ghibliSky: "bg-ghibli-sky text-ghibli-cream shadow-lg hover:shadow-xl hover:bg-ghibli-sky/90 hover:shadow-ghibli-sky/40 border border-ghibli-sky/40 transition-all duration-300 font-medium",
        
        ghibliEarth: "bg-gradient-to-br from-ghibli-earth to-ghibli-warm text-ghibli-cream shadow-lg hover:shadow-xl hover:from-ghibli-warm hover:to-ghibli-earth transform transition-all duration-300 hover:shadow-ghibli-earth/40 font-medium",
        
        ghibliMagic: "bg-gradient-to-br from-ghibli-lavender via-ghibli-sky to-ghibli-coral text-ghibli-cream shadow-lg hover:shadow-xl hover:shadow-ghibli-lavender/50 animate-gradient-x bg-[length:400%_400%] backdrop-blur-sm font-medium",
        
        ghibliPrimary: "bg-ghibli-forest text-ghibli-cream hover:bg-ghibli-moss shadow-lg hover:shadow-xl hover:shadow-ghibli-forest/40 border border-ghibli-forest/30 transition-all duration-300 font-medium",
        
        ghibliSecondary: "bg-ghibli-warm text-ghibli-forest hover:bg-ghibli-sunset shadow-lg hover:shadow-xl hover:shadow-ghibli-warm/40 border border-ghibli-warm/30 transition-all duration-300 font-medium",
        
        ghibliAccent: "bg-ghibli-coral text-ghibli-cream shadow-lg hover:shadow-xl hover:bg-ghibli-coral/90 hover:shadow-ghibli-coral/40 border border-ghibli-coral/30 transition-all duration-300 font-medium",
        
        ghibliNature: "bg-gradient-to-br from-ghibli-sage to-ghibli-mint text-ghibli-forest shadow-md hover:shadow-lg hover:from-ghibli-mint hover:to-ghibli-sage transform transition-all duration-300 border border-ghibli-sage/50 font-medium",
        
        ghibliDream: "bg-gradient-to-br from-ghibli-lavender/80 to-ghibli-sky/80 text-ghibli-cream shadow-md hover:shadow-lg backdrop-blur-md hover:backdrop-blur-lg transform transition-all duration-300 border border-ghibli-lavender/40 font-medium",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
        xl: "h-14 rounded-xl px-10 text-lg font-semibold",
        xxl: "h-16 rounded-2xl px-12 text-xl font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, icon, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {icon && icon}
            {children}
          </div>
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
