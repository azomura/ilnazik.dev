import { DesignerLogo } from '@/components/icons/designer-logo'

import { socials } from '@/config/socials'

import { cn } from '@/lib/utils'

export function FooterCredit() {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={socials.designer.telegram}
      className={cn(
        'ml-auto flex shrink-0 items-center gap-3',
        'text-muted-foreground transition-colors hover:text-foreground',
        'focus-visible:outline-2 focus-visible:outline-ring'
      )}
    >
      <span className='font-nt-somic text-[12px]'>Дизайн разработал</span>
      <DesignerLogo size={54} className='h-8.25 w-13.5 text-foreground' />
    </a>
  )
}
