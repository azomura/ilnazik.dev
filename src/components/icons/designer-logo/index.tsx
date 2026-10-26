import type { IIconProps } from '@/interfaces/ui/icon'

import { IconSvg } from '../shared/icon-svg'

import { path0 } from './paths'

export function DesignerLogo({ size = 36, ...props }: IIconProps) {
  return (
    <IconSvg viewBox='0 0 36 22' size={size} aspectRatio={36 / 22} fillOpacity={1} {...props}>
      <path d={path0} fillRule='evenodd' clipRule='evenodd' />
    </IconSvg>
  )
}
