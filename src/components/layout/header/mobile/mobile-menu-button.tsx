import type { Ref } from 'react'

import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

interface IMobileMenuButtonProps {
  open: boolean
  onClick: () => void
  ref?: Ref<HTMLButtonElement>
}

export function MobileMenuButton({ open, onClick, ref }: IMobileMenuButtonProps) {
  const Icon = open ? X : Menu

  return (
    <Button
      ref={ref}
      type='button'
      variant='secondary'
      onClick={onClick}
      className={cn(
        'size-12 shrink-0 bg-surface-subtle-overlay p-0 text-white',
        'backdrop-blur-[10.3px] hover:bg-secondary[& _svg]:size-5',
        open ? 'rounded-l-[8px] rounded-r-[16px]' : 'rounded-[16px]'
      )}
    >
      <Icon strokeWidth={3} />
    </Button>
  )
}
