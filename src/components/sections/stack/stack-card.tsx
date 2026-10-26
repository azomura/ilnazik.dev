import { useI18n } from '@/hooks/providers/use-i18n'

import type { IStackTechnology } from '@/interfaces/sections/stack'

import { cn } from '@/lib/utils'

interface IStackCardProps {
  technology: IStackTechnology
}

export function StackCard({ technology }: IStackCardProps) {
  const { t } = useI18n()

  return (
    <li
      className={cn(
        'relative isolate w-43.5 shrink-0 snap-start overflow-hidden',
        'rounded-[16px] bg-card px-3.5 py-3'
      )}
    >
      <div
        style={{ maskImage: `url("${technology.decoration}")` }}
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 size-full bg-primary',
          'mask-cover mask-center mask-no-repeat'
        )}
      />
      <div className='size-8.75 rounded-[7px] bg-popover'>
        <div
          style={{ maskImage: `url("${technology.icon}")` }}
          className='size-full bg-primary mask-contain mask-center mask-no-repeat'
        />
      </div>
      <h4 className='mt-2 truncate font-artegra text-[16px] font-semibold leading-5'>
        {technology.name}
      </h4>
      <p className='mt-0.5 truncate font-artegra text-[14px] leading-5 text-text-dim'>
        {t(technology.description)}
      </p>
    </li>
  )
}
