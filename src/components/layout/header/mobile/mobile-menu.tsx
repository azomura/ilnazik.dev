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
        'mobile-header-menu grid transition-[grid-template-rows,opacity] duration-300',
        'absolute inset-x-5.5 top-17.5 max-h-[calc(100dvh-92px)] overflow-y-auto pointer-events-none',
        'group-data-[menu-open=true]/header:pointer-events-auto',
        'group-data-[search-open=true]/header:hidden group-data-[search-morph=active]/header:invisible',
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
