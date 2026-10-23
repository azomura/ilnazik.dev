import { ArrowUp } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { scrollTo } from '@/lib/scroll-to'
import { cn } from '@/lib/utils'

import { ScrollProgress } from './scroll-progress'

interface IScrollTopButtonProps {
  visible: boolean
}

export function ScrollTopButton({ visible }: IScrollTopButtonProps) {
  return (
    <div
      inert={!visible}
      className={cn(
        'fixed right-6 bottom-6 z-50 transition-[opacity,translate] duration-300 ease-out',
        'motion-reduce:transition-none sm:right-8 sm:bottom-8',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      )}
    >
      <Button
        variant='secondary'
        size='icon'
        onClick={() => scrollTo(0)}
        className={cn(
          'group/top relative size-12 overflow-hidden rounded-[16px] border border-secondary bg-card',
          'text-foreground shadow-lg transition-colors hover:text-primary'
        )}
      >
        <ScrollProgress active={visible} />
        <ArrowUp className='relative size-5' />
      </Button>
    </div>
  )
}
