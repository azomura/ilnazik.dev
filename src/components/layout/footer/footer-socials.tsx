import { useI18n } from '@/hooks/providers/use-i18n'

import { socialLinks } from '@/data/socials'

import { cn } from '@/lib/utils'

const rows = [socialLinks.slice(0, 4), socialLinks.slice(4)]

export function FooterSocials() {
  const { t } = useI18n()

  return (
    <div className='flex w-full max-w-90 flex-col gap-2'>
      {rows.map((row, index) => (
        <ul key={index} className='flex flex-wrap gap-2'>
          {row.map(({ label, href, icon: Icon }) => (
            <li key={t(label)}>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={href}
                className={cn(
                  'inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full',
                  'border border-secondary px-2 whitespace-nowrap font-nt-somic',
                  'text-[11px] min-[400px]:text-[12px] text-foreground/90 transition-colors',
                  'hover:bg-secondary focus-visible:outline-2 focus-visible:outline-ring'
                )}
              >
                <Icon className='size-3.5 shrink-0' />
                {t(label)}
              </a>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}
