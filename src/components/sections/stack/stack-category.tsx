import { HorizontalSlider } from '@/components/horizontal-slider'

import type { IStackCategory } from '@/interfaces/stack'

import { StackCard } from './stack-card'

interface IStackCategoryProps {
  category: IStackCategory
}

export function StackCategory({ category }: IStackCategoryProps) {
  return (
    <HorizontalSlider
      className='mt-8'
      header={
        <>
          <h3 className='font-artegra text-[18px] font-semibold'>{category.title}</h3>
          <p className='font-artegra-extended text-[12px] font-bold italic text-text-dim'>
            // {category.description}
          </p>
        </>
      }
    >
      {category.technologies.map(technology => (
        <StackCard key={technology.name} technology={technology} />
      ))}
    </HorizontalSlider>
  )
}
