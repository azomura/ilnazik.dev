import { TabsList, TabsTrigger } from '@/components/ui'

import { projectCategories } from '@/data/projects'

export function ProjectFilters() {
  return (
    <TabsList>
      {projectCategories.map(category => (
        <TabsTrigger key={category} value={category}>
          {category}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
