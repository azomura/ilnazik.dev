import { useI18n } from '@/hooks/providers/use-i18n'

import { routes } from '@/config/routes'

import { services } from '@/data/services'

import { Section } from '../section'
import { SectionHeading } from '../section-heading'
import { SectionMoreLink } from '../section-more-link'

import { ServiceCard } from './service-card'

export function Services() {
  const { t } = useI18n()

  return (
    <Section id='services'>
      <SectionHeading
        label={t('services.label')}
        showDot={false}
        actions={<SectionMoreLink to={routes.pricing} />}
        actionsClassName='max-sm:ml-0'
      >
        {t('services.title')}
      </SectionHeading>
      <ul className='mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} position={index + 1} />
        ))}
      </ul>
    </Section>
  )
}
