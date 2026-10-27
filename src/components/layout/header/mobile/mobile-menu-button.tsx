import type { Ref } from 'react'

import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

interface IMobileMenuButtonProps {
  open: boolean
  search: boolean
  onClick: () => void
  ref?: Ref<HTMLButtonElement>
}

export function MobileMenuButton({ open, search, onClick, ref }: IMobileMenuButtonProps) {
  const Icon = open ? X : Menu

  return (
    <Button
      ref={ref}
      type='button'
      variant='secondary'
      onClick={onClick}
      className={cn(
        'h-12 min-h-12 w-12 shrink-0 border-0 bg-surface-subtle-overlay bg-clip-border p-0',
        'hover:bg-secondary [&_svg]:size-5  text-white',
        'transition-[border-radius] duration-450 ease-[ease] motion-reduce:transition-none',
        search && !open ? 'rounded-[16px]' : 'rounded-l-[8px] rounded-r-[16px]'
      )}
    >
      <Icon strokeWidth={3} />
    </Button>
  )
}
