import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

export function HeaderLogin() {
  return (
    <Button
      variant='secondary'
      className={cn(
        'h-12 w-[85.51px] gap-1.5 p-0',
        'rounded-l-[8px] rounded-r-[14px] bg-muted/70 text-white',
        'font-artegra text-[13px] font-semibold leading-[normal] tracking-normal'
      )}
    >
      Войти
    </Button>
  )
}
