import { useId } from 'react'

import type { IIconProps } from '@/interfaces/icon'

import { IconSvg } from '../shared/icon-svg'

import { path0, path1 } from './paths'

export function Cake({ size = 107, ...props }: IIconProps) {
  const id = useId()

  return (
    <IconSvg
      viewBox='0 0 107 86'
      size={size}
      aspectRatio={107 / 86}
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
          gradientTransform='matrix(7.19308 67.6295 54.8296 -6.42064 68.3295 55.5833)'
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
          gradientTransform='matrix(-6.2095 -51.5076 -74.1908 9.61579 56.5496 56.0803)'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0' stopColor='#E83D40' stopOpacity={0.8} />
          <stop offset='1' stopColor='#E83D40' stopOpacity={0} />
        </radialGradient>
      </defs>
      <g opacity={0.5}>
        <path d={path0} fill={`url(#${id}-0)`} fillOpacity={0.7} />
        <path d={path1} strokeWidth={0.2} stroke={`url(#${id}-1)`} />
      </g>
    </IconSvg>
  )
}
