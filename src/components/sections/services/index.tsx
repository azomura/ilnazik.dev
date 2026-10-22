import { services } from '@/data/services'

import { SectionHeading } from '../section-heading'

import { ServiceCard } from './service-card'

export function Services() {
  return (
    <section
      id='services'
      className='mx-auto w-[calc(100%-2rem)] max-w-275 scroll-mt-28 py-16 lg:scroll-mt-36 lg:py-20'
    >
      <SectionHeading label='услуги'>Мои услуги</SectionHeading>
      <ul className='mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} position={index + 1} />
        ))}
      </ul>
    </section>
  )
}
