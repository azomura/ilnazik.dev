import type { IIconProps } from '@/interfaces/ui/icon'

import { IconSvg } from '../shared/icon-svg'

import { path0 } from './paths'

export function Palette({ size = 16, ...props }: IIconProps) {
  return (
    <IconSvg viewBox='51 16.2 14.2 15.6' size={size} fillOpacity={1} {...props}>
      <path d={path0} />
    </IconSvg>
  )
}
