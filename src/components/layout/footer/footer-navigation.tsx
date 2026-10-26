import { useI18n } from '@/hooks/providers/use-i18n'

import { Link } from 'react-router-dom'

import { footerNavigation } from '@/data/navigation'

import { cn } from '@/lib/utils'

export function FooterNavigation() {
  const { t } = useI18n()

  return (
    <nav className='min-w-0 md:col-start-1 md:row-start-2 lg:col-start-2 lg:row-start-1'>
      {footerNavigation.map(group => (
        <div key={t(group.title)}>
          <p className='font-artegra text-[13px] font-semibold text-foreground/90'>{t(group.title)}</p>

          <ul className='mt-2 grid grid-flow-col grid-rows-2 auto-cols-max gap-x-12 gap-y-2'>
            {group.links.map(link => (
              <li key={link.href} className='leading-4'>
                <Link
                  to={link.href}
                  className={cn(
                    'block font-nt-somic text-[12px] leading-4 text-muted-foreground',
                    'hover:text-foreground focus-visible:outline-2',
                    'transition-colors focus-visible:outline-ring'
                  )}
                >
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
