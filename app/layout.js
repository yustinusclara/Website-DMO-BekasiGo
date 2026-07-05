import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'BekasiGo — Discover Kota Bekasi',
  description:
    'The destination guide to Kota Bekasi. Discover heritage, urban lifestyle, culinary journeys, and smart city experiences — plan your trip with the BekasiGo Smart Planner.',
  metadataBase: new URL('https://bekasigo.example.com'),
  icons: {
    icon: 'https://res.cloudinary.com/oi9u7lsq/image/upload/v1783252951/3._Logo_SVG_BekasiGo_main_wqr72y.svg',
  },
  openGraph: {
    title: 'BekasiGo — Discover Kota Bekasi',
    description:
      'Heritage meets smart city. Explore destinations, events, and stories from Kota Bekasi.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="min-h-screen bg-bekasi-cream text-bekasi-ink font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
