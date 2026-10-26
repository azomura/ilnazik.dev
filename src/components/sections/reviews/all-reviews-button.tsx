import { useI18n } from '@/hooks/providers/use-i18n'

import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { routes } from '@/config/routes'

export function AllReviewsButton() {
  const { t } = useI18n()

  return (
    <Button
      render={<Link to={routes.reviews} />}
      nativeButton={false}
      variant='secondary'
      className='h-8.5 gap-2 rounded-[16px] bg-card px-3 font-artegra font-normal text-[13px]'
    >
      {t('reviews.all')}<ArrowUpRight className='size-3.5' />
    </Button>
  )
}
