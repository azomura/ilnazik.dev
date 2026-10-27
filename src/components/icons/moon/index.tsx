import type { IIconProps } from '@/interfaces/ui/icon'

import { IconSvg } from '../shared/icon-svg'

import { path0 } from './paths'

export function Moon({ size = 16, ...props }: IIconProps) {
  return (
    <IconSvg viewBox='14 16.5 15 15' size={size} fillOpacity={1} {...props}>
      <path d={path0} />
    </IconSvg>
  )
}
