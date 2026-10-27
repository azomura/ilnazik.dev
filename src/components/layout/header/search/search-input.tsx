import { Search, X } from 'lucide-react'

import { Button, Input } from '@/components/ui'

import { useI18n } from '@/hooks/providers/use-i18n'

import { cn } from '@/lib/utils'

interface ISearchInputProps {
  query: string
  onChange: (value: string) => void
  onClose: () => void
}

export function SearchInput({ query, onChange, onClose }: ISearchInputProps) {
  const { t } = useI18n()

  return (
    <div className='search-input-row flex shrink-0 items-center gap-2'>
      <div
        className={cn(
          'search-field flex min-w-0 flex-1 items-center gap-3 rounded-[16px] bg-secondary pl-4',
          'group-data-[search-morph=active]/header:opacity-0'
        )}
      >
        <Search className='size-5 shrink-0 text-primary' />

        <Input
          className={cn(
            'header-search-input h-12 rounded-[16px] bg-transparent pr-3 pl-0',
            'text-base md:text-base'
          )}
          placeholder={t('search.placeholder')}
          value={query}
          onChange={event => onChange(event.target.value)}
        />
      </div>

      <Button
        className='search-close size-12 shrink-0 rounded-[16px]'
        type='button'
        variant='secondary'
        size='icon'
        onClick={onClose}
      >
        <X />
      </Button>
    </div>
  )
}
