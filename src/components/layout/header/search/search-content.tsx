import { useMemo, useState } from 'react'

import { Link } from 'react-router-dom'

import { ArrowUpRight } from 'lucide-react'

import { informationPages, searchTags, sitePages } from '@/data'

import { useI18n } from '@/hooks/providers/use-i18n'
import { useSearchScrollShadows } from '@/hooks/scroll/use-search-scroll-shadows'

import { cn } from '@/lib/utils'

import { headerLinks } from '../header-links'

import { SearchInput } from './search-input'
import { SearchScrollList } from './search-scroll-list'
import { SearchSidebar } from './search-sidebar'

export function SearchContent({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n()

  const [query, setQuery] = useState('')

  const scrollRef = useSearchScrollShadows(open, query)
  const entries = useMemo(
    () => [
      ...sitePages.map(page => ({ href: page.href, title: t(page.title) })),
      ...informationPages.map(page => ({ href: page.href, title: t(page.title) })),
      ...headerLinks.map(page => ({ href: page.href, title: t(page.label) })),
      { href: '/projects', title: t('projects.aromaForge') },
      ...searchTags.map(tag => ({ href: '/#stack', title: tag }))
    ],
    [t]
  )

  const results = entries.filter(entry =>
    entry.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  )

  return (
    <div
      ref={scrollRef}
      inert={!open}
      className={cn(
        'header-search-content absolute inset-x-0 top-21.5 bottom-0 overflow-hidden',
        'overscroll-contain p-4 sm:p-6 lg:top-25.5 invisible -translate-y-6 opacity-0',
        'transition-[opacity,translate,visibility] pointer-events-none',
        'duration-[250ms,450ms,450ms] ease-[ease] motion-reduce:transition-none',
        'group-data-[search-open=true]/header:delay-[180ms,0ms,0ms]',
        'group-data-[search-open=true]/header:visible group-data-[search-open=true]/header:translate-y-0',
        'group-data-[search-open=true]/header:opacity-100 group-data-[search-open=true]/header:pointer-events-auto'
      )}
    >
      <div
        className={cn(
          'search-layout mx-auto grid h-full min-h-0 max-w-250 grid-cols-1 gap-5',
          'grid-rows-[minmax(0,1fr)_minmax(0,0.6fr)]',
          'sm:grid-cols-[minmax(0,1fr)_240px] sm:grid-rows-[minmax(0,1fr)] sm:gap-6'
        )}
      >
        <section className='search-main flex min-h-0 min-w-0 flex-col overflow-hidden'>
          <h2 className='search-heading mb-3 shrink-0 text-lg leading-6 font-semibold'>
            {t('search.title')}
          </h2>
          <SearchInput query={query} onChange={setQuery} onClose={onClose} />

          <p className='search-caption mt-5 mb-2.5 shrink-0 text-[13px] text-muted-foreground'>
            {query ? t('search.results') : t('pages.title')}
          </p>

          <SearchScrollList className='search-results grid auto-rows-min content-start gap-1.5'>
            {results.map(entry => (
              <Link
                className={cn(
                  'flex items-center justify-between gap-4 rounded-[16px] bg-secondary p-4',
                  'transition-colors duration-150 hover:text-primary',
                  'hover:bg-[color-mix(in_srgb,var(--primary)_10%,var(--secondary))]'
                )}
                key={entry.href + entry.title}
                to={entry.href}
                onClick={onClose}
              >
                <span>{entry.title}</span>
                <ArrowUpRight className='size-4' />
              </Link>
            ))}

            {!results.length && (
              <p className='text-sm leading-[1.6] text-muted-foreground'>{t('search.empty')}</p>
            )}
          </SearchScrollList>
        </section>

        <SearchSidebar onTag={setQuery} />
      </div>
    </div>
  )
}
