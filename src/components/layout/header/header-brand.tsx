import { Link } from 'react-router-dom'

import { Logo, Wordmark } from '@/components/icons'

import { routes } from '@/config/routes'

import { cn } from '@/lib/utils'

export function HeaderBrand() {
  return (
    <Link
      to={routes.home.main}
      data-preview='developer'
      className={cn(
        'relative isolate flex h-12 w-12 lg:w-33 shrink-0 items-center justify-center gap-1.5',
        'rounded-l-[16px] rounded-r-[8px] overflow-hidden text-white bg-primary',
        'before:pointer-events-none before:absolute before:left-[-6.64px] before:top-[58.84px]',
        'before:h-[64.75px] before:w-52 before:-translate-x-1/2 before:-translate-y-1/2',
        'before:rotate-[-23.6deg] before:bg-logo-accent before:content-[]',
        'border border-white/20'
      )}
    >
      <Logo className='relative h-5.5 w-5.25 text-white/90' />
      <Wordmark className='hidden lg:block relative h-2.25 w-21 text-white/90' />
    </Link>
  )
}
