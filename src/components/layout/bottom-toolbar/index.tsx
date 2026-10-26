import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { ToolbarSettings } from './toolbar-settings'
import { ToolbarMusic } from './toolbar-icons'

export function BottomToolbar() {
  return (
    <div
      className={cn(
        'pointer-events-none fixed bottom-6 left-1/2 z-40 flex h-12 -translate-x-1/2',
        'w-[calc(100%-2rem)] max-w-275',
        'items-end justify-between'
      )}
    >
      <ToolbarSettings />
      <Button
        variant='ghost'
        size='icon'
        className={cn(
          'pointer-events-auto size-12 rounded-[16px] bg-surface-subtle-overlay text-foreground',
          'backdrop-blur-[12.3px]'
        )}
      >
        <ToolbarMusic />
      </Button>
    </div>
  )
}
