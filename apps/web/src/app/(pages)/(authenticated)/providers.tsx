'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/infra/libs/react-query'

export function PrivateProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
