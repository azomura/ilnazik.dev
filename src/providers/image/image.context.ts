import { createContext } from 'react'

export const ImageContext = createContext<((image: HTMLImageElement) => Promise<void>) | null>(null)
