import LoginForm from '@/components/admin/LoginForm'
import AuthLayout from '@/components/admin/AuthLayout'

export const metadata = {
  title: 'Sign in — BekasiGo CMS',
  description: 'Internal login for BekasiGo staff and editors.',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <AuthLayout
      title="Sign in to BekasiGo CMS"
      kicker="Internal Access"
      subtitle="Enter your administrator username and password."
    >
      <LoginForm />
    </AuthLayout>
  )
}
