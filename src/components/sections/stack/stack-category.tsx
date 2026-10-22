import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useHorizontalScroll } from '@/hooks/use-horizontal-scroll'

import type { IStackCategory } from '@/interfaces/stack'

import { cn } from '@/lib/utils'

import { StackCard } from './stack-card'

interface IStackCategoryProps {
  category: IStackCategory
}

export function StackCategory({ category }: IStackCategoryProps) {
  const { dragging, canScrollLeft, canScrollRight, scrollBy, scrollProps } =
    useHorizontalScroll<HTMLUListElement>()

  const overflow = canScrollLeft || canScrollRight

  return (
    <div className='mt-8'>
      <div className='mb-4 flex flex-wrap items-center gap-x-3 gap-y-2'>
        <h3 className='font-artegra text-[18px] font-semibold'>{category.title}</h3>
        <p className='font-artegra-extended text-[12px] font-bold italic text-text-dim'>
          // {category.description}
        </p>
        {overflow && (
          <div className='ml-auto flex items-center gap-2'>
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
          </div>
        )}
      </div>
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
          {category.technologies.map(technology => (
            <StackCard key={technology.name} technology={technology} />
          ))}
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
