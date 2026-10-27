import { ChevronDown } from 'lucide-react'

import { Select as SelectPrimitive } from '@base-ui/react/select'

import { cn } from '@/lib/utils'

import { Button } from './button'

const Select = SelectPrimitive.Root
const SelectValue = SelectPrimitive.Value

function SelectTrigger({ className, children, ...props }: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      render={<Button variant='secondary' />}
      className={cn(
        'h-9.75 gap-1.5 rounded-[11px] px-4 font-nt-somic text-[13px] leading-normal',
        'font-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown className='size-3' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({ className, children, ...props }: SelectPrimitive.Popup.Props) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        sideOffset={6}
        align='start'
        alignItemWithTrigger={false}
        className='z-80 outline-none'
      >
        <SelectPrimitive.Popup
          className={cn(
            'min-w-(--anchor-width) rounded-[11px] bg-popover p-1 text-popover-foreground',
            'shadow-lg outline-none transition-[opacity,scale] duration-150',
            'data-starting-style:scale-95 data-starting-style:opacity-0',
            'data-ending-style:scale-95 data-ending-style:opacity-0',
            'motion-reduce:transition-none',
            className
          )}
          {...props}
        >
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'cursor-pointer rounded-lg px-3 py-2 text-[13px] outline-none transition-colors',
        'data-highlighted:bg-primary/10 data-highlighted:text-primary data-selected:text-primary',
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
