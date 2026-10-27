import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export function SearchScrollList({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'min-h-0 flex-1 overflow-y-auto overscroll-contain',
        '[--search-fade-top:0px] [--search-fade-bottom:0px]',
        'mask-[linear-gradient(to_bottom,transparent,black_var(--search-fade-top),black_calc(100%-var(--search-fade-bottom)),transparent)]',
        'data-scroll-top:[--search-fade-top:48px] data-scroll-bottom:[--search-fade-bottom:48px]',
        className
      )}
      {...props}
    />
  )
}
