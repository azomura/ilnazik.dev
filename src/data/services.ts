import type { IService } from '@/interfaces/sections/service'

export const services: readonly IService[] = [
  {
    id: 'frontend',
    category: 'frontend',
    title: "services.frontend",
    description: "services.frontendDescription",
    priceFrom: 90000,
    duration: "services.weeks"
  },
  {
    id: 'backend',
    category: 'backend',
    title: "services.backend",
    description: "services.backendDescription",
    priceFrom: 90000,
    duration: "services.weeks"
  },
  {
    id: 'mobile',
    category: 'mobile',
    title: "services.mobile",
    description: "services.appDescription",
    priceFrom: 90000,
    duration: "services.weeks"
  },
  {
    id: 'desktop',
    category: 'desktop',
    title: "services.desktop",
    description: "services.appDescription",
    priceFrom: 90000,
    duration: "services.weeks"
  },
  {
    id: 'chatbots',
    category: 'chatbots',
    title: "services.bots",
    description: "services.botsDescription",
    priceFrom: 90000,
    duration: "services.weeks"
  },
  {
    id: 'mini-apps',
    category: 'mini-apps',
    title: "services.miniApps",
    description: "services.miniAppsDescription",
    priceFrom: 90000,
    duration: "services.weeks"
  }
]
