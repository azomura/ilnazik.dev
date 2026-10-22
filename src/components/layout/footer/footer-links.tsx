import { Link } from 'react-router-dom'

import { informationPages } from '@/data/information-pages'

import { cn } from '@/lib/utils'

export function FooterLinks() {
  return (
    <nav>
      <ul className='flex flex-col gap-x-4 gap-y-3 sm:flex-row sm:flex-wrap'>
        {informationPages.map(page => (
          <li key={page.href}>
            <Link
              to={page.href}
              className={cn(
                'font-nt-somic text-[12px] text-muted-foreground transition-colors',
                'hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring'
              )}
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
