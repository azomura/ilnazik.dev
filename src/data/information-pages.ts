import { routes } from '@/config/routes'
import type { IPageLink } from '@/interfaces/navigation'

export const informationPages = [
  { href: routes.legal.privacy, title: 'Политика конфиденциальности' },
  { href: routes.legal.terms, title: 'Условия использования' },
  { href: routes.customers.cooperation, title: 'Порядок работы' },
  { href: routes.customers.payment, title: 'Оплата и возврат' },
  { href: routes.customers.support, title: 'Поддержка после запуска' }
] as const satisfies readonly IPageLink[]
