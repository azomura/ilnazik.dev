import { useI18n } from '@/hooks/providers/use-i18n'

import { aboutStatistics } from '@/data/about'

import { cn } from '@/lib/utils'

export function AboutStatistics() {
  const { t } = useI18n()

  return (
    <ul className='mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4'>
      {aboutStatistics.map(({ value, label, icon: Icon }) => (
        <li
          key={t(label)}
          className='relative isolate min-w-41.5 min-h-30.25 overflow-hidden rounded-[16px] bg-card/70 px-5 py-5'
        >
          <Icon
            size={110}
            className={cn(
              'pointer-events-none absolute -right-3 bottom-0 -z-10 h-22 w-27.5',
              'select-none text-primary'
            )}
          />

          <p className='text-[34px] font-space-grotesk font-semibold leading-10 text-primary'>
            {value}
          </p>

          <p className='mt-0.75 font-artegra font-normal max-w-24 text-[13px] leading-4.25 text-foreground/90'>
            {t(label)}
          </p>
        </li>
      ))}
    </ul>
  )
}
