import { heroSpecializations } from '@/data/hero'

import { cn } from '@/lib/utils'

export function HeroSpecializations() {
  return (
    <ul className='mt-3 flex max-w-135 flex-wrap gap-2'>
      {heroSpecializations.map(specialization => (
        <li
          key={specialization}
          className={cn(
            'rounded-[16px] bg-card px-3 py-2 font-artegra font-normal text-[13px] leading-4',
            'text-foreground/80 sm:text-[14px]'
          )}
        >
          {specialization}
        </li>
      ))}
    </ul>
  )
}
