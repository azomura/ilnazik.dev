import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function HeaderSearch() {
  return (
    <Button
      type='button'
      variant='secondary'
      aria-label='Поиск'
      className='h-12 min-h-12 w-12 shrink-0 rounded-[8px] border-0 bg-muted/70 bg-clip-border p-0 text-muted-foreground hover:text-foreground'
    >
      <Search className='size-4' strokeWidth={3} aria-hidden='true' />
    </Button>
  )
}
