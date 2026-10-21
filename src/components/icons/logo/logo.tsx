import { useId } from 'react'

import './logo.css'

import type { IIconGradient, IIconProps } from '@/interfaces/icon'

import { logoOutline } from './logo-outline'
import { logoPath0, logoPath1, logoPath3, logoPath4, logoPath5 } from './logo-paths'

export function Logo({
  size = 24,
  title,
  gradient,
  className,
  fill = 'currentColor',
  fillOpacity = 0.9,
  ...props
}: IIconProps) {
  const id = useId()
  const gradientId = `${id}-gradient`
  const titleId = `${id}-title`
  const hasGradientColors = /(?:^|\s)(?:\S+:)?(?:from|to)-/.test(className ?? '')
  const useCssGradient = gradient === true || (gradient === undefined && hasGradientColors)
  const hasVia = /(?:^|\s)(?:\S+:)?via-/.test(className ?? '')
  const cssStops = [
    { offset: '0%', color: 'var(--logo-gradient-from, currentColor)' },
    ...(hasVia ? [{ offset: '50%', color: 'var(--logo-gradient-via, currentColor)' }] : []),
    { offset: '100%', color: 'var(--logo-gradient-to, currentColor)' }
  ]
  const resolvedGradient: IIconGradient | undefined = typeof gradient === 'object'
    ? gradient
    : useCssGradient ? { stops: cssStops } : undefined

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 21 22'
      width={size}
      height={size}
      fill={resolvedGradient ? `url(#${gradientId})` : fill}
      fillOpacity={fillOpacity}
      className={[useCssGradient && 'logo-gradient', className].filter(Boolean).join(' ')}
      role={title ? 'img' : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-hidden={title ? undefined : true}
      focusable='false'
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}
      {resolvedGradient && (
        <defs>
          <linearGradient
            id={gradientId}
            x1={resolvedGradient.x1 ?? '0%'}
            y1={resolvedGradient.y1 ?? '0%'}
            x2={resolvedGradient.x2 ?? '100%'}
            y2={resolvedGradient.y2 ?? '100%'}
          >
            {resolvedGradient.stops.map((stop, index) => (
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
