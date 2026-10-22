import { useId } from 'react'

import type { IIconProps } from '@/interfaces/icon'

import { IconSvg } from '../shared/icon-svg'

import { path0 } from './paths'

export function Clock({ size = 105, ...props }: IIconProps) {
  const id = useId()

  return (
    <IconSvg
      viewBox='0 0 105 88'
      size={size}
      aspectRatio={105 / 88}
      fill='none'
      fillOpacity={1}
      {...props}
    >
      <defs>
        <radialGradient
          id={`${id}-0`}
          cx={0}
          cy={0}
          r={1}
          gradientTransform='matrix(7 -67 53.3578 6.36087 66.498 55.1001)'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0' stopColor='#E83D40' stopOpacity={0.8} />
          <stop offset='1' stopColor='#E83D40' stopOpacity={0.1} />
        </radialGradient>
        <radialGradient
          id={`${id}-1`}
          cx={0}
          cy={0}
          r={1}
          gradientTransform='matrix(-6.04283 51.0281 -72.1993 -9.52629 55.0343 54.6077)'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0' stopColor='#E83D40' stopOpacity={0.8} />
          <stop offset='1' stopColor='#E83D40' stopOpacity={0} />
        </radialGradient>
      </defs>
      <g opacity={0.5}>
        <path
          d={path0}
          fill={`url(#${id}-0)`}
          fillOpacity={0.7}
          strokeWidth={0.2}
          stroke={`url(#${id}-1)`}
        />
      </g>
    </IconSvg>
  )
}
