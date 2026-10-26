import { useI18n } from '@/hooks/providers/use-i18n'

import { Link } from 'react-router-dom'

import { Logo, Wordmark } from '@/components/icons'

import { routes } from '@/config/routes'

import { useReveal } from '@/hooks/ui/use-reveal'

import { cn } from '@/lib/utils'

import { FooterContact } from './footer-contact'
import { FooterCredit } from './footer-credit'
import { FooterDetails } from './footer-details'
import { FooterLinks } from './footer-links'
import { FooterNavigation } from './footer-navigation'
import { FooterSocials } from './footer-socials'

export function Footer() {
  const { t } = useI18n()

  const { ref, visible } = useReveal()

  return (
    <footer
      ref={ref}
      className={cn(
        'mx-auto mt-auto w-[calc(100%-2rem)] max-w-275 shrink-0 rounded-t-[26px] bg-card',
        'px-6 pt-7 pb-6 sm:px-9.5 origin-bottom transition-[opacity,translate]',
        'sm:transition-[opacity,transform,filter]',
        'duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'motion-reduce:scale-100 motion-reduce:translate-y-0',
        'motion-reduce:blur-none motion-reduce:opacity-100 motion-reduce:transition-none',
        'focus-within:scale-100 focus-within:blur-none focus-within:opacity-100 focus-within:translate-y-0',
        visible
          ? 'translate-y-0 opacity-100 sm:scale-100 sm:blur-none'
          : 'translate-y-3 opacity-0 sm:translate-y-0 sm:scale-[0.97] sm:blur-[6px]'
      )}
    >
      <div className='grid gap-x-6 gap-y-4 md:grid-cols-[194px_minmax(0,1fr)]'>
        <Link
          to={routes.home.main}
          data-preview='developer'
          className='flex items-center gap-2.5 text-foreground'
        >
          <Logo className='h-9.5 w-9' />
          <Wordmark className='h-auto w-37' />
        </Link>

        <p className='max-w-182.5 font-nt-somic text-[15px] leading-7 text-foreground/90 md:pt-1'>
          <span
            data-preview='developer'
            tabIndex={0}
            className='cursor-pointer underline underline-offset-4'
          >
            {t('profile.name')}
          </span>{' '}
          {t('footer.description')}
        </p>

        <div
          className={cn(
            'grid gap-x-4 gap-y-6 md:col-span-2 md:items-start',
            'md:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[360px_minmax(0,1fr)_auto]'
          )}
        >
          <FooterSocials />
          <FooterNavigation />

          <div className='md:col-start-2 md:row-start-1 lg:col-start-3'>
            <FooterContact />
          </div>
        </div>
      </div>

      <div className='mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-secondary pt-5'>
        <FooterLinks />
        <FooterCredit />
      </div>

      <FooterDetails />
    </footer>
  )
}
