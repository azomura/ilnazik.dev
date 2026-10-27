import type { Ref } from 'react'

import { cn } from '@/lib/utils'

import { HeaderLogin } from '../header-login'
import { HeaderSearch } from '../search'

import { MobileBrand } from './mobile-brand'
import { MobileMenuButton } from './mobile-menu-button'

interface IMobileControlsProps {
  open: boolean
  search: boolean
  toggleRef: Ref<HTMLButtonElement>
  onSearch: () => void
  onToggle: () => void
}

export function MobileControls({
  open,
  search,
  toggleRef,
  onSearch,
  onToggle
}: IMobileControlsProps) {
  return (
    <div
      className={cn(
        'header-topbar absolute top-5.5 left-5.5 z-1 flex h-12 w-[calc(100%-44px)]',
        'items-center gap-1.5 pointer-events-auto'
      )}
    >
      <MobileBrand />

      <div className='ml-auto flex h-12 shrink-0 [&_button]:rounded-l-[16px] [&_button]:rounded-r-[8px]'>
        <HeaderSearch onClick={onSearch} />
      </div>

      <div
        className={cn(
          'mobile-header-login flex h-12 shrink-0 overflow-hidden transition-[width,opacity,transform] duration-300',
          'ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
          '[&_button]:w-[85.51px] [&_button]:rounded-r-[8px]',
          '[&_button]:transition-[border-radius] [&_button]:duration-450 [&_button]:ease-[ease]',
          search ? '[&_button]:rounded-l-[16px]' : '[&_button]:rounded-l-[8px]',
          open ? 'w-[85.51px] translate-x-0 opacity-100' : '-ml-1 w-0 translate-x-6 opacity-0'
        )}
      >
        <HeaderLogin />
      </div>

      <MobileMenuButton ref={toggleRef} open={open} search={search} onClick={onToggle} />
    </div>
  )
}
