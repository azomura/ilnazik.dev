import { routes } from '@/config/routes'
import type { IHeaderLink } from '@/interfaces/header'

export const headerLinks: readonly IHeaderLink[] = [
  { label: 'Обо мне', href: routes.home.about },
  { label: 'Стек', href: routes.home.stack },
  { label: 'Услуги', href: routes.home.services },
  { label: 'Проекты', href: routes.home.projects },
  { label: 'Заказы', href: routes.home.orders },
  { label: 'Отзывы', href: routes.home.reviews }
]
