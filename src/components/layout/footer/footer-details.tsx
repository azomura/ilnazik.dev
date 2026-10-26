import { useI18n } from '@/hooks/providers/use-i18n'

import { business } from '@/config/business'

import { cn } from '@/lib/utils'

export function FooterDetails() {
  const { t } = useI18n()

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
          {t(business.status)}{' '}
          <span
            data-preview='developer'
            tabIndex={0}
            className='cursor-pointer underline underline-offset-4'
          >
            {t(business.fullName)}
          </span>
        </p>
        <p>{t('footer.taxId')} {business.inn || '—'}</p>
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
