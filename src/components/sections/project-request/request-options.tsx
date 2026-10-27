import { Controller, useFormContext } from 'react-hook-form'

import type { ProjectRequestValues } from '@/validations/project-request'

import { Input, SelectOptions } from '@/components/ui'

import { useI18n } from '@/hooks/providers/use-i18n'

import { cn } from '@/lib/utils'

import { RequestDesignHelp } from './request-design-help'
import { RequestField } from './request-field'

export function RequestOptions() {
  const { t } = useI18n()
  const { register, control } = useFormContext<ProjectRequestValues>()

  const options = [
    { value: 'yes', label: t('projectRequest.yes') },
    { value: 'no', label: t('projectRequest.no') }
  ]

  return (
    <div className='grid w-full min-w-0 grid-cols-2 items-end gap-2 sm:flex sm:w-auto'>
      <RequestField name='budget' label={t('projectRequest.budget')}>
        <Input
          {...register('budget')}
          type='number'
          inputMode='decimal'
          min={0}
          max={1000000000}
          step='0.01'
          placeholder={t('projectRequest.budgetPlaceholder')}
          className={cn(
            'h-9.75 w-full rounded-[11px] bg-secondary px-3.5 text-base sm:w-40',
            'py-0 font-nt-somic leading-normal sm:text-[13px] md:text-[13px]',
            '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none'
          )}
        />
      </RequestField>

      <div className='flex min-w-0 flex-col gap-1.5'>
        <div className='flex items-center gap-1.5 font-nt-somic text-[13px] leading-normal'>
          <span>{t('projectRequest.design')}</span>
          <RequestDesignHelp />
        </div>

        <Controller
          name='hasDesign'
          control={control}
          render={({ field }) => (
            <SelectOptions
              value={field.value ? 'yes' : 'no'}
              onValueChange={value => field.onChange(value === 'yes')}
              options={options}
              className='w-full justify-between sm:w-auto'
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />
      </div>
    </div>
  )
}
