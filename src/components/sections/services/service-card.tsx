import { Telegram } from '@/components/icons/telegram'
import { Button } from '@/components/ui/button'

import { socials } from '@/config/socials'

import type { IService } from '@/interfaces/service'

import { cn, formatOrderNumber } from '@/lib'

interface IServiceCardProps {
  service: IService
  position: number
}

const priceFormatter = new Intl.NumberFormat('ru-RU')

export function ServiceCard({ service, position }: IServiceCardProps) {
  return (
    <li className='flex min-w-0 flex-col rounded-[26px] bg-card p-5'>
      <p className='font-artegra-extended text-[13px] font-bold italic leading-5 text-primary'>
        {formatOrderNumber(position)} / {service.category}
      </p>
      <h3 className='mt-1 font-artegra text-[18px] font-bold leading-6 text-foreground'>
        {service.title}
      </h3>
      <p className='mt-2 font-artegra text-[14px] leading-5 text-muted-foreground'>
        {service.description}
      </p>

      <div className='mt-auto pt-4'>
        <dl className='flex justify-between gap-4 border-t border-secondary pt-2 font-artegra'>
          <div>
            <dt className='text-[12px] leading-4 text-text-dim'>от</dt>
            <dd className='mt-0.5 text-[14px] font-semibold leading-5'>
              {priceFormatter.format(service.priceFrom)} ₽
            </dd>
          </div>
          <div>
            <dt className='text-[12px] leading-4 text-text-dim'>срок</dt>
            <dd className='mt-0.5 text-[14px] font-semibold leading-5'>{service.duration}</dd>
          </div>
        </dl>
        <Button
          render={<a href={socials.developer.telegram} target='_blank' rel='noopener noreferrer' />}
          nativeButton={false}
          variant='secondary'
          className={cn(
            'mt-3 h-11 w-full gap-1.25 rounded-[12px] px-3 py-0',
            'font-artegra text-[14px] font-medium leading-none'
          )}
        >
          Обсудить проект
          <Telegram className='h-2.5 w-3 shrink-0' />
        </Button>
      </div>
    </li>
  )
}
