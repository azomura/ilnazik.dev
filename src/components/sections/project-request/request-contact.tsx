import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { Input, SelectOptions } from '@/components/ui'

import { contactMethods } from '@/data/contact-methods'

import { useI18n } from '@/hooks/providers/use-i18n'

import { cn } from '@/lib/utils'

import type { ProjectRequestValues } from '@/validations/project-request'

import { RequestField } from './request-field'

export function RequestContact() {
  const { t } = useI18n()
  const { register, control } = useFormContext<ProjectRequestValues>()

  const method = useWatch({ control, name: 'contactMethod' })
  const options = contactMethods.map(value => ({
    value,
    label: value === 'email' ? t('projectRequest.email') : value
  }))

  return (
    <RequestField name='contact' label={t('projectRequest.contact')}>
      <div className='flex min-w-0 gap-2'>
        <Controller
          name='contactMethod'
          control={control}
          render={({ field }) => (
            <SelectOptions
              value={field.value}
              onValueChange={field.onChange}
              options={options}
              ref={field.ref}
              onBlur={field.onBlur}
              className='h-8.75 w-29 shrink-0 justify-between px-3'
            />
          )}
        />

        <Input
          {...register('contact')}
          type={method === 'email' ? 'email' : 'text'}
          autoComplete={method === 'email' ? 'email' : 'off'}
          placeholder={method === 'email' ? 'name@example.com' : t('projectRequest.username')}
          maxLength={190}
          className={cn(
            'h-8.75 flex-1 rounded-[11px] bg-secondary px-3.5 py-0 font-nt-somic',
            'text-base leading-normal sm:text-[13px] md:text-[13px]'
          )}
        />
      </div>
    </RequestField>
  )
}
