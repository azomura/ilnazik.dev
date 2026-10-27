import { Slider as Primitive } from '@base-ui/react/slider'

import { cn } from '@/lib/utils'

export function Slider({ className, ...props }: Primitive.Root.Props) {
  return (
    <Primitive.Root className={cn('group/slider w-full touch-none', className)} {...props}>
      <Primitive.Control className='flex h-5 w-full cursor-pointer items-center'>
        <Primitive.Track className='relative h-0.75 w-full rounded-full bg-foreground/20'>
          <Primitive.Indicator className='rounded-full bg-primary' />
          <Primitive.Thumb
            className={cn(
              'size-2.5 rounded-full bg-foreground opacity-0 transition-opacity',
              'group-hover/slider:opacity-100 focus-visible:opacity-100'
            )}
          />
        </Primitive.Track>
      </Primitive.Control>
    </Primitive.Root>
  )
}
