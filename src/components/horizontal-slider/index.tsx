import type { ReactNode } from 'react'

import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useHorizontalScroll } from '@/hooks/use-horizontal-scroll'

import { cn } from '@/lib/utils'

interface IHorizontalSliderProps {
  children: ReactNode
  renderHeader?: (controls: ReactNode) => ReactNode
  header?: ReactNode
  actions?: ReactNode
  actionsClassName?: string
  hideActionsAtEnd?: boolean
  className?: string
}

export function HorizontalSlider({
  children,
  header,
  renderHeader,
  actions,
  actionsClassName,
  className,
  hideActionsAtEnd = false
}: IHorizontalSliderProps) {
  const { dragging, canScrollLeft, canScrollRight, endVisible, scrollBy, scrollProps } =
    useHorizontalScroll<HTMLUListElement>(hideActionsAtEnd)

  const overflow = canScrollLeft || canScrollRight
  const actionsHidden = hideActionsAtEnd && (endVisible || !canScrollRight)

  const controls = (actions || overflow) && (
    <div className='ml-auto flex items-center gap-2'>
      {actions && (
        <div
          inert={actionsHidden}
          className={cn(
            'flex h-8 shrink-0 overflow-hidden *:w-36',
            'transition-[width,opacity,transform] duration-300',
            'ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
            actionsHidden
              ? 'pointer-events-none w-0 translate-x-6 opacity-0'
              : 'w-36 translate-x-0 opacity-100',
            actionsClassName
          )}
        >
          {actions}
        </div>
      )}
      {overflow && (
        <>
          <Button
            variant='secondary'
            size='icon-sm'
            title='Прокрутить влево'
            disabled={!canScrollLeft}
            onClick={() => scrollBy(-1)}
            className='rounded-[8px]'
          >
            <ArrowLeft className='size-4' />
          </Button>
          <Button
            variant='secondary'
            size='icon-sm'
            title='Прокрутить вправо'
            disabled={!canScrollRight}
            onClick={() => scrollBy(1)}
            className='rounded-[8px]'
          >
            <ArrowRight className='size-4' />
          </Button>
        </>
      )}
    </div>
  )

  return (
    <div className={className}>
      {renderHeader
        ? renderHeader(controls)
        : (header || actions || overflow) && (
            <div className='mb-4 flex flex-wrap items-center gap-x-3 gap-y-2'>
              {header}
              {controls}
            </div>
          )}
      <div className='relative'>
        <ul
          {...scrollProps}
          tabIndex={0}
          onDragStart={event => event.preventDefault()}
          className={cn(
            'flex gap-3 overflow-x-auto overscroll-x-contain pb-3 select-none',
            dragging ? 'cursor-grabbing' : 'cursor-grab'
          )}
        >
          {children}
        </ul>

        {canScrollLeft && (
          <div className='pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-background to-transparent' />
        )}

        {canScrollRight && (
          <div className='pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-background to-transparent' />
        )}
      </div>
    </div>
  )
}
