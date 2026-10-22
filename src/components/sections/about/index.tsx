import { cn } from '@/lib/utils'

import { AboutContent } from './about-content'
import { AboutPortrait } from './about-portrait'

export function About() {
  return (
    <section
      id='about'
      className={cn(
        'mx-auto grid w-[calc(100%-2rem)] max-w-275 scroll-mt-28 items-center gap-8 py-16',
        'lg:grid-cols-[367px_minmax(0,1fr)] lg:gap-5 lg:py-20 lg:scroll-mt-36'
      )}
    >
      <AboutPortrait />
      <AboutContent />
    </section>
  )
}
