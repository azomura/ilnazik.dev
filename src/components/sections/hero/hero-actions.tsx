import { useI18n } from '@/hooks/providers/use-i18n'

import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { routes } from '@/config/routes'

import { cn } from '@/lib/utils'

export function HeroActions() {
  const { t } = useI18n()

  return (
    <div className='mt-3.25 flex flex-wrap gap-3'>
      <Button
        render={<Link to={routes.home.projects} />}
        nativeButton={false}
        className={cn(
          'h-11 rounded-[16px] px-5 py-0 font-artegra text-[14px] font-medium',
          'text-center leading-none text-surface-warm'
        )}
      >
        {t('hero.projects')}
      </Button>
      <Button
        render={<Link to={routes.home.services} />}
        nativeButton={false}
        variant='secondary'
        className={cn(
          'h-11 rounded-[16px] px-5 py-0 font-artegra text-[14px] font-medium',
          'text-center leading-none'
        )}
      >
        {t('hero.services')}
      </Button>
    </div>
  )
}
