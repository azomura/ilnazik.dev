import { routes } from '@/config/routes'

import type { IHeaderLink } from '@/interfaces/navigation/header'

export const headerLinks: readonly IHeaderLink[] = [
  { label: "nav.about", href: routes.home.about },
  { label: "nav.stack", href: routes.home.stack },
  { label: "nav.services", href: routes.home.services },
  { label: "nav.projects", href: routes.home.projects },
  { label: "nav.orders", href: routes.home.orders },
  { label: "nav.reviews", href: routes.home.reviews }
]
