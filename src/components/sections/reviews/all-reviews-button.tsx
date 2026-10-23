import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { routes } from '@/config/routes'

import { cn } from '@/lib/utils'

interface IAllReviewsButtonProps {
  compact?: boolean
}

export function AllReviewsButton({ compact = false }: IAllReviewsButtonProps) {
  return (
    <Button
      render={<Link to={routes.reviews} />}
      nativeButton={false}
      variant='secondary'
      className={cn(
        'gap-2 font-artegra text-[14px]',
        compact ? 'h-8 rounded-[8px] px-3' : 'h-12 rounded-[16px] px-5'
      )}
    >
      Все отзывы
      <ArrowUpRight className='size-4' />
    </Button>
  )
}
