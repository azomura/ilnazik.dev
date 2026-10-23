import { ArrowUpRight } from 'lucide-react'

import { Link } from 'react-router-dom'

import { Button, Tabs, TabsContent, TabsViewport } from '@/components/ui'

import { routes } from '@/config/routes'

import { projectCategories, projects } from '@/data/projects'

import { Section } from '../section'
import { SectionHeading } from '../section-heading'

import { ProjectCard } from './project-card'
import { ProjectFilters } from './project-filters'

interface IProjectsProps {
  catalog?: boolean
}

export function Projects({ catalog = false }: IProjectsProps) {
  return (
    <Section id='projects'>
      <Tabs defaultValue='Mini-apps'>
        <SectionHeading
          label='проекты'
          showDot={false}
          actions={
            <div className='flex flex-wrap items-center gap-2'>
              <ProjectFilters />

              {!catalog && (
                <Button
                  render={<Link to={routes.projects} />}
                  nativeButton={false}
                  variant='secondary'
                  className='h-8.5 gap-2 rounded-[16px] bg-card px-3 font-artegra font-normal text-[13px]'
                >
                  Все проекты <ArrowUpRight className='size-3.5' />
                </Button>
              )}
            </div>
          }
        >
          {catalog ? 'Все проекты' : 'Недавние проекты'}
        </SectionHeading>

        <TabsViewport className='mt-6'>
          {projectCategories.map(category => {
            const filtered = projects.filter(project => project.category === category)
            const visibleProjects = catalog ? filtered : filtered.slice(0, 3)

            return (
              <TabsContent key={category} value={category}>
                {visibleProjects.length ? (
                  <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                    {visibleProjects.map((project, index) => (
                      <ProjectCard key={`${project.id}-${index}`} project={project} />
                    ))}
                  </ul>
                ) : (
                  <p className='rounded-[26px] bg-card p-6 font-nt-somic text-muted-foreground'>
                    Проекты в этой категории скоро появятся.
                  </p>
                )}
              </TabsContent>
            )
          })}
        </TabsViewport>
      </Tabs>
    </Section>
  )
}
