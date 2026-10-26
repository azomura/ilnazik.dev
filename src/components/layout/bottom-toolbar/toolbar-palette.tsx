import { Button } from '@/components/ui/button'

import { accentColors } from '@/config/appearance'

import { useAccent } from '@/hooks/providers/use-accent'

import { cn } from '@/lib/utils'

import { ToolbarPalette } from './toolbar-icons'

interface IToolbarPaletteControlProps {
  open: boolean
  onToggle: () => void
}

export function ToolbarPaletteControl({ open, onToggle }: IToolbarPaletteControlProps) {
  const { accent: selected, setAccent } = useAccent()

  return (
    <div
      className={cn(
        'flex min-w-0 basis-auto items-center transition-[flex-grow] duration-300 ease-out',
        'motion-reduce:transition-none',
        open ? 'grow-0' : 'grow'
      )}
    >
      <Button
        variant='ghost'
        size='icon-sm'
        onClick={onToggle}
        className={cn('h-9 min-w-9 flex-1 rounded-[10px]', open && 'bg-secondary text-primary')}
      >
        <ToolbarPalette />
      </Button>

      <div
        inert={!open}
        className={cn(
          'overflow-hidden transition-[width,margin,opacity,translate] duration-300 ease-out',
          'motion-reduce:transition-none',
          open
            ? 'ml-2 w-[min(9rem,calc(100vw-13.5rem))] translate-x-0 opacity-100'
            : 'pointer-events-none ml-0 w-0 -translate-x-2 opacity-0'
        )}
      >
        <div className='flex items-center gap-2 overflow-x-auto px-1 py-1.5'>
          {accentColors.map(color => (
            <button
              key={color}
              onClick={() => setAccent(color)}
              style={{ backgroundColor: color }}
              className={cn(
                'size-5 shrink-0 cursor-pointer rounded-full transition-[scale,box-shadow]',
                'duration-200 hover:scale-110 motion-reduce:transition-none',
                selected === color && 'ring-2 ring-foreground/80 ring-offset-2 ring-offset-popover'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
