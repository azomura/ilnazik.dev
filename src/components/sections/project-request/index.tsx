import { useI18n } from '@/hooks/providers/use-i18n'

import { QueryProvider } from '@/providers/query.provider'

import { Section } from '../section'
import { SectionHeading } from '../section-heading'

import { RequestForm } from './request-form'

export function ProjectRequest() {
  const { t } = useI18n()

  return (
    <Section id='orders'>
      <SectionHeading label={t('projectRequest.label')}>{t('projectRequest.title')}</SectionHeading>
      <QueryProvider>
        <RequestForm />
      </QueryProvider>
    </Section>
  )
}
