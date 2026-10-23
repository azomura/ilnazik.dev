import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function Section({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      {...props}
      className={cn(
        'mx-auto w-[calc(100%-2rem)] max-w-275 scroll-mt-28 py-16',
        'lg:scroll-mt-36 lg:py-20',
        className
      )}
    />
  )
}
