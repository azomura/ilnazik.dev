import { useId } from 'react'

import type { IIconProps } from '@/interfaces/icon'

import { IconSvg } from '../shared/icon-svg'

import { path0 } from './paths'

export function Check({ size = 84, ...props }: IIconProps) {
  const id = useId()

  return (
    <IconSvg
      viewBox='0 0 84 82'
      size={size}
      aspectRatio={84 / 82}
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
          gradientTransform='matrix(6.11093 -57.2718 46.5809 5.4373 58.0648 47.1143)'
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
          gradientTransform='matrix(-5.27533 43.619 -63.0293 -8.1431 48.0571 46.6934)'
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
