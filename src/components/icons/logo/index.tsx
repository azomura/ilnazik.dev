import type { IIconProps } from '@/interfaces/icon'

import { IconSvg } from '../shared/icon-svg'

import { outline } from './outline'
import { path0, path1, path3, path4, path5 } from './paths'

export function Logo({ size = 24, ...props }: IIconProps) {
  return (
    <IconSvg viewBox='0 0 21 22' size={size} {...props}>
      <g opacity={0.97}>
        <path d={path0} fillRule='evenodd' clipRule='evenodd' />
        <path d={path1} />
        <path d={outline} fillRule='evenodd' clipRule='evenodd' />
        <path d={path3} />
        <path d={path4} />
        <path d={path5} />
      </g>
    </IconSvg>
  )
}
