import { routes } from '@/config/routes'
import type { INavigationGroup, IPageLink } from '@/interfaces/navigation'

export const sitePages = [
  { href: routes.projects, title: 'Все проекты' },
  { href: routes.pricing, title: 'Прайс-лист' },
  { href: routes.about, title: 'Подробнее обо мне' },
  { href: routes.rewards, title: 'Вознаграждения' },
  { href: routes.blog, title: 'Блог' }
] as const satisfies readonly IPageLink[]

export const footerNavigation = [
  { title: 'Страницы', links: sitePages.map(page => ({ label: page.title, href: page.href })) }
] as const satisfies readonly INavigationGroup[]
