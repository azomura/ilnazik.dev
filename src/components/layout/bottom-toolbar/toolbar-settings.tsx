import { useState } from 'react'

import { Languages } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useI18n } from '@/hooks/providers/use-i18n'

import { cn } from '@/lib/utils'

import { ToolbarLanguages } from './toolbar-languages'
import { ToolbarPaletteControl } from './toolbar-palette'
import { ToolbarTheme } from './toolbar-theme'

export function ToolbarSettings() {
  const [panel, setPanel] = useState<'language' | 'palette' | null>(null)

  const open = panel === 'language'

  const { lang: language, setLanguage } = useI18n()

  return (
    <div
      className={cn(
        'toolbar-settings pointer-events-auto flex shrink-0 flex-col overflow-hidden',
        'bg-surface-subtle-overlay text-foreground backdrop-blur-[6px] sm:backdrop-blur-[12.3px]',
        'contain-[layout_paint] transition-[width] duration-300 ease-out',
        'motion-reduce:transition-none rounded-[16px] p-1.5',
        open ? 'w-44' : panel === 'palette' ? 'w-[calc(8rem+min(9rem,100vw-13.5rem))]' : 'w-30'
      )}
    >
      <div
        inert={!open}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
          'motion-reduce:transition-none',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <ToolbarLanguages
          value={language}
          onSelect={code => {
            setLanguage(code)
            setPanel(null)
          }}
        />
      </div>
      <div className='flex h-9 w-full items-center'>
        <ToolbarTheme />

        <Button
          variant='ghost'
          size='icon-sm'
          onClick={() => setPanel(previous => (previous === 'language' ? null : 'language'))}
          className={cn(
            'h-9 min-w-9 basis-9 grow rounded-[10px]',
            open && 'bg-secondary text-primary'
          )}
        >
          <Languages className='size-4' />
        </Button>

        <ToolbarPaletteControl
          open={panel === 'palette'}
          onToggle={() => setPanel(previous => (previous === 'palette' ? null : 'palette'))}
        />
      </div>
    </div>
  )
}
