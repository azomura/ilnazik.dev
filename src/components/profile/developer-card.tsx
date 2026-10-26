import { useI18n } from '@/hooks/providers/use-i18n'

import { ArrowUpRight } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'

import { developerProfile } from '@/config/profile'

import { socialLinks } from '@/data/socials'

import { cn } from '@/lib/utils'

export function DeveloperCard() {
  const { t } = useI18n()

  return (
    <div
      className={cn(
        'w-80 max-w-[calc(100vw-2rem)] rounded-[20px] bg-card p-1.5 text-card-foreground',
        'border border-border/50 shadow-lg'
      )}
    >
      <div className='flex items-center gap-3 rounded-[14px] bg-muted/70 p-3'>
        <Avatar className='size-12 rounded-[16px] after:rounded-[inherit]'>
          <AvatarImage
            src={developerProfile.avatar}
            alt=''
            width={48}
            height={48}
            loading='eager'
            decoding='async'
            fetchPriority='low'
            referrerPolicy='no-referrer'
            className='size-12 rounded-[16px] object-cover'
          />
          <AvatarFallback className='rounded-[16px]'>{t('profile.initials')}</AvatarFallback>
        </Avatar>
        <div className='min-w-0'>
          <p className='font-artegra text-[14px] font-semibold leading-5'>
            {t(developerProfile.name)}
          </p>

          <p className='mt-1 font-nt-somic text-[12px] leading-4 text-muted-foreground'>
            @{developerProfile.nickname}
          </p>
        </div>
      </div>
      <div className='px-3 pt-3 pb-2'>
        <p className='font-artegra text-[13px] font-semibold leading-5'>{t(developerProfile.role)}</p>

        {developerProfile.description && (
          <p className='mt-1.5 font-nt-somic text-[12px] leading-5 text-muted-foreground'>
            {t(developerProfile.description)}
          </p>
        )}

        <ul className='mt-2 flex flex-wrap gap-1.5'>
          {developerProfile.skills.map(skill => (
            <li
              key={skill}
              className='rounded-full bg-muted/70 px-2 py-1 font-nt-somic text-[11px] leading-4 text-muted-foreground'
            >
              {skill}
            </li>
          ))}
        </ul>

        <ul className='mt-3 flex flex-wrap gap-1.5 border-t border-secondary pt-3'>
          {socialLinks.map(social => (
            <li key={t(social.label)}>
              <a
                href={social.href || undefined}
                target='_blank'
                rel='noopener noreferrer'
                className={cn(
                  'min-h-8 items-center gap-1 rounded-full border border-secondary px-2',
                  'font-nt-somic text-[12px] leading-4 text-muted-foreground transition-colors',
                  'hover:bg-secondary/80 hover:text-foreground focus-visible:outline-2',
                  'inline-flex focus-visible:outline-ring'
                )}
              >
                {t(social.label)}
                {social.href && <ArrowUpRight className='size-3 shrink-0' />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
