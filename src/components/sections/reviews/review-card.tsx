import { useI18n } from '@/hooks/providers/use-i18n'

import { Star } from 'lucide-react'

import { User } from '@/components/icons/user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'

import type { IReview } from '@/interfaces/sections/review'

import { cn } from '@/lib/utils'

interface IReviewCardProps {
  review: IReview
  className?: string
}

const stars = [1, 2, 3, 4, 5] as const

export function ReviewCard({ review, className }: IReviewCardProps) {
  const { t } = useI18n()

  return (
    <li className={cn('min-w-0 rounded-[26px] bg-card p-5', className)}>
      <figure>
        <figcaption className='flex items-center gap-3'>
          <Avatar className='size-12 rounded-[16px] after:rounded-[inherit]'>
            {review.avatar && (
              <AvatarImage
                src={review.avatar}
                alt=''
                width={48}
                height={48}
                loading='lazy'
                decoding='async'
                referrerPolicy='no-referrer'
                className='rounded-[16px]'
              />
            )}

            <AvatarFallback className='rounded-[16px] bg-muted'>
              <User className='h-3.5 w-3 text-white' />
            </AvatarFallback>
          </Avatar>

          <div className='min-w-0 font-artegra text-[14px] leading-5'>
            <h3 className='truncate font-medium text-foreground'>{t(review.author)}</h3>
            <p className='mt-px font-normal text-text-dim'>{review.projectType}</p>
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

        <blockquote className='mt-2 font-artegra font-medium text-[14px] leading-5 text-foreground'>
          {t(review.text)}
        </blockquote>
      </figure>
    </li>
  )
}
