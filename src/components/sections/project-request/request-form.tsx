import { FormProvider } from 'react-hook-form'

import { Telegram } from '@/components/icons/telegram'
import { Button, Spinner } from '@/components/ui'

import { useProjectRequest } from '@/hooks/forms/use-project-request'
import { useI18n } from '@/hooks/providers/use-i18n'

import { cn } from '@/lib/utils'

import { RequestFields } from './request-fields'
import { RequestOptions } from './request-options'

export function RequestForm() {
  const { t } = useI18n()
  const { form, submit, telegram, message, pending, failed } = useProjectRequest()

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={submit} className='mt-10 rounded-[26px] bg-card p-5'>
        <fieldset disabled={pending} className='flex min-w-0 flex-col gap-4'>
          <RequestFields />

          <div className='flex flex-wrap items-end justify-between gap-4'>
            <RequestOptions />

            <div className='ml-auto flex w-full flex-wrap gap-2 sm:w-auto'>
              <Button
                type='button'
                variant='secondary'
                onClick={telegram}
                className={cn(
                  'h-9.75 rounded-[11px] px-4 font-nt-somic text-[13px]',
                  'min-h-9.75 min-w-0 whitespace-nowrap leading-normal font-normal max-sm:flex-auto',
                  'max-sm:px-2 max-sm:py-2'
                )}
              >
                {t('projectRequest.telegram')}
                <Telegram className='h-2 w-2.5 shrink-0' />
              </Button>

              <Button
                type='submit'
                className={cn(
                  'h-9.75 rounded-[11px] px-4 font-nt-somic text-[13px]',
                  'min-h-9.75 min-w-0 whitespace-nowrap leading-normal font-normal max-sm:flex-auto',
                  'max-sm:px-2 max-sm:py-2'
                )}
              >
                {pending && <Spinner />}
                {t(pending ? 'projectRequest.sending' : 'projectRequest.submit')}
              </Button>
            </div>
          </div>
        </fieldset>

        {message && (
          <p className={cn('mt-4 text-sm', failed ? 'text-destructive' : 'text-primary')}>
            {message}
          </p>
        )}
      </form>
    </FormProvider>
  )
}
