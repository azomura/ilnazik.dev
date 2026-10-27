import { useState } from 'react'

import { useHeaderSearch } from '@/hooks/navigation/use-header-search'

import { animateHeaderSearch } from '@/lib/animate-header-search'
import { cn } from '@/lib/utils'

import { HeaderSearch } from './search'
import { SearchContent } from './search/search-content'

import { HeaderBrand } from './header-brand'
import { HeaderLogin } from './header-login'
import { HeaderNav } from './header-nav'

import { HeaderMobile } from './mobile'

export function Header() {
  const [search, setSearch] = useState(false)

  const toggleSearch = (next: boolean) => {
    animateHeaderSearch(next)
    setSearch(next)
  }

  const closeSearch = () => toggleSearch(false)

  useHeaderSearch(search, closeSearch)

  return (
    <>
      <div
        className={cn(
          'pointer-events-none fixed inset-x-0 top-0 z-40 h-36 sm:h-52',
          'bg-linear-to-b from-background/95 to-background/0 to-85%'
        )}
      />

      <HeaderMobile
        search={search}
        onSearch={() => toggleSearch(true)}
        onCloseSearch={closeSearch}
      />

      <header
        data-search-open={search}
        className={cn(
          'site-header group/header fixed top-4 lg:top-8 left-1/2 z-50 -translate-x-1/2',
          'hidden sm:flex h-15 w-212 max-w-[calc(100%-2rem)] xl:max-w-[calc(100%-4rem)]',
          'rounded-[20px] bg-card/70 backdrop-blur-[12.3px] items-start gap-1.5 p-1.5',
          '[interpolate-size:allow-keywords] transition-[width,height,top,max-width,border-radius,background-color]',
          'duration-[450ms,450ms,450ms,450ms,450ms,300ms] ease-[ease] motion-reduce:transition-none',
          'data-[search-open=true]:top-0 data-[search-open=true]:w-full data-[search-open=true]:max-w-none',
          'data-[search-open=true]:h-dvh data-[search-open=true]:max-h-dvh',
          'data-[search-open=true]:rounded-none data-[search-open=true]:bg-card/90 data-[search-open=true]:overflow-hidden',
          search && 'header-search-expanded'
        )}
      >
        <div
          className={cn(
            'header-topbar mx-auto flex h-12 w-[min(836px,calc(100vw-44px))] shrink-0 items-center gap-1.5',
            'transition-[margin-top] duration-450 ease-[ease] motion-reduce:transition-none',
            'group-data-[search-open=true]/header:relative group-data-[search-open=true]/header:z-1',
            'group-data-[search-open=true]/header:mt-4 lg:group-data-[search-open=true]/header:mt-8'
          )}
        >
          <HeaderBrand />
          <HeaderNav />
          <HeaderSearch onClick={() => toggleSearch(true)} />
          <HeaderLogin />
        </div>

        <SearchContent open={search} onClose={closeSearch} />
      </header>
    </>
  )
}
