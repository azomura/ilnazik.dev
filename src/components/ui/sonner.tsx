import { Toaster as Sonner } from 'sonner'

import { cn } from '@/lib/utils'

export function Toaster() {
  return (
    <Sonner
      position='top-center'
      offset={100}
      mobileOffset={{ top: 100, left: 16, right: 16 }}
      duration={7000}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: cn(
            'flex w-full items-start gap-3 rounded-2xl border border-secondary',
            'bg-card p-4 font-nt-somic text-sm text-foreground shadow-lg'
          ),
          icon: 'shrink-0 text-primary',
          content: 'flex min-w-0 flex-col gap-1',
          title: 'font-medium',
          description: 'text-muted-foreground'
        }
      }}
    />
  )
}
