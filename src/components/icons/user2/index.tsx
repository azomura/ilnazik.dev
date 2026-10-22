import { useId } from 'react'

import type { IIconProps } from '@/interfaces/icon'

import { IconSvg } from '../shared/icon-svg'

import { path0 } from './paths'

export function User2({ size = 92, ...props }: IIconProps) {
  const id = useId()

  return (
    <IconSvg
      viewBox='0 0 92 90'
      size={size}
      aspectRatio={92 / 90}
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
          gradientTransform='matrix(6.04728 -57.8811 46.0957 5.49514 57.461 47.6144)'
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
          gradientTransform='matrix(-5.22038 44.0831 -62.3728 -8.22973 47.5576 47.1891)'
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
