/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        md: '2rem',
        lg: '2.5rem',
      },
      screens: {
        '2xl': '1400px',
      }
    },
    extend: {
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 6rem)',      { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)',{ lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.25rem, 2vw, 1.75rem)',{ lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'eyebrow':    ['0.75rem',                     { lineHeight: '1',    letterSpacing: '0.22em' }],
        'chip':       ['0.625rem',                    { lineHeight: '1',    letterSpacing: '0.25em' }],
      },
      spacing: {
        'section':    '6rem',
        'section-lg': '8rem',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        bekasi: {
          ink:      '#0B1512',
          emerald: {
            50:  '#EAF3F1',
            100: '#D0E5E1',
            200: '#A2CBC3',
            300: '#6FAEA4',
            400: '#3F9186',
            500: '#1E7A72',
            600: '#155F58',
            700: '#124F4A',
            800: '#0B3D3A',
            900: '#062E2B',
          },
          gold: {
            300: '#F0D69B',
            400: '#E4C179',
            500: '#D4A94C',
            600: '#B48A2D',
            700: '#8C6A20',
          },
          cream:    '#F7F1E6',
          sand:     '#EFE7D6',
          coral:    '#E27D5A',
          sky:      '#8CC7D6',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft':      '0 1px 2px rgba(11,61,58,0.04), 0 8px 24px rgba(11,61,58,0.06)',
        'elevated':  '0 4px 12px rgba(11,61,58,0.06), 0 24px 48px rgba(11,61,58,0.10)',
        'deep':      '0 30px 60px rgba(6,46,43,0.35)',
        'gold':      '0 12px 40px rgba(212,169,76,0.30)',
        'gold-sm':   '0 6px 18px rgba(212,169,76,0.18)',
        'ring-emerald': 'inset 0 0 0 1px rgba(11,61,58,0.06)',
      },
      transitionTimingFunction: {
        'out-quad':    'cubic-bezier(0.5, 1, 0.89, 1)',
        'in-out-quart':'cubic-bezier(0.76, 0, 0.24, 1)',
        'expo':        'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '900': '900ms',
        '1200': '1200ms',
        '1500': '1500ms',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'kenburns': { '0%': { transform: 'scale(1) translate(0,0)' }, '100%': { transform: 'scale(1.12) translate(-1.5%, -1%)' } },
        'marquee':  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'float-y':  { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        'fade-up':  { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'shimmer':  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'kenburns':       'kenburns 18s ease-out infinite alternate',
        'marquee':        'marquee 40s linear infinite',
        'float-y':        'float-y 6s ease-in-out infinite',
        'fade-up':        'fade-up 700ms cubic-bezier(0.16,1,0.3,1) both',
        'shimmer':        'shimmer 2.4s linear infinite',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        'shimmer-gold': 'linear-gradient(90deg, transparent 0%, rgba(212,169,76,0.15) 50%, transparent 100%)',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}
