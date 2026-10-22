import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { headerLinks } from '../header-links'

interface IMobileNavProps {
  onNavigate: () => void
}

export function MobileNav({ onNavigate }: IMobileNavProps) {
  return (
    <nav>
      <ul className='flex flex-col gap-1'>
        {headerLinks.map(link => (
          <li key={link.href} className='first:[&_a]:rounded-t-[16px] last:[&_a]:rounded-b-[16px]'>
            <Link
              to={link.href}
              onClick={onNavigate}
              className={cn(
                'flex h-12 items-center justify-center rounded-[8px] bg-muted/70',
                'font-nt-somic text-[14px] font-normal text-muted-foreground',
                'transition-colors hover:bg-secondary/80 hover:text-white',
                'focus-visible:outline-2 focus-visible:outline-ring'
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
