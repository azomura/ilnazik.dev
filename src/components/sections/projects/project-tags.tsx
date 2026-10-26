import { useHorizontalScroll } from '@/hooks/scroll/use-horizontal-scroll'

import { cn } from '@/lib/utils'

interface IProjectTagsProps {
  tags: readonly string[]
}

export function ProjectTags({ tags }: IProjectTagsProps) {
  const { dragging, canScrollLeft, canScrollRight, scrollProps } =
    useHorizontalScroll<HTMLUListElement>()

  return (
    <div className='relative min-w-0 flex-1'>
      <ul
        {...scrollProps}
        tabIndex={0}
        className={cn(
          'flex gap-1.5 overflow-x-auto overscroll-x-contain select-none',
          'scrollbar-none [&::-webkit-scrollbar]:hidden',
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
      >
        {tags.map((tag, index) => (
          <li
            key={`${tag}-${index}`}
            className='shrink-0 rounded-[16px] bg-secondary px-3 py-2 font-artegra font-normal text-[13px]'
          >
            {tag}
          </li>
        ))}
      </ul>

      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 left-0 z-10 w-16',
          'bg-linear-to-r from-card from-25% via-card/90 via-55% to-transparent',
          'transition-opacity ease-out motion-reduce:transition-none',
          canScrollLeft ? 'opacity-100 duration-0' : 'opacity-0 duration-500'
        )}
      />

      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 right-0 z-10 w-16',
          'bg-linear-to-l from-card from-25% via-card/90 via-55% to-transparent',
          'transition-opacity ease-out motion-reduce:transition-none',
          canScrollRight ? 'opacity-100 duration-0' : 'opacity-0 duration-500'
        )}
      />
    </div>
  )
}
