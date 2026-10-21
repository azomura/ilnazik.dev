import { useId } from 'react'

import type { IIconProps } from '@/interfaces/icon'

import { logoOutline } from './logo-outline'
import { logoPath0, logoPath1, logoPath3, logoPath4, logoPath5 } from './logo-paths'

export function Logo({
  size = 24,
  title,
  gradient,
  fill = 'currentColor',
  fillOpacity = 0.9,
  ...props
}: IIconProps) {
  const id = useId()
  const gradientId = `${id}-gradient`
  const titleId = `${id}-title`

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 21 22'
      width={size}
      height={size}
      fill={gradient ? `url(#${gradientId})` : fill}
      fillOpacity={fillOpacity}
      role={title ? 'img' : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-hidden={title ? undefined : true}
      focusable='false'
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}
      {gradient && (
        <defs>
          <linearGradient
            id={gradientId}
            x1={gradient.x1 ?? '0%'}
            y1={gradient.y1 ?? '0%'}
            x2={gradient.x2 ?? '100%'}
            y2={gradient.y2 ?? '100%'}
          >
            {gradient.stops.map((stop, index) => (
              <stop
                key={index}
                offset={stop.offset}
                stopColor={stop.color ?? 'currentColor'}
                stopOpacity={stop.opacity}
                className={stop.className}
              />
            ))}
          </linearGradient>
        </defs>
      )}
      <g opacity={0.97}>
        <path d={logoPath0} fillRule='evenodd' clipRule='evenodd' />
        <path d={logoPath1} />
        <path d={logoOutline} fillRule='evenodd' clipRule='evenodd' />
        <path d={logoPath3} />
        <path d={logoPath4} />
        <path d={logoPath5} />
      </g>
    </svg>
  )
}
