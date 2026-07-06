'use client';

// Client-only context wrapper. QueryClient is created once at module load.

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/supabase/AuthProvider';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import LoginGateModal from '@/components/auth/LoginGateModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          {children}
          <LoginGateModal />
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
