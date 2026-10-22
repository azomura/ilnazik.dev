import type { IIconProps } from '@/interfaces/icon'

import { IconSvg } from '../shared/icon-svg'

import { logoOutline } from './logo-outline'
import { logoPath0, logoPath1, logoPath3, logoPath4, logoPath5 } from './logo-paths'

export function Logo({ size = 24, ...props }: IIconProps) {
  return (
    <IconSvg viewBox='0 0 21 22' size={size} {...props}>
      <g opacity={0.97}>
        <path d={logoPath0} fillRule='evenodd' clipRule='evenodd' />
        <path d={logoPath1} />
        <path d={logoOutline} fillRule='evenodd' clipRule='evenodd' />
        <path d={logoPath3} />
        <path d={logoPath4} />
        <path d={logoPath5} />
      </g>
    </IconSvg>
  )
}
