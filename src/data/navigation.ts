import { routes } from '@/config/routes'
import type { INavigationGroup, IPageLink } from '@/interfaces/navigation'

export const sitePages = [
  { href: routes.projects, title: 'projects.all' },
  { href: routes.pricing, title: 'pages.pricing' },
  { href: routes.about, title: 'pages.about' },
  { href: routes.rewards, title: 'pages.rewards' },
  { href: routes.blog, title: 'pages.blog' }
] as const satisfies readonly IPageLink[]

export const footerNavigation = [
  { title: 'pages.title', links: sitePages.map(page => ({ label: page.title, href: page.href })) }
] as const satisfies readonly INavigationGroup[]
