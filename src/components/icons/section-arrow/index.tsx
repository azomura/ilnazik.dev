import type { IIconProps } from '@/interfaces/ui/icon'

import { IconSvg } from '../shared/icon-svg'

import { path0 } from './paths'

export function SectionArrow({ size = 11, ...props }: IIconProps) {
  return (
    <IconSvg viewBox='0 0 11 11' size={size} fillOpacity={1} {...props}>
      <path d={path0} />
    </IconSvg>
  )
}
