import type { CSSProperties } from 'react'

import { useHeaderMenu } from '@/hooks/navigation/use-header-menu'

import { cn } from '@/lib/utils'

import { headerLinks } from '../header-links'
import { SearchContent } from '../search/search-content'

import { MobileControls } from './mobile-controls'
import { MobileMenu } from './mobile-menu'

interface IHeaderMobileProps {
  search: boolean
  onSearch: () => void
  onCloseSearch: () => void
}

export function HeaderMobile({ search, onSearch, onCloseSearch }: IHeaderMobileProps) {
  const { open, close, toggle, headerRef, toggleRef, menuId } = useHeaderMenu()

  return (
    <header
      ref={headerRef}
      data-menu-open={open}
      data-search-open={search}
      style={{ '--mobile-nav-count': headerLinks.length } as CSSProperties}
      className={cn(
        'site-header mobile-header group/header fixed inset-0 z-50 h-dvh w-full overflow-hidden sm:hidden',
        'pointer-events-none data-[search-open=true]:pointer-events-auto',
        'before:absolute before:inset-0 before:content-[\'\'] before:bg-card/70 before:backdrop-blur-[6px]',
        'before:[--mobile-header-height:60px]',
        'before:[clip-path:inset(16px_16px_max(16px,calc(100%-16px-var(--mobile-header-height)))_round_20px)]',
        'before:transition-[clip-path,background-color] before:duration-[450ms,300ms] before:ease-[ease]',
        'data-[menu-open=true]:before:[--mobile-header-height:calc(var(--mobile-nav-count)*52px+62px)]',
        'data-[search-open=true]:before:[clip-path:inset(0_round_0px)] data-[search-open=true]:before:bg-card/90',
        'motion-reduce:before:transition-none',
        search && 'header-search-expanded'
      )}
    >
      <MobileControls open={open} search={search} toggleRef={toggleRef} onSearch={onSearch} onToggle={toggle} />

      <MobileMenu id={menuId} open={open} onClose={close} />
      <SearchContent open={search} onClose={onCloseSearch} />
    </header>
  )
}
