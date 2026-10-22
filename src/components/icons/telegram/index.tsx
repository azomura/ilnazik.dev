import type { IIconProps } from '@/interfaces/icon'

import { IconSvg } from '../shared/icon-svg'

import { path0 } from './paths'

export function Telegram({ size = 12, ...props }: IIconProps) {
  return (
    <IconSvg viewBox='0 0 12 10' size={size} aspectRatio={12 / 10} fillOpacity={1} {...props}>
      <path d={path0} />
    </IconSvg>
  )
}
