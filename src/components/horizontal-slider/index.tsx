import type { ReactNode } from 'react'

import { useHorizontalScroll } from '@/hooks/scroll/use-horizontal-scroll'

import { cn } from '@/lib/utils'

import { SliderControls } from './slider-controls'

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
    <SliderControls
      actions={actions}
      className={actionsClassName}
      hidden={actionsHidden}
      canScrollLeft={canScrollLeft}
      canScrollRight={canScrollRight}
      scrollBy={scrollBy}
    />
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

        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 w-12',
            'bg-linear-to-r from-background to-transparent',
            'transition-opacity ease-out motion-reduce:transition-none',
            canScrollLeft ? 'opacity-100 duration-0' : 'opacity-0 duration-500'
          )}
        />

        <div
          className={cn(
            'pointer-events-none absolute inset-y-0 right-0 w-12',
            'bg-linear-to-l from-background to-transparent',
            'transition-opacity ease-out motion-reduce:transition-none',
            canScrollRight ? 'opacity-100 duration-0' : 'opacity-0 duration-500'
          )}
        />
      </div>
    </div>
  )
}
