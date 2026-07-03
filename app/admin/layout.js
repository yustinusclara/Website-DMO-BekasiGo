// Admin layout — isolated shell (no SiteHeader / SiteFooter).
// Internal-tool aesthetic: minimal, denser, monotone.

export const metadata = {
  title: 'Admin · BekasiGo',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-bekasi-ink antialiased">
      {children}
    </div>
  )
}
