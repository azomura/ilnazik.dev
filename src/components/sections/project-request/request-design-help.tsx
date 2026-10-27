import { useState } from 'react'

import { CircleHelp } from 'lucide-react'

import { Button, PreviewCard } from '@/components/ui'

import { useI18n } from '@/hooks/providers/use-i18n'

import { cn } from '@/lib/utils'

export function RequestDesignHelp() {
  const { t } = useI18n()

  const [open, setOpen] = useState(false)

  return (
    <PreviewCard.Root open={open} onOpenChange={setOpen}>
      <PreviewCard.Trigger
        delay={200}
        render={<Button type='button' variant='ghost' size='icon' />}
        onClick={() => setOpen(value => !value)}
        className='size-4 p-0 text-muted-foreground hover:text-primary'
        aria-label={t('projectRequest.designHelpTitle')}
      >
        <CircleHelp className='size-3.5' />
      </PreviewCard.Trigger>

      <PreviewCard.Content>
        <div
          className={cn(
            'w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-secondary',
            'bg-card p-4 font-nt-somic text-sm leading-relaxed text-foreground shadow-lg'
          )}
        >
          <p className='mb-2 font-medium'>{t('projectRequest.designHelpTitle')}</p>
          <p className='text-muted-foreground'>{t('projectRequest.designHelp')}</p>
        </div>
      </PreviewCard.Content>
    </PreviewCard.Root>
  )
}
