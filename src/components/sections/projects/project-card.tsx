import { useI18n } from '@/hooks/providers/use-i18n'

import { ArrowUpRight } from 'lucide-react'

import { IphoneFrame } from '@/components/icons/iphone-frame'

import type { IProject } from '@/interfaces/sections/project'

import { cn } from '@/lib/utils'

import { ProjectTags } from './project-tags'

interface IProjectCardProps {
  project: IProject
}

export function ProjectCard({ project }: IProjectCardProps) {
  const { t } = useI18n()

  return (
    <li className='relative min-w-0 hover:z-10'>
      <article
        className={cn(
          'group relative cursor-pointer origin-bottom transition-transform duration-500 ease-out',
          'hover:scale-105 motion-reduce:transition-none'
        )}
      >
        <div
          className={cn(
            'aspect-360/582 w-full overflow-hidden rounded-b-[26px]',
            'mask-b-from-55% mask-b-to-85%'
          )}
        >
          <div className='relative aspect-360/726 w-full'>
            {project.screenshot && (
              <img
                src={project.screenshot}
                alt=''
                loading='lazy'
                className={cn(
                  'object-cover object-top',
                  'absolute top-[2.34%] left-[5.56%] h-[95.32%] w-[88.88%]',
                  'rounded-[15%/7%]'
                )}
              />
            )}

            <IphoneFrame size='100%' className='relative block h-auto w-full' />
          </div>
        </div>

        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 h-[65%] rounded-[26px]',
            'dark:h-[77.49%]',
            'bg-project-overlay',
            'transition-opacity duration-500 ease-out group-hover:opacity-80',
            'motion-reduce:transition-none'
          )}
        />

        {(project.logo || project.outlineLogo) && (
          <div className='pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]'>
            {project.outlineLogo && (
              <img
                src={project.outlineLogo}
                data-image-skeleton='false'
                alt=''
                className='absolute inset-0 size-full'
              />
            )}
            {project.logo && (
              <img
                src={project.logo}
                data-image-skeleton='false'
                alt=''
                className='absolute inset-0 size-full'
              />
            )}
          </div>
        )}
        <div className='absolute inset-x-0 bottom-0 flex flex-col px-5 pt-1 pb-5'>
          <p className='font-artegra-extended text-[12px] font-semibold italic text-primary'>
            {project.platform}
          </p>

          <h3 className='mt-2 font-artegra-alt text-[18px] font-bold leading-6'>{t(project.title)}</h3>

          <div className='mt-auto flex items-center gap-3 pt-3'>
            <ProjectTags tags={project.tags} />
            <ArrowUpRight className='size-5 shrink-0 text-muted-foreground/40' />
          </div>
        </div>
      </article>
    </li>
  )
}
