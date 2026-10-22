import { ArrowUpRight } from 'lucide-react'

import { socials } from '@/config/socials'

import { cn } from '@/lib/utils'

export function FooterContact() {
  return (
    <div className='flex flex-col items-start gap-2 md:items-end md:text-right'>
      <p className='font-artegra text-[16px] font-semibold text-foreground'>Обсудим ваш проект</p>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href={socials.developer.telegram}
        className={cn(
          'inline-flex min-h-9 items-center gap-1.5 font-nt-somic text-[13px]',
          'transition-colors hover:text-foreground focus-visible:outline-2',
          'text-muted-foreground focus-visible:outline-ring'
        )}
      >
        Написать в Telegram
        <ArrowUpRight className='size-4' />
      </a>
    </div>
  )
}
