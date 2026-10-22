import { Link } from 'react-router-dom'

import { Logo } from '@/components/icons/logo'

import { routes } from '@/config/routes'

import { cn } from '@/lib/utils'

export function MobileBrand() {
  return (
    <Link
      to={routes.home.main}
      data-preview='developer'
      className={cn(
        'relative isolate flex size-12 shrink-0 items-center justify-center overflow-hidden',
        'rounded-[16px] bg-primary text-white border border-white/20',
        'before:pointer-events-none before:absolute before:left-[-3.22222px] before:top-14.5',
        'before:size-0.5 before:bg-logo-accent',
        'before:transform-[matrix(34.9779,-41.7191,19.2812,184.137,0,0)]',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]'
      )}
    >
      <Logo className='relative h-5.5 w-5.25 text-white/90' />
    </Link>
  )
}
