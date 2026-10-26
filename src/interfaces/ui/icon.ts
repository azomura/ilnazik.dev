import type { CSSProperties, ReactNode, SVGProps } from 'react'

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
  gradient?: IIconGradient | boolean
}

export interface IIconStyle extends CSSProperties {
  '--icon-gradient-from'?: string
  '--icon-gradient-via'?: string
  '--icon-gradient-to'?: string
}

export interface IIconOptions {
  className?: string
  gradient?: IIconGradient | boolean
  fill?: string
  style?: IIconStyle
}

export interface IIconGradientProps {
  id: string
  gradient?: IIconGradient
}

export interface IIconSvgProps extends IIconProps {
  children: ReactNode
  aspectRatio?: number
}
