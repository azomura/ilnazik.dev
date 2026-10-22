import { stackCategories } from '@/data/stack'

import { SectionHeading } from '../section-heading'

import { StackCategory } from './stack-category'

export function Stack() {
  return (
    <section
      id='stack'
      className='mx-auto w-[calc(100%-2rem)] max-w-275 scroll-mt-28 py-16 lg:scroll-mt-36 lg:py-20'
    >
      <SectionHeading label='стек'>Мой стек по категориям</SectionHeading>
      {stackCategories.map(category => (
        <StackCategory key={category.title} category={category} />
      ))}
    </section>
  )
}
