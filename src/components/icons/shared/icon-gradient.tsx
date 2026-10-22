import type { IIconGradientProps } from '@/interfaces/icon'

export function IconGradient({ id, gradient }: IIconGradientProps) {
  if (!gradient) return null

  return (
    <defs>
      <linearGradient
        id={id}
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
  )
}
