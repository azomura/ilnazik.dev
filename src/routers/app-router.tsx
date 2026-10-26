import { useRoutes } from 'react-router-dom'

import { useRouteScroll } from '@/hooks/navigation/use-route-scroll'

import { appRoutes } from './app-routes'

export function AppRouter() {
  useRouteScroll()
  return useRoutes(appRoutes)
}
