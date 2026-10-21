import type { SVGProps } from 'react'

export interface IIconGradientStop {
  offset: string | number
  color?: string
  opacity?: number
  className?: string
}

export interface IIconGradient {
  stops: readonly IIconGradientStop[]
  x1?: string | number
  y1?: string | number
  x2?: string | number
  y2?: string | number
}

export interface IIconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  size?: number | string
  title?: string
  gradient?: IIconGradient
}
