import { business } from '@/config/business'

import { cn } from '@/lib/utils'

export function FooterDetails() {
  return (
    <div
      className={cn(
        'mt-4 flex flex-col gap-3',
        'font-nt-somic text-[12px] text-muted-foreground',
        'sm:flex-row sm:items-end sm:justify-between'
      )}
    >
      <div className='flex flex-col gap-1.5'>
        <p>
          {business.status}{' '}
          <span
            data-preview='developer'
            tabIndex={0}
            className='cursor-pointer underline underline-offset-4'
          >
            {business.fullName}
          </span>
        </p>
        <p>ИНН: {business.inn || '—'}</p>
      </div>
      <p className='shrink-0'>
        © {new Date().getFullYear()}{' '}
        <span data-preview='developer' tabIndex={0}>
          azomura
        </span>
      </p>
    </div>
  )
}
