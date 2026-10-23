import { stackCategories } from '@/data/stack'

import { Section } from '../section'
import { SectionHeading } from '../section-heading'

import { StackCategory } from './stack-category'

export function Stack() {
  return (
    <Section id='stack'>
      <SectionHeading label='стек'>Мой стек по категориям</SectionHeading>
      {stackCategories.map((category, index) => (
        <StackCategory key={`${category.title}-${index}`} category={category} />
      ))}
    </Section>
  )
}
