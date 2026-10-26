import type { IIconProps } from '@/interfaces/ui/icon'

import { IconSvg } from '../shared/icon-svg'

import { path0 } from './paths'

export function Wordmark({ size = 84, ...props }: IIconProps) {
  return (
    <IconSvg viewBox='0 0 84 9' size={size} aspectRatio={84 / 9} {...props}>
      <path d={path0} />
    </IconSvg>
  )
}
