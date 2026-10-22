import { Image } from '@/components/ui/image'

import type { IStackTechnology } from '@/interfaces/stack'

import { cn } from '@/lib/utils'

interface IStackCardProps {
  technology: IStackTechnology
}

export function StackCard({ technology }: IStackCardProps) {
  return (
    <li
      className={cn(
        'relative isolate w-43.5 shrink-0 snap-start overflow-hidden',
        'rounded-[16px] bg-card px-3.5 py-3'
      )}
    >
      <Image
        src={technology.decoration}
        alt=''
        loading='lazy'
        containerClassName='pointer-events-none absolute inset-0 -z-10 size-full'
        className='size-full object-cover'
      />
      <Image
        src={technology.icon}
        alt=''
        width={35}
        height={35}
        loading='lazy'
        containerClassName='size-8.75 rounded-[7px] bg-popover'
        className='size-full'
      />
      <h4 className='mt-2 truncate font-artegra text-[16px] font-semibold leading-5'>
        {technology.name}
      </h4>
      <p className='mt-0.5 truncate font-artegra text-[14px] leading-5 text-text-dim'>
        {technology.description}
      </p>
    </li>
  )
}
