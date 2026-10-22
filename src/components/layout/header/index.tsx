import { cn } from '@/lib/utils'

import { HeaderBrand } from './header-brand'
import { HeaderLogin } from './header-login'
import { HeaderNav } from './header-nav'
import { HeaderSearch } from './search'

import { HeaderMobile } from './mobile'

export function Header() {
  return (
    <>
      <HeaderMobile />
      <header
        className={cn(
          'fixed top-4 lg:top-8 left-1/2 z-50 -translate-x-1/2',
          'hidden sm:flex h-15 w-212 max-w-[calc(100%-2rem)] xl:max-w-[calc(100%-4rem)]',
          'rounded-[20px] bg-card/70 backdrop-blur-[12.3px] items-center gap-1.5 p-1.5'
        )}
      >
        <HeaderBrand />
        <HeaderNav />
        <HeaderSearch />
        <HeaderLogin />
      </header>
    </>
  )
}
