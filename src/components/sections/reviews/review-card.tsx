import { Star } from 'lucide-react'

import { User } from '@/components/icons/user'
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from '@/components/ui'

import { useImage } from '@/hooks/use-image'

import type { IReview } from '@/interfaces/review'

import { cn } from '@/lib/utils'

interface IReviewCardProps {
  review: IReview
  className?: string
}

const stars = [1, 2, 3, 4, 5] as const

export function ReviewCard({ review, className }: IReviewCardProps) {
  const { status, loading, imageProps } = useImage(review.avatar)

  return (
    <li className={cn('min-w-0 rounded-[26px] bg-card p-5', className)}>
      <figure>
        <figcaption className='flex items-center gap-3'>
          <Avatar className='size-12 rounded-[16px] after:rounded-[inherit]'>
            {review.avatar && status !== 'error' && (
              <AvatarImage
                {...imageProps}
                keepMounted
                src={review.avatar}
                alt={review.author}
                width={48}
                height={48}
                loading='lazy'
                decoding='async'
                referrerPolicy='no-referrer'
                className={cn('rounded-[16px]', loading && 'invisible')}
              />
            )}

            <AvatarFallback className='rounded-[16px] bg-muted'>
              <User className='h-3.5 w-3 text-white' />
            </AvatarFallback>

            {review.avatar && loading && (
              <Skeleton className='absolute inset-0 size-full rounded-[16px]' />
            )}
          </Avatar>

          <div className='min-w-0 font-artegra text-[14px] leading-5'>
            <h3 className='truncate text-foreground'>{review.author}</h3>
            <p className='mt-0.5 text-text-dim'>{review.projectType}</p>
          </div>

          <div className='ml-auto flex shrink-0 items-center gap-2 self-start pt-1.5'>
            {stars.map(star => (
              <Star
                key={star}
                className={cn(
                  'size-3.75 fill-current stroke-0',
                  star <= review.rating ? 'text-primary' : 'text-text-dim/40'
                )}
              />
            ))}
          </div>
        </figcaption>

        <blockquote className='mt-2 font-artegra text-[14px] leading-5 text-foreground'>
          {review.text}
        </blockquote>
      </figure>
    </li>
  )
}
