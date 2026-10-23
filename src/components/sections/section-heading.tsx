import type { ReactNode } from 'react'

import { SectionArrow } from '@/components/icons/section-arrow'

import { cn } from '@/lib/utils'

interface ISectionHeadingProps {
  label: string
  children: ReactNode
  className?: string
  showDot?: boolean
  actions?: ReactNode
  actionsClassName?: string
}

export function SectionHeading({
  label,
  children,
  className,
  actions,
  actionsClassName,
  showDot = true
}: ISectionHeadingProps) {
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
      <div className='mt-2 flex flex-wrap items-end justify-between gap-4'>
        <h2
          className={cn(
            'min-w-0 font-artegra text-[28px] font-semibold leading-tight text-foreground',
            'sm:text-[36px] lg:text-[42px]'
          )}
        >
          {children}
        </h2>
        <div className={cn('ml-auto flex shrink-0 items-end gap-4', actionsClassName)}>
          {actions}
          {showDot && <span className='mb-1.5 size-1.5 shrink-0 rounded-full bg-foreground' />}
        </div>
      </div>
    </div>
  )
}
