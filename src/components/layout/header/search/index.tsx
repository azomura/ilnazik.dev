import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

export function HeaderSearch({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type='button'
      onClick={onClick}
      variant='secondary'
      className={cn(
        'header-search-trigger h-12 min-h-12 w-12 shrink-0 rounded-[8px] border-0 bg-muted/70 bg-clip-border p-0',
        'text-muted-foreground hover:text-foreground',
        'transition-[width,margin,opacity] duration-[450ms,450ms,150ms] ease-[ease] motion-reduce:transition-none',
        'group-data-[search-open=true]/header:w-0 group-data-[search-open=true]/header:min-w-0',
        'group-data-[search-open=true]/header:-mx-[3px] group-data-[search-open=true]/header:opacity-0',
        'group-data-[search-open=true]/header:pointer-events-none group-data-[search-open=true]/header:overflow-hidden',
        'group-data-[search-morph=active]/header:invisible'
      )}
    >
      <Search className='size-4' strokeWidth={3} />
    </Button>
  )
}
