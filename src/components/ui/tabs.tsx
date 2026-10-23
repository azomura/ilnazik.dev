import type { ComponentProps } from 'react'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'

import { useTabsHeight } from '@/hooks/use-tabs-height'
import { cn } from '@/lib/utils'

interface ITabsListProps extends Omit<ComponentProps<typeof TabsPrimitive.List>, 'className'> {
  className?: string
}

interface ITabsTabProps extends Omit<ComponentProps<typeof TabsPrimitive.Tab>, 'className'> {
  className?: string
}

interface ITabsPanelProps extends Omit<ComponentProps<typeof TabsPrimitive.Panel>, 'className'> {
  className?: string
}

export function TabsViewport({ className, children, style, ...props }: ComponentProps<'div'>) {
  const { ref, height } = useTabsHeight()

  return (
    <div
      {...props}
      ref={ref}
      style={{ ...style, height }}
      className={cn(
        'grid transition-[height] duration-600 ease-in-out motion-reduce:transition-none',
        '*:col-start-1 *:row-start-1 *:self-start',
        className
      )}
    >
      {children}
    </div>
  )
}

export function TabsList({ className, children, ...props }: ITabsListProps) {
  return (
    <TabsPrimitive.List
      {...props}
      className={cn(
        'relative isolate flex w-fit items-center rounded-[16px] bg-card p-0.75',
        'data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        className
      )}
    >
      <TabsPrimitive.Indicator
        className={cn(
          'pointer-events-none absolute top-0 left-0 -z-10 rounded-[13px] bg-secondary',
          'h-(--active-tab-height) w-(--active-tab-width)',
          'translate-x-(--active-tab-left) translate-y-(--active-tab-top)',
          'transition-[translate,width,height] duration-200 ease-out',
          'motion-reduce:transition-none'
        )}
      />
      {children}
    </TabsPrimitive.List>
  )
}

export function TabsTrigger({ className, ...props }: ITabsTabProps) {
  return (
    <TabsPrimitive.Tab
      {...props}
      className={cn(
        'flex h-7 shrink-0 cursor-pointer items-center justify-center rounded-[13px] px-2.5',
        'font-artegra font-normal text-[12px] text-muted-foreground transition-colors duration-200',
        'hover:text-foreground data-active:text-foreground',
        'focus-visible:outline-2 focus-visible:outline-ring',
        'disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none',
        className
      )}
    />
  )
}

export function TabsContent({ className, ...props }: ITabsPanelProps) {
  return (
    <TabsPrimitive.Panel
      {...props}
      className={cn(
        'min-w-0 outline-none transition-[opacity,translate] duration-600 ease-in-out',
        '[--tabs-slide-distance:calc((100vw+100%)/2+2rem)]',
        'data-starting-style:opacity-0',
        'data-ending-style:pointer-events-none',
        'data-[activation-direction=right]:data-starting-style:translate-x-(--tabs-slide-distance)',
        'data-[activation-direction=right]:data-ending-style:-translate-x-(--tabs-slide-distance)',
        'data-[activation-direction=left]:data-starting-style:-translate-x-(--tabs-slide-distance)',
        'data-[activation-direction=left]:data-ending-style:translate-x-(--tabs-slide-distance)',
        'motion-reduce:translate-none motion-reduce:transition-none',
        className
      )}
    />
  )
}

export const Tabs = TabsPrimitive.Root
