import { cn } from '@/lib/utils'

interface IScrollProgressProps {
  visible: boolean
}

export function ScrollProgress({ visible }: IScrollProgressProps) {
  return (
    <span
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 -bottom-6 bg-primary/40 page-scroll-fill',
        'group-hover/top:[--button-hover:1] motion-reduce:transition-none',
        'before:absolute before:top-0 before:left-1/2 before:aspect-square before:w-[250%]',
        'before:-translate-x-1/2 before:-translate-y-full',
        'before:rounded-[calc(44%+6%*var(--button-fill-level))]',
        "before:bg-card before:animate-spin before:animation-duration-[2.8s] before:content-['']",
        'after:absolute after:top-0 after:left-1/2 after:aspect-square after:w-[250%]',
        'after:-translate-x-1/2 after:translate-y-[calc(-100%+3%*(1-var(--button-fill-level)))]',
        'after:rounded-[calc(40%+10%*var(--button-fill-level))]',
        'after:bg-card/70 after:animate-spin after:animation-duration-[4.5s]',
        "after:shimmer-reverse after:content-['']",
        'motion-reduce:before:animate-none motion-reduce:after:animate-none',
        !visible && 'before:paused after:paused'
      )}
    />
  )
}
