import type { RouteObject } from 'react-router-dom'

import { routes } from '@/config/routes'

import { MainLayout, SimpleLayout } from './layouts'

import { HomePage, NotFoundPage } from './pages'

export const appRoutes: RouteObject[] = [
  {
    path: routes.home.main,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  },
  {
    path: routes.home.main,
    element: <SimpleLayout />,
    children: []
  }
]
