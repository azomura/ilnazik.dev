import { useI18n } from '@/hooks/providers/use-i18n'

import { TabsList, TabsTrigger } from '@/components/ui'

import { projectCategories } from '@/data/projects'

const categoryLabels = {
  'Mini-apps': 'projectCategories.miniApps',
  Web: 'projectCategories.web',
  Desktop: 'projectCategories.desktop',
  Mobile: 'projectCategories.mobile'
} as const

export function ProjectFilters() {
  const { t } = useI18n()

  return (
    <TabsList className='rounded-full max-sm:order-last max-sm:w-full [&>span]:rounded-full'>
      {projectCategories.map(category => (
        <TabsTrigger
          key={category}
          value={category}
          className='rounded-full max-sm:h-8.5 max-sm:flex-1'
        >
          {t(categoryLabels[category])}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
