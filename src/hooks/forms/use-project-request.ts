import { useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { toast } from 'sonner'

import { zodResolver } from '@hookform/resolvers/zod'

import { useI18n } from '@/hooks/providers/use-i18n'

import { ApiError } from '@/services/api/client/api.errors'
import { useCreateProjectRequest } from '@/services/api/hooks/project-requests.hooks'

import { projectRequestTelegramUrl } from '@/lib/project-request'

import { useProjectRequestStore } from '@/stores/forms/project-request.store'

import type { ProjectRequestValues } from '@/validations/project-request'
import { projectRequestSchema } from '@/validations/project-request'

export function useProjectRequest() {
  const { t } = useI18n()

  const request = useCreateProjectRequest()

  const form = useForm({
    resolver: zodResolver(projectRequestSchema),
    defaultValues: useProjectRequestStore.getState().draft,
    mode: 'onTouched'
  })

  const { subscribe } = form

  useEffect(() => {
    const subscription = subscribe({
      formState: { values: true },
      callback: ({ values }) => useProjectRequestStore.getState().save(values)
    })

    return subscription
  }, [subscribe])

  const payload = (values: ProjectRequestValues) => {
    const { contactMethod, contact, budget, ...data } = values

    return {
      ...data,
      contact: `${contactMethod}: ${contact}`,
      budget: budget.trim() ? Number(budget) : null
    }
  }

  const submit = form.handleSubmit(values => {
    if (request.isPending) return

    request.mutate(payload(values), {
      onSuccess: () =>
        toast.success(t('projectRequest.success'), {
          description: t('projectRequest.responseTime')
        })
    })
  })

  const telegram = () => {
    const url = projectRequestTelegramUrl(payload(form.getValues()), t)

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  let message = ''
  if (request.isError) message = t('projectRequest.error')
  if (request.error instanceof ApiError && request.error.status === 429) {
    message = t('projectRequest.rateLimit')
  }

  return { form, submit, telegram, message, pending: request.isPending, failed: request.isError }
}
