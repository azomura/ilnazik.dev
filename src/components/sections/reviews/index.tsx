import { HorizontalSlider } from '@/components/horizontal-slider'

import { reviews } from '@/data/reviews'

import { SectionHeading } from '../section-heading'

import { AllReviewsButton } from './all-reviews-button'
import { ReviewCard } from './review-card'

export function Reviews() {
  const visibleReviews = reviews.slice(0, 5)

  return (
    <section
      id='reviews'
      className='mx-auto w-[calc(100%-2rem)] max-w-275 scroll-mt-28 py-16 lg:scroll-mt-36 lg:py-20'
    >
      <HorizontalSlider
        renderHeader={controls => (
          <SectionHeading label='отзывы' actions={controls} className='mb-6' showDot={false}>
            Недавние отзывы
          </SectionHeading>
        )}
        hideActionsAtEnd
        actionsClassName='hidden sm:flex'
        actions={reviews.length > 3 ? <AllReviewsButton compact /> : undefined}
      >
        {visibleReviews.map((review, index) => (
          <ReviewCard
            key={`${review.id}-${index}`}
            review={review}
            className={'w-[min(359px,calc(100vw-3rem))] shrink-0'}
          />
        ))}

        <li className='flex w-48 shrink-0 items-center justify-center'>
          <AllReviewsButton />
        </li>
      </HorizontalSlider>
    </section>
  )
}
