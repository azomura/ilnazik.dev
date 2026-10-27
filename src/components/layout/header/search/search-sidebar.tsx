import { Button } from '@/components/ui/button'

import { searchTags } from '@/data/search'

import { useI18n } from '@/hooks/providers/use-i18n'

import { SearchScrollList } from './search-scroll-list'

export function SearchSidebar({ onTag }: { onTag: (tag: string) => void }) {
  const { t } = useI18n()

  return (
    <aside className='search-aside flex min-h-0 flex-col overflow-hidden sm:pt-9'>
      <p className='mb-2.5 shrink-0 text-[13px] text-muted-foreground'>{t('search.tags')}</p>

      <div className='search-tags flex shrink-0 flex-wrap gap-2'>
        {searchTags.map(tag => (
          <Button variant='secondary'
            className='h-auto rounded-xl px-3 py-2 font-normal hover:text-primary'
            type='button'
            key={tag}
            onClick={() => onTag(tag)}
          >
            #{tag}
          </Button>
        ))}
      </div>

      <p className='mt-5 mb-2.5 shrink-0 text-[13px] text-muted-foreground'>{t('search.recent')}</p>

      <SearchScrollList className='search-recent-list'>
        <p className='text-sm leading-[1.6] text-muted-foreground'>{t('search.noPosts')}</p>
      </SearchScrollList>
    </aside>
  )
}
