import { routes } from '@/config/routes'

import type { IPageLink } from '@/interfaces/navigation'

export const informationPages = [
  { href: routes.legal.privacy, title: "legal.privacy" },
  { href: routes.legal.terms, title: "legal.terms" },
  { href: routes.customers.cooperation, title: "legal.cooperation" },
  { href: routes.customers.payment, title: "legal.payment" },
  { href: routes.customers.support, title: "legal.support" }
] as const satisfies readonly IPageLink[]
