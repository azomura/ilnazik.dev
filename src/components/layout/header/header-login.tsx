import { useI18n } from '@/hooks/providers/use-i18n'

import { User } from '@/components/icons/user'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

export function HeaderLogin() {
  const { t } = useI18n()

  return (
    <Button
      variant='secondary'
      className={cn(
        'h-12 min-h-12 w-24 sm:w-12 md:w-24 gap-2.5 border-0 bg-clip-border p-0',
        'rounded-l-[8px] rounded-r-[14px] bg-muted/70 text-white',
        'font-artegra text-[13px] font-semibold leading-[normal] tracking-normal'
      )}
    >
      <User className='size-auto h-3.5 w-3 text-white' />
      <span className='sm:max-md:hidden'>{t('nav.login')}</span>
    </Button>
  )
}
