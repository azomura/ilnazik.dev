import { lazy } from 'react'

export const HomePage = lazy(() =>
  import('./home-page').then(module => ({ default: module.HomePage }))
)

export const NotFoundPage = lazy(() =>
  import('./errors/not-found-page').then(module => ({ default: module.NotFoundPage }))
)
