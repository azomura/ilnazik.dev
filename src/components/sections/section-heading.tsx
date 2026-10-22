import type { ReactNode } from 'react'

import { SectionArrow } from '@/components/icons/section-arrow'

import { cn } from '@/lib/utils'

interface ISectionHeadingProps {
  label: string
  children: ReactNode
  className?: string
}

export function SectionHeading({ label, children, className }: ISectionHeadingProps) {
  return (
    <div className={className}>
      <p
        className={cn(
          'flex items-center gap-2 font-artegra-extended text-[16px] font-bold italic',
          'leading-5 text-primary'
        )}
      >
        <SectionArrow className='size-2.75 shrink-0' />
        {label}
      </p>
      <h2
        className={cn(
          'mt-2 font-artegra text-[28px] font-semibold leading-tight text-foreground',
          'sm:text-[36px] lg:text-[42px]'
        )}
      >
        {children}
      </h2>
    </div>
  )
}
