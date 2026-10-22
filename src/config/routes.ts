import { createSectionRoutes } from '@/lib/create-section-routes'

const main = '/'
const home_sections = ['about', 'stack', 'services', 'projects', 'orders', 'reviews'] as const

export const routes = {
  home: {
    main,
    ...createSectionRoutes(main, home_sections)
  }
} as const
