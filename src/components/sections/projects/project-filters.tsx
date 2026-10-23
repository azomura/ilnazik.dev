import { TabsList, TabsTrigger } from '@/components/ui'

import { projectCategories } from '@/data/projects'

export function ProjectFilters() {
  return (
    <TabsList className='rounded-full max-sm:order-last max-sm:w-full [&>span]:rounded-full'>
      {projectCategories.map(category => (
        <TabsTrigger
          key={category}
          value={category}
          className='rounded-full max-sm:h-8.5 max-sm:flex-1'
        >
          {category}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
