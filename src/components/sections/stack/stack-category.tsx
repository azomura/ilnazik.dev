import { useI18n } from '@/hooks/providers/use-i18n'

import { HorizontalSlider } from '@/components/horizontal-slider'

import type { IStackCategory } from '@/interfaces/sections/stack'

import { StackCard } from './stack-card'

interface IStackCategoryProps {
  category: IStackCategory
}

export function StackCategory({ category }: IStackCategoryProps) {
  const { t } = useI18n()

  return (
    <HorizontalSlider
      className='mt-8'
      header={
        <>
          <h3 className='font-artegra text-[18px] font-semibold'>{category.title}</h3>
          <p className='font-artegra-extended text-[12px] font-bold italic text-text-dim'>
            // {t(category.description)}
          </p>
        </>
      }
    >
      {category.technologies.map((technology, index) => (
        <StackCard key={`${technology.name}-${index}`} technology={technology} />
      ))}
    </HorizontalSlider>
  )
}
