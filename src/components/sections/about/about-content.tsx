import { useI18n } from '@/hooks/providers/use-i18n'

import { developerProfile } from '@/config/profile'
import { routes } from '@/config/routes'

import { HeroSpecializations } from '../hero/hero-specializations'

import { SectionHeading } from '../section-heading'
import { SectionMoreLink } from '../section-more-link'

import { AboutStatistics } from './about-statistics'

export function AboutContent() {
  const { t } = useI18n()

  return (
    <div className='min-w-0'>
      <SectionHeading label={t('about.label')} showDot={false}>
        <span data-preview='developer' tabIndex={0} className='cursor-pointer'>
          {t(developerProfile.name)}
        </span>
      </SectionHeading>

      <p className='mt-4 max-w-145 font-artegra text-[16px] font-normal leading-6 text-muted-foreground'>
        {t('about.description')}
      </p>

      <div className='mt-4'>
        <SectionMoreLink to={routes.about} />
      </div>

      <HeroSpecializations />
      <AboutStatistics />
    </div>
  )
}
