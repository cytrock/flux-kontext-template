import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			'ghibli-forest': 'hsl(var(--ghibli-forest))',
  			'ghibli-moss': 'hsl(var(--ghibli-moss))',
  			'ghibli-sage': 'hsl(var(--ghibli-sage))',
  			'ghibli-mint': 'hsl(var(--ghibli-mint))',
  			'ghibli-warm': 'hsl(var(--ghibli-warm))',
  			'ghibli-earth': 'hsl(var(--ghibli-earth))',
  			'ghibli-sky': 'hsl(var(--ghibli-sky))',
  			'ghibli-sunset': 'hsl(var(--ghibli-sunset))',
  			success: {
  				DEFAULT: "hsl(var(--success))",
  				foreground: "hsl(var(--success-foreground))",
  			},
  			warning: {
  				DEFAULT: "hsl(var(--warning))",
  				foreground: "hsl(var(--warning-foreground))",
  			},
  			error: {
  				DEFAULT: "hsl(var(--error))",
  				foreground: "hsl(var(--error-foreground))",
  			},
  			info: {
  				DEFAULT: "hsl(var(--info))",
  				foreground: "hsl(var(--info-foreground))",
  			},
  			ghibli: {
  				avocado: "#9CAF88",
  				forest: "#4A5D3A",
  				gold: "#E6B17A",
  				coral: "#F4A688",
  				cream: "#FAF7F0",
  				ink: "#2C3E2D",
  				olive: "#5A6B4A",
  				sage: "#B8C5A6",
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		container: {
  			center: true,
  			padding: {
  				DEFAULT: '1rem',
  				sm: '2rem',
  				lg: '4rem',
  				xl: '5rem',
  				'2xl': '6rem'
  			},
  			screens: {
  				sm: '640px',
  				md: '768px',
  				lg: '1024px',
  				xl: '1280px',
  				'2xl': '1536px'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-up': {
  				'0%': {
  					transform: 'translateY(100%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			float: {
  				"0%, 100%": { transform: "translateY(0px)" },
  				"50%": { transform: "translateY(-10px)" },
  			},
  			"gentle-bounce": {
  				"0%, 100%": { transform: "translateY(0)" },
  				"50%": { transform: "translateY(-5px)" },
  			},
  			'scale-in': {
  				"0%": { opacity: "0", transform: "scale(0.9)" },
  				"100%": { opacity: "1", transform: "scale(1)" },
  			},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.6s ease-out',
  			'slide-up': 'slide-up 0.4s ease-out',
  			float: "float 6s ease-in-out infinite",
  			"gentle-bounce": "gentle-bounce 2s ease-in-out infinite",
  			'scale-in': 'scale-in 0.3s ease-out',
  		},
  		boxShadow: {
  			'ghibli-soft': '0 4px 20px rgba(74, 93, 58, 0.15)',
  			'ghibli-medium': '0 8px 30px rgba(74, 93, 58, 0.2)',
  			'ghibli-strong': '0 12px 40px rgba(74, 93, 58, 0.25)',
  			'ghibli-warm': '0 4px 20px rgba(230, 177, 122, 0.2)',
  		},
  		fontFamily: {
  			sans: ['Inter', 'system-ui', 'sans-serif'],
  			display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
