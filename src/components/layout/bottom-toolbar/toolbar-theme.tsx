import { Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useThemeTransition } from '@/hooks/providers/use-theme-transition'

import { ToolbarMoon } from './toolbar-icons'

export function ToolbarTheme() {
  const { effectiveTheme, toggleTheme } = useThemeTransition()

  return (
    <Button
      variant='ghost'
      size='icon-sm'
      onClick={event => { void toggleTheme(event.currentTarget) }}
      className='h-9 min-w-9 basis-9 grow rounded-[10px]'
    >
      {effectiveTheme === 'dark' ? <ToolbarMoon /> : <Sun className='size-4' />}
    </Button>
  )
}
