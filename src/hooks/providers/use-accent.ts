import { useContext } from 'react'

import { AccentContext } from '@/providers/accent'

export function useAccent() {
  const context = useContext(AccentContext)
  if (!context) throw new Error('useAccent must be used within AccentProvider')
  return context
}
