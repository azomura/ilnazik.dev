import type { ComponentProps } from 'react'

import { useImage } from '@/hooks/use-image'
import { cn } from '@/lib/utils'

import { Skeleton } from './skeleton'

interface IImageProps extends Omit<ComponentProps<'img'>, 'ref' | 'onLoad' | 'onError'> {
  containerClassName?: string
  loadingClassName?: string
}

export function Image({
  src,
  alt = '',
  className,
  containerClassName,
  loadingClassName,
  ...props
}: IImageProps) {
  const { status, loading, imageProps } = useImage(src)
  if (!src || status === 'error') return null

  return (
    <div
      className={cn('relative overflow-hidden', containerClassName, loading && loadingClassName)}
    >
      <img
        {...props}
        {...imageProps}
        src={src}
        alt={alt}
        className={cn(className, loading && 'invisible')}
      />
      {loading && <Skeleton className='absolute inset-0 size-full rounded-[inherit]' />}
    </div>
  )
}
