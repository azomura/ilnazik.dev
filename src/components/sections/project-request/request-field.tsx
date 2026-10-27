import type { ReactNode } from 'react'

import { useFormContext } from 'react-hook-form'

import { useI18n } from '@/hooks/providers/use-i18n'

import type { ProjectRequestValues } from '@/validations/project-request'

interface IRequestFieldProps {
  name: keyof ProjectRequestValues
  label: string
  children: ReactNode
}

export function RequestField({ name, label, children }: IRequestFieldProps) {
  const { t } = useI18n()
  const {
    formState: { errors }
  } = useFormContext<ProjectRequestValues>()

  const error = errors[name]
  const errorKey = error?.message === 'email' ? 'emailError' : `${name}Error`

  return (
    <label className='flex min-w-0 flex-col gap-1.5 font-nt-somic text-[13px] leading-normal'>
      <span className='text-foreground'>{label}</span>
      {children}
      {error && <span className='text-destructive'>{t(`projectRequest.${errorKey}`)}</span>}
    </label>
  )
}
