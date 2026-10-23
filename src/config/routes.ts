import { createSectionRoutes } from '@/lib/create-section-routes'

const main = '/'
const homeSections = ['about', 'stack', 'services', 'projects', 'orders', 'reviews'] as const

export const routes = {
  home: {
    main,
    ...createSectionRoutes(main, homeSections)
  },

  projects: '/projects',
  reviews: '/reviews',
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
