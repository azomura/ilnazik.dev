import { useI18n } from '@/hooks/providers/use-i18n'

import { cn } from '@/lib/utils'

export function HeroContent() {
  const { t } = useI18n()

  return (
    <>
      <p
        className={cn(
          'font-artegra-extended text-[14px] font-bold italic leading-5 text-primary',
          'sm:text-[13px] lg:text-[14px]'
        )}
      >
        {t('hero.status')}
      </p>

      <h1
        className={cn(
          'mt-3 font-space-grotesk text-[clamp(3.5rem,10vw,6.5rem)] font-bold',
          'leading-none tracking-[-0.04em] text-foreground'
        )}
      >
        azomura<span className='text-text-dim'>.</span>
      </h1>

      <p
        className={cn(
          'mt-3 max-w-lg font-artegra text-[16px] font-normal leading-7 text-balance',
          'text-muted-foreground lg:text-[18px]'
        )}
      >
        {t('hero.description')}
      </p>
    </>
  )
}
