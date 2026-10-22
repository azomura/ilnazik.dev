import { cn } from '@/lib/utils'

import { headerLinks } from './header-links'

export function HeaderNav() {
  return (
    <nav className='h-12 min-w-0 flex-1 overflow-hidden rounded-[8px] bg-muted/70'>
      <ul className='flex h-full items-stretch gap-1 p-1'>
        {headerLinks.map(link => (
          <li key={link.href} className='flex min-w-0 flex-1'>
            <a
              href={link.href}
              className={cn(
                'flex h-full w-full items-center justify-center rounded-[6px] px-2 xl:px-4',
                'whitespace-nowrap font-nt-somic text-[14px] font-normal leading-[normal]',
                'text-muted-foreground transition-colors duration-200 hover:bg-secondary/80',
                'hover:text-white tracking-normal'
              )}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
