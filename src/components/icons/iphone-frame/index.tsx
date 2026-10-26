import { useId } from 'react'

import type { IIconProps } from '@/interfaces/ui/icon'

import { IconSvg } from '../shared/icon-svg'

export function IphoneFrame({ size = 360, ...props }: IIconProps) {
  const id = useId()

  return (
    <IconSvg
      viewBox='0 0 360 726'
      size={size}
      aspectRatio={360 / 726}
      fill='none'
      fillOpacity={1}
      {...props}
    >
      <defs>
        <linearGradient
          id={`${id}-metal`}
          x1='0'
          y1='0'
          x2='360'
          y2='726'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#d8e1e7' />
          <stop offset='.12' stopColor='#455967' />
          <stop offset='.3' stopColor='#b3c3cf' />
          <stop offset='.5' stopColor='#35434d' />
          <stop offset='.73' stopColor='#9eafbc' />
          <stop offset='1' stopColor='#d0d9df' />
        </linearGradient>
        <linearGradient
          id={`${id}-bezel`}
          x1='0'
          y1='0'
          x2='360'
          y2='0'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#080a0b' />
          <stop offset='.5' stopColor='#010102' />
          <stop offset='1' stopColor='#101316' />
        </linearGradient>
        <radialGradient id={`${id}-lens`}>
          <stop stopColor='#131649' />
          <stop offset='.4' stopColor='#080c27' />
          <stop offset='.7' stopColor='#03050c' />
          <stop offset='1' stopColor='#10121b' />
        </radialGradient>
      </defs>
      <g fill={`url(#${id}-metal)`}>
        <rect x='0' y='125' width='3' height='28' rx='1.5' />
        <rect x='0' y='181' width='3' height='49' rx='1.5' />
        <rect x='0' y='244' width='3' height='49' rx='1.5' />
        <rect x='357' y='193' width='3' height='79' rx='1.5' />
        <path
          fillRule='evenodd'
          d='M68 0H292C330 0 358 28 358 66V660C358 699 331 726 292 726H68C29 726 2 699 2 660V66C2 28 30 0 68 0ZM68 6C32 6 8 30 8 66V660C8 696 32 720 68 720H292C328 720 352 696 352 660V66C352 30 328 6 292 6Z'
        />
      </g>
      <path
        fill={`url(#${id}-bezel)`}
        fillRule='evenodd'
        d='M68 6H292C328 6 352 30 352 66V660C352 696 328 720 292 720H68C32 720 8 696 8 660V66C8 30 32 6 68 6ZM67 17C37 17 20 37 20 67V658C20 691 38 709 68 709H292C322 709 340 691 340 658V67C340 37 323 17 293 17H251C247 17 246 19 246 23V27C246 38 238 45 227 45H133C122 45 114 38 114 27V23C114 19 113 17 109 17Z'
      />
      <rect
        x='151'
        y='6'
        width='58'
        height='6'
        rx='3'
        fill='#070809'
        stroke='#303438'
        strokeWidth='.7'
      />
      <path d='M155 8H205' stroke='#4b5054' strokeWidth='.5' />
      <circle cx='132' cy='25' r='7' fill='#020308' stroke='#151820' strokeWidth='1' />
      <circle cx='132' cy='25' r='4.5' fill={`url(#${id}-lens)`} />
      <circle cx='133' cy='23.5' r='1.2' fill='#293586' opacity='.7' />
      <path
        d='M66 3H294C329 3 355 30 355 66V660C355 697 329 723 292 723H68C31 723 5 697 5 660V66C5 30 31 3 66 3Z'
        fill='none'
        stroke='#ecf2f5'
        strokeOpacity='.45'
        strokeWidth='.7'
      />
    </IconSvg>
  )
}
