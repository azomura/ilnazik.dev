import type { IIconProps } from '@/interfaces/icon'

import { IconSvg } from '../shared/icon-svg'

import { path0 } from './paths'

export function User({ size = 12, ...props }: IIconProps) {
  return (
    <IconSvg viewBox='0 0 12 14' size={size} aspectRatio={12 / 14} fillOpacity={1} {...props}>
      <path d={path0} />
    </IconSvg>
  )
}
