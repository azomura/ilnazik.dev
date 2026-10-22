import { useIcon } from '@/hooks/use-icon'

import type { IIconSvgProps } from '@/interfaces/icon'

import { IconGradient } from './icon-gradient'

export function IconSvg({
  size = 24,
  aspectRatio = 1,
  title,
  gradient,
  className,
  style,
  fill = 'currentColor',
  fillOpacity = 0.9,
  children,
  ...props
}: IIconSvgProps) {
  const icon = useIcon({ className, gradient, fill, style })

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={typeof size === 'number' ? size / aspectRatio : undefined}
      {...icon.svgProps}
      style={{ aspectRatio, ...icon.svgProps.style }}
      fillOpacity={fillOpacity}
      role={title ? 'img' : undefined}
      focusable='false'
      {...props}
    >
      {title && <title id={icon.titleId}>{title}</title>}
      <IconGradient id={icon.gradientId} gradient={icon.gradient} />
      {children}
    </svg>
  )
}
