import { useHeaderMenu } from '@/hooks/navigation/use-header-menu'

import { cn } from '@/lib/utils'

import { HeaderLogin } from '../header-login'
import { HeaderSearch } from '../search'

import { MobileBrand } from './mobile-brand'
import { MobileMenu } from './mobile-menu'
import { MobileMenuButton } from './mobile-menu-button'

export function HeaderMobile() {
  const { open, close, toggle, headerRef, toggleRef, menuId } = useHeaderMenu()

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-4 left-1/2 z-50 -translate-x-1/2',
        'max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-275',
        'overflow-y-auto rounded-[20px] bg-card/70 p-1.5 backdrop-blur-[12.3px] sm:hidden'
      )}
    >
      <div className='flex h-12 items-center gap-1'>
        <MobileBrand />
        <div className='ml-auto flex h-12 shrink-0 [&_button]:rounded-l-[16px] [&_button]:rounded-r-[8px]'>
          <HeaderSearch />
        </div>
        <div
          className={cn(
            'flex h-12 shrink-0 overflow-hidden transition-[width,opacity,transform] duration-300',
            'ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
            '[&_button]:w-[85.51px] [&_button]:rounded-l-[8px] [&_button]:rounded-r-[8px]',
            open ? 'w-[85.51px] translate-x-0 opacity-100' : '-ml-1 w-0 translate-x-6 opacity-0'
          )}
        >
          <HeaderLogin />
        </div>
        <MobileMenuButton ref={toggleRef} open={open} onClick={toggle} />
      </div>
      <MobileMenu id={menuId} open={open} onClose={close} />
    </header>
  )
}
