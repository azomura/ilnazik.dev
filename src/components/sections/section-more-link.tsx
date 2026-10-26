import { useI18n } from '@/hooks/providers/use-i18n'

import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

interface ISectionMoreLinkProps {
  to: string
}

export function SectionMoreLink({ to }: ISectionMoreLinkProps) {
  const { t } = useI18n()

  return (
    <Button
      render={<Link to={to} />}
      nativeButton={false}
      variant='secondary'
      className='h-8.5 gap-2 rounded-[16px] bg-card px-3 font-artegra text-[13px] font-normal'
    >
      {t('common.more')}<ArrowUpRight className='size-3.5' />
    </Button>
  )
}
