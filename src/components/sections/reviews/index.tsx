import { useI18n } from '@/hooks/providers/use-i18n'

import { HorizontalSlider } from '@/components/horizontal-slider'

import { reviews } from '@/data/reviews'

import { Section } from '../section'
import { SectionHeading } from '../section-heading'

import { AllReviewsButton } from './all-reviews-button'
import { ReviewCard } from './review-card'

export function Reviews() {
  const { t } = useI18n()

  const visibleReviews = reviews.slice(0, 5)

  return (
    <Section id='reviews'>
      <HorizontalSlider
        renderHeader={controls => (
          <SectionHeading label={t('reviews.label')} actions={controls} className='mb-6' showDot={false}>
            {t('reviews.title')}
          </SectionHeading>
        )}
        hideActionsAtEnd
        actionsClassName='hidden sm:flex'
        actions={reviews.length > 3 && <AllReviewsButton />}
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
    </Section>
  )
}
