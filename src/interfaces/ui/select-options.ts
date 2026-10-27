import type { ComponentProps } from 'react'

import type { SelectTrigger } from '@/components/ui/select'

export interface ISelectOptionsProps extends Pick<
  ComponentProps<typeof SelectTrigger>,
  'ref' | 'onBlur' | 'disabled'
> {
  options: { value: string; label: string }[]
  value: string | null
  onValueChange: (value: string | null) => void
  className?: string
}
