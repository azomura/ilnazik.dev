import { services } from '@/data/services'

import { Section } from '../section'
import { SectionHeading } from '../section-heading'

import { ServiceCard } from './service-card'

export function Services() {
  return (
    <Section id='services'>
      <SectionHeading label='услуги'>Мои услуги</SectionHeading>
      <ul className='mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} position={index + 1} />
        ))}
      </ul>
    </Section>
  )
}
