import type { ReactNode } from 'react'

import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

interface ISliderControlsProps {
  actions?: ReactNode
  className?: string
  hidden: boolean
  canScrollLeft: boolean
  canScrollRight: boolean
  scrollBy: (direction: number) => void
}

export function SliderControls({
  actions,
  className,
  hidden,
  canScrollLeft,
  canScrollRight,
  scrollBy
}: ISliderControlsProps) {
  const overflow = canScrollLeft || canScrollRight

  return (
    <div className='ml-auto flex items-center gap-2'>
      {actions && (
        <div
          inert={hidden}
          className={cn(
            'flex h-8.5 shrink-0 overflow-hidden *:shrink-0',
            'transition-[max-width,opacity,transform] duration-300',
            'ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
            hidden
              ? 'pointer-events-none max-w-0 translate-x-6 opacity-0'
              : 'max-w-36 translate-x-0 opacity-100',
            className
          )}
        >
          {actions}
        </div>
      )}

      {overflow && (
        <div className='flex h-8.5 items-center gap-0.5 rounded-[16px] bg-card p-0.75'>
          <Button
            variant='secondary'
            size='icon-sm'
            disabled={!canScrollLeft}
            onClick={() => scrollBy(-1)}
            className='size-7 rounded-[13px] bg-transparent hover:bg-secondary'
          >
            <ArrowLeft className='size-3.5' />
          </Button>
          <Button
            variant='secondary'
            size='icon-sm'
            disabled={!canScrollRight}
            onClick={() => scrollBy(1)}
            className='size-7 rounded-[13px] bg-transparent hover:bg-secondary'
          >
            <ArrowRight className='size-3.5' />
          </Button>
        </div>
      )}
    </div>
  )
}
