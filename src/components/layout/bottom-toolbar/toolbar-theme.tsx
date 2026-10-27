import { Sun } from 'lucide-react'

import { Moon } from '@/components/icons'
import { Button } from '@/components/ui/button'

import { useThemeTransition } from '@/hooks/providers'

export function ToolbarTheme() {
  const { effectiveTheme, toggleTheme } = useThemeTransition()

  return (
    <Button
      variant='ghost'
      size='icon-sm'
      onClick={event => {
        void toggleTheme(event.currentTarget)
      }}
      className='h-9 min-w-9 basis-9 grow rounded-[10px]'
    >
      {effectiveTheme === 'dark' ? <Moon /> : <Sun className='size-4' />}
    </Button>
  )
}
