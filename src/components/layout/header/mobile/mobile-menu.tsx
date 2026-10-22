import { cn } from '@/lib/utils'

import { MobileNav } from './mobile-nav'

interface IMobileMenuProps {
  id: string
  open: boolean
  onClose: () => void
}

export function MobileMenu({ id, open, onClose }: IMobileMenuProps) {
  return (
    <div
      id={id}
      className={cn(
        'grid transition-[grid-template-rows,opacity] duration-300',
        'ease-[cubic-bezier(0.22, 1, 0.36, 1)] motion-reduce:transition-none',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      )}
    >
      <div className='min-h-0 overflow-hidden'>
        <div className='pt-1.5'>
          <MobileNav onNavigate={onClose} />
        </div>
      </div>
    </div>
  )
}
