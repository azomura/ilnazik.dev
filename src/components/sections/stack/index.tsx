import { useI18n } from '@/hooks/providers/use-i18n'

import { routes } from '@/config/routes'

import { stackCategories } from '@/data/stack'

import { Section } from '../section'
import { SectionHeading } from '../section-heading'
import { SectionMoreLink } from '../section-more-link'

import { StackCategory } from './stack-category'

export function Stack() {
  const { t } = useI18n()

  return (
    <Section id='stack'>
      <SectionHeading
        label={t('stack.label')}
        showDot={false}
        actions={<SectionMoreLink to={routes.stack} />}
        actionsClassName='max-sm:ml-0'
      >
        {t('stack.title')}
      </SectionHeading>
      {stackCategories.map((category, index) => (
        <StackCategory key={`${category.title}-${index}`} category={category} />
      ))}
    </Section>
  )
}
