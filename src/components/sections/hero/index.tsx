import { cn } from '@/lib/utils'

import { HeroActions } from './hero-actions'
import { HeroContent } from './hero-content'
import { HeroLogo } from './hero-logo'
import { HeroSpecializations } from './hero-specializations'

export function Hero() {
  return (
    <section
      className={cn(
        'mx-auto lg:-mt-12 grid w-[calc(100%-2rem)] max-w-275 items-center gap-10 py-24',
        'sm:py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:gap-8',
        'lg:min-h-[calc(100svh-9rem)] lg:grid-cols-[minmax(0,1fr)_375px] lg:py-24'
      )}
    >
      <div className='min-w-0'>
        <HeroContent />
        <HeroActions />
        <HeroSpecializations />
      </div>
      <HeroLogo />
    </section>
  )
}
