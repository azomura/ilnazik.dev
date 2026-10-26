import { useI18n } from '@/hooks/providers/use-i18n'

import { ArrowUpRight } from 'lucide-react'

import { Link } from 'react-router-dom'

import { Button, Tabs, TabsContent, TabsViewport } from '@/components/ui'

import { routes } from '@/config/routes'

import { recentProjectGroups } from '@/data/projects'

import { Section } from '../section'
import { SectionHeading } from '../section-heading'

import { ProjectCard } from './project-card'
import { ProjectFilters } from './project-filters'

export function Projects() {
  const { t } = useI18n()

  return (
    <Section id='projects'>
      <Tabs defaultValue='Mini-apps'>
        <SectionHeading
          label={t('projects.label')}
          showDot={false}
          className='max-sm:[&_h2]:flex-1 max-sm:[&_h2]:text-[20px]'
          actionsClassName='max-sm:contents'
          actions={
            <div className='contents sm:flex sm:flex-wrap sm:items-center sm:gap-2'>
              <ProjectFilters />

              <Button
                render={<Link to={routes.projects} />}
                nativeButton={false}
                variant='secondary'
                className='h-8.5 gap-2 rounded-[16px] bg-card px-3 font-artegra font-normal text-[13px]'
              >
                {t('projects.all')}<ArrowUpRight className='size-3.5' />
              </Button>
            </div>
          }
        >
          {t('projects.title')}
        </SectionHeading>

        <TabsViewport className='mt-6'>
          {recentProjectGroups.map(({ category, projects }) => (
            <TabsContent key={category} value={category}>
              {projects.length ? (
                <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                  {projects.map((project, index) => (
                    <ProjectCard key={`${project.id}-${index}`} project={project} />
                  ))}
                </ul>
              ) : (
                <p className='rounded-[26px] bg-card p-6 font-nt-somic text-muted-foreground'>
                  {t('projects.empty')}
                </p>
              )}
            </TabsContent>
          ))}
        </TabsViewport>
      </Tabs>
    </Section>
  )
}
