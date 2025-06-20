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
        ghibli: "bg-gradient-to-r from-primary to-ghibli-moss text-white shadow-lg hover:shadow-xl hover:from-ghibli-moss hover:to-ghibli-sage transform transition-all duration-300 hover:shadow-ghibli-warm/30",
        ghibliOutline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white shadow-md hover:shadow-lg hover:shadow-primary/20",
        ghibliSoft: "bg-ghibli-mint/30 text-foreground border border-ghibli-sage/40 hover:bg-ghibli-mint/50 hover:border-ghibli-sage/60 hover:shadow-md",
        ghibliWarm: "bg-gradient-to-r from-secondary to-ghibli-earth text-white shadow-lg hover:shadow-xl hover:from-ghibli-earth hover:to-secondary transform transition-all duration-300",
        ghibliSky: "bg-accent text-accent-foreground shadow-lg hover:shadow-xl hover:bg-accent/90 hover:shadow-accent/30",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
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
