import { createSectionRoutes } from '@/lib/create-section-routes'

const main = '/'
const home_sections = ['about', 'stack', 'services', 'projects', 'orders', 'reviews'] as const

export const routes = {
  home: {
    main,
    ...createSectionRoutes(main, home_sections)
  },

  projects: '/projects',
  pricing: '/pricing',
  about: '/about',
  rewards: '/rewards',
  blog: '/blog',

  legal: {
    privacy: '/privacy',
    terms: '/terms'
  },

  customers: {
    cooperation: '/cooperation',
    payment: '/payment',
    support: '/support'
  }
} as const
