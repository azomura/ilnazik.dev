import { useFormContext } from 'react-hook-form'

import type { ProjectRequestValues } from '@/validations/project-request'

import { Input, Textarea } from '@/components/ui'

import { useI18n } from '@/hooks/providers/use-i18n'

import { cn } from '@/lib/utils'

import { RequestContact } from './request-contact'
import { RequestField } from './request-field'

const inputClass = cn(
  'h-8.75 rounded-[11px] bg-secondary px-3.5 py-0 font-nt-somic',
  'text-base leading-normal sm:text-[13px] md:text-[13px]'
)

export function RequestFields() {
  const { t } = useI18n()
  const { register } = useFormContext<ProjectRequestValues>()

  return (
    <>
      <RequestField name='name' label={t('projectRequest.name')}>
        <Input
          {...register('name')}
          autoComplete='name'
          placeholder={t('projectRequest.namePlaceholder')}
          maxLength={80}
          className={inputClass}
        />
      </RequestField>

      <RequestContact />

      <RequestField name='description' label={t('projectRequest.description')}>
        <Textarea
          {...register('description')}
          placeholder={t('projectRequest.descriptionPlaceholder')}
          maxLength={2500}
          className={cn(
            'h-24.5 min-h-24.5 resize-y field-sizing-fixed rounded-[11px] bg-secondary',
            'px-3.5 py-2.5 font-nt-somic text-base leading-normal',
            'sm:text-[13px] md:text-[13px]'
          )}
        />
      </RequestField>
    </>
  )
}
