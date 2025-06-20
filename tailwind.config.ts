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
  			'ghibli-forest': {
  				DEFAULT: '#283723',
  				50: '#F2F5F1',
  				100: '#E0E8DC',
  				200: '#C1D1B8',
  				300: '#9AB088',
  				400: '#6D8B5A',
  				500: '#283723',
  				600: '#1F2B1C',
  				700: '#151E13',
  				800: '#0D140B',
  				900: '#060A05',
  			},
  			'ghibli-moss': {
  				DEFAULT: '#556446',
  				50: '#F4F6F2',
  				100: '#E5EAE0',
  				200: '#CCD6C1',
  				300: '#A8B898',
  				400: '#7F8F6F',
  				500: '#556446',
  				600: '#444F38',
  				700: '#333A2A',
  				800: '#22251C',
  				900: '#11120E',
  			},
  			'ghibli-sage': {
  				DEFAULT: '#82916E',
  				50: '#F6F8F4',
  				100: '#EAF0E6',
  				200: '#D5E2CD',
  				300: '#B8CBA8',
  				400: '#9DAE83',
  				500: '#82916E',
  				600: '#6B7459',
  				700: '#525744',
  				800: '#383A2F',
  				900: '#1C1D17',
  			},
  			'ghibli-mint': {
  				DEFAULT: '#A0AF91',
  				50: '#F7F9F6',
  				100: '#EDF2EA',
  				200: '#DBE6D5',
  				300: '#C1D3B5',
  				400: '#B0C1A3',
  				500: '#A0AF91',
  				600: '#828F75',
  				700: '#646B59',
  				800: '#45473D',
  				900: '#23241F',
  			},
  			'ghibli-olive': {
  				DEFAULT: '#667B50',
  				50: '#F4F7F1',
  				100: '#E6EDE0',
  				200: '#CDDBC1',
  				300: '#A8C096',
  				400: '#879E6F',
  				500: '#667B50',
  				600: '#526240',
  				700: '#3E4930',
  				800: '#2A3120',
  				900: '#161810',
  			},
  			'ghibli-warm': {
  				DEFAULT: '#B4966E',
  				50: '#FAF8F5',
  				100: '#F3EFEA',
  				200: '#E7DFD4',
  				300: '#D5C4B1',
  				400: '#C4AD8F',
  				500: '#B4966E',
  				600: '#957A57',
  				700: '#715C42',
  				800: '#4C3E2C',
  				900: '#261F16',
  			},
  			'ghibli-earth': {
  				DEFAULT: '#8C735A',
  				50: '#F7F5F3',
  				100: '#EDE8E4',
  				200: '#DBD1C9',
  				300: '#C4B2A3',
  				400: '#A8927E',
  				500: '#8C735A',
  				600: '#735C47',
  				700: '#564536',
  				800: '#3A2E24',
  				900: '#1D1712',
  			},
  			'ghibli-sky': {
  				DEFAULT: '#6E8CA0',
  				50: '#F4F7FA',
  				100: '#E6EDF3',
  				200: '#CDDAE7',
  				300: '#A8BFD4',
  				400: '#8BA5BA',
  				500: '#6E8CA0',
  				600: '#587383',
  				700: '#425663',
  				800: '#2C3A42',
  				900: '#161D21',
  			},
  			'ghibli-sunset': {
  				DEFAULT: '#A58264',
  				50: '#F9F7F5',
  				100: '#F1EDE8',
  				200: '#E3DBD1',
  				300: '#D0C0B3',
  				400: '#BAA18B',
  				500: '#A58264',
  				600: '#876951',
  				700: '#654F3D',
  				800: '#433529',
  				900: '#221A14',
  			},
  			'ghibli-cream': {
  				DEFAULT: '#F5F8F2',
  				50: '#FEFFFD',
  				100: '#F5F8F2',
  				200: '#EBF1E5',
  				300: '#E1EAD8',
  				400: '#D7E3CB',
  				500: '#CDDCBE',
  				600: '#B8C8A5',
  				700: '#9CAB87',
  				800: '#6B7A5C',
  				900: '#394332',
  			},
  			'ghibli-coral': {
  				DEFAULT: '#B9785F',
  				50: '#FAF7F5',
  				100: '#F3EDE9',
  				200: '#E7DBD3',
  				300: '#D5C0B3',
  				400: '#C79C8B',
  				500: '#B9785F',
  				600: '#9A614C',
  				700: '#744939',
  				800: '#4E3126',
  				900: '#271913',
  			},
  			'ghibli-lavender': {
  				DEFAULT: '#91829B',
  				50: '#F7F6F8',
  				100: '#EDEAF0',
  				200: '#DBD5E1',
  				300: '#C4B8CE',
  				400: '#A89DB7',
  				500: '#91829B',
  				600: '#756A7F',
  				700: '#595060',
  				800: '#3C3640',
  				900: '#1E1B20',
  			},
  			'ghibli-blush': {
  				DEFAULT: '#E6A8B0',
  				50: '#FDF7F8',
  				100: '#FBEEF0',
  				200: '#F5DCE0',
  				300: '#EDBCC4',
  				400: '#E6A8B0',
  				500: '#E095A0',
  				600: '#D47B8A',
  				700: '#C35E71',
  				800: '#A0495A',
  				900: '#7D3844',
  			},
  			'ghibli-shadow': '#192314',
  			'ghibli-highlight': '#FAFCF8',
  			'ghibli-accent-light': '#D2B9A5',
  			'ghibli-accent-dark': '#785A46',
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
  			'ghibli-gradient-flow': {
  				"0%, 100%": { 
  					backgroundPosition: "0% 50%",
  					filter: "brightness(1.2) contrast(1.2) saturate(1.1)"
  				},
  				"25%": { 
  					backgroundPosition: "100% 50%",
  					filter: "brightness(1.3) contrast(1.3) saturate(1.2)"
  				},
  				"50%": { 
  					backgroundPosition: "200% 50%",
  					filter: "brightness(1.25) contrast(1.2) saturate(1.0)"
  				},
  				"75%": { 
  					backgroundPosition: "300% 50%",
  					filter: "brightness(1.2) contrast(1.3) saturate(1.1)"
  				},
  			},
  			'deep-magical-pulse': {
  				"0%, 100%": { 
  					boxShadow: "0 0 25px rgba(180, 150, 110, 0.4), 0 0 45px rgba(110, 140, 160, 0.2)",
  					filter: "brightness(1)"
  				},
  				"50%": { 
  					boxShadow: "0 0 35px rgba(185, 120, 95, 0.5), 0 0 65px rgba(145, 130, 155, 0.3)",
  					filter: "brightness(1.15)"
  				},
  			},
  			'gradient-x': {
  				"0%, 100%": { backgroundPosition: "0% 50%" },
  				"33%": { backgroundPosition: "100% 50%" },
  				"66%": { backgroundPosition: "200% 50%" },
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
  			'ghibli-gradient': 'ghibli-gradient-flow 8s ease-in-out infinite',
  			'deep-magical-pulse': 'deep-magical-pulse 5s ease-in-out infinite',
  			'gradient-x': 'gradient-x 15s ease infinite',
  		},
  		boxShadow: {
  			'ghibli-soft': '0 4px 20px rgba(74, 93, 58, 0.15)',
  			'ghibli-medium': '0 8px 30px rgba(74, 93, 58, 0.2)',
  			'ghibli-strong': '0 12px 40px rgba(74, 93, 58, 0.25)',
  			'ghibli-warm': '0 4px 20px rgba(230, 177, 122, 0.2)',
  			'ghibli-light': '0 4px 12px rgba(102, 123, 80, 0.15)',
  			'ghibli-magical': '0 0 25px rgba(180, 150, 110, 0.4), 0 0 45px rgba(110, 140, 160, 0.2)',
  			'ghibli-button': '0 6px 20px rgba(40, 55, 35, 0.4), inset 0 1px 0 rgba(245, 248, 242, 0.15)',
  			'ghibli-card': '0 8px 32px rgba(25, 35, 20, 0.15), 0 4px 12px rgba(102, 123, 80, 0.08), inset 0 1px 0 rgba(245, 248, 242, 0.05)',
  		},
  		fontFamily: {
  			sans: ['Inter', 'system-ui', 'sans-serif'],
  			display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
  		},
  		backgroundImage: {
  			'ghibli-primary': 'linear-gradient(135deg, hsl(var(--ghibli-forest)) 0%, hsl(var(--ghibli-moss)) 100%)',
  			'ghibli-warm': 'linear-gradient(135deg, hsl(var(--ghibli-warm)) 0%, hsl(var(--ghibli-sunset)) 100%)',
  			'ghibli-nature': 'linear-gradient(135deg, hsl(var(--ghibli-sage)) 0%, hsl(var(--ghibli-mint)) 100%)',
  			'ghibli-magic': 'linear-gradient(135deg, hsl(var(--ghibli-lavender)) 0%, hsl(var(--ghibli-sky)) 50%, hsl(var(--ghibli-coral)) 100%)',
  			'ghibli-earth': 'linear-gradient(135deg, hsl(var(--ghibli-earth)) 0%, hsl(var(--ghibli-warm)) 100%)',
  			'ghibli-hero': `
  				radial-gradient(ellipse 140% 90% at 50% 10%, rgba(180, 150, 110, 0.12) 0%, transparent 55%),
  				radial-gradient(ellipse 90% 70% at 20% 85%, rgba(185, 120, 95, 0.08) 0%, transparent 50%),
  				radial-gradient(ellipse 110% 110% at 80% 20%, rgba(110, 140, 160, 0.06) 0%, transparent 65%),
  				radial-gradient(ellipse 80% 60% at 90% 90%, rgba(145, 130, 155, 0.04) 0%, transparent 40%)
  			`,
  		},
  		backdropBlur: {
  			'ghibli': '16px',
  			'ghibli-strong': '24px',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
