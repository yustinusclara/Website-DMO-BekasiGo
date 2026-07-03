'use client'

import AdminShell from '@/components/admin/AdminShell'
import { Button } from '@/components/ui/button'
import { Plus, RefreshCw } from 'lucide-react'
import {
  StatsGrid, PublishStatus, QuickActions,
  RecentEdits, UpcomingScheduled, WelcomeBanner,
} from '@/components/admin/widgets'

export default function AdminDashboardPage() {
  return (
    <AdminShell
      kicker="Dashboard"
      title="Welcome back — here’s your city today."
      actions={
        <>
          <Button variant="outline" className="h-10 rounded-md border-bekasi-emerald-900/15 text-bekasi-emerald-900 hover:bg-bekasi-emerald-900 hover:text-white px-4 gap-2">
            <RefreshCw className="h-4 w-4" /> Sync content
          </Button>
          <Button className="h-10 rounded-md bg-bekasi-emerald-900 hover:bg-bekasi-emerald-800 text-white px-4 gap-2">
            <Plus className="h-4 w-4" /> New content
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <WelcomeBanner />

        <StatsGrid />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <PublishStatus />
            <RecentEdits />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <UpcomingScheduled />
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
