import type { Ref } from 'react'

import { useScrollbarDrag, useScrollbarVisibility } from '@/hooks'

import { cn } from '@/lib/utils'

interface IScrollbarProps {
  trackRef: Ref<HTMLDivElement>
  visible: boolean
  enabled: boolean
  onRelease: () => void
}

export function Scrollbar({ trackRef, visible, enabled, onRelease }: IScrollbarProps) {
  const { phase, close, edgeProps, onTransitionEnd } = useScrollbarVisibility(visible)
  const { dragging, dragProps } = useScrollbarDrag(() => {
    close()
    onRelease()
  })
  const open = visible || dragging || phase === 'edge-open'
  const mode = !visible && !dragging && phase !== 'scroll' ? 'edge' : 'scroll'
  const opaque = enabled && (open || (mode === 'edge' && phase === 'edge-closing'))

  return (
    <div
      {...edgeProps}
      className={cn(
        'group/scroll fixed inset-y-0 right-0 z-60 flex w-4 items-center justify-center',
        !enabled && 'pointer-events-none invisible'
      )}
    >
      <div
        onTransitionEnd={onTransitionEnd}
        data-mode={mode}
        data-open={open}
        data-opaque={opaque}
        className={cn(
          'flex h-[50dvh] max-h-120 w-full items-stretch justify-center opacity-0',
          'transition-opacity duration-300 ease-out motion-reduce:transition-none',
          'data-[opaque=true]:opacity-100 data-[open=false]:delay-500',
          'data-[mode=edge]:transition-[translate]',
          'data-[mode=edge]:data-[open=false]:translate-x-full',
          'data-[mode=edge]:data-[open=true]:animate-in',
          'data-[mode=edge]:data-[open=true]:slide-in-from-right-4',
          'motion-reduce:animate-none'
        )}
      >
        <div
          {...dragProps}
          ref={trackRef}
          className='relative w-2 touch-none cursor-pointer rounded-full bg-card/50 dark:bg-secondary/80'
        >
          <button
            className={cn(
              'absolute inset-x-0 top-0 h-(--scroll-thumb-size) rounded-full',
              'translate-y-(--scroll-thumb-offset) bg-muted-foreground/60',
              'transition-colors duration-200 hover:bg-primary',
              dragging ? 'cursor-grabbing bg-primary' : 'cursor-grab'
            )}
            onKeyDown={event => {
              const steps: Record<string, number> = {
                ArrowDown: 80,
                ArrowUp: -80,
                PageDown: window.innerHeight * 0.8,
                PageUp: -window.innerHeight * 0.8
              }

              const step = steps[event.key]
              if (step === undefined) return

              event.preventDefault()
              window.scrollBy({ top: step, behavior: 'instant' })
            }}
          />
        </div>
      </div>
    </div>
  )
}
