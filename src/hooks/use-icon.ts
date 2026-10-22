import { useId, useMemo } from 'react'

import type { IIconGradient, IIconOptions, IIconStyle } from '@/interfaces/icon'

const gradientVariables: IIconStyle = {
  '--icon-gradient-from': 'var(--tw-gradient-from, currentColor)',
  '--icon-gradient-via': 'var(--tw-gradient-via, currentColor)',
  '--icon-gradient-to': 'var(--tw-gradient-to, currentColor)'
}

const gradientFrom = { offset: '0%', color: 'var(--icon-gradient-from, currentColor)' }
const gradientVia = { offset: '50%', color: 'var(--icon-gradient-via, currentColor)' }
const gradientTo = { offset: '100%', color: 'var(--icon-gradient-to, currentColor)' }

const linearGradient: IIconGradient = { stops: [gradientFrom, gradientTo] }
const viaGradient: IIconGradient = { stops: [gradientFrom, gradientVia, gradientTo] }

function getGradient(className: string, option: IIconOptions['gradient']) {
  if (typeof option === 'object') return option
  if (option === false) return undefined

  let hasColors = false
  let hasVia = false

  for (const token of className.split(/\s+/)) {
    const utility = token.slice(token.lastIndexOf(':') + 1)
    if (utility.startsWith('from-') || utility.startsWith('to-')) hasColors = true
    if (utility.startsWith('via-')) hasVia = true
    if (hasVia && (option || hasColors)) return viaGradient
  }

  return option || hasColors ? linearGradient : undefined
}

export function useIcon({ className = '', gradient, fill = 'currentColor', style }: IIconOptions) {
  const id = useId()
  const resolvedGradient = useMemo(() => getGradient(className, gradient), [className, gradient])

  const gradientId = `${id}-gradient`
  const usesTailwind = Boolean(resolvedGradient && typeof gradient !== 'object')
  const resolvedStyle = useMemo(
    () => (usesTailwind ? (style ? { ...gradientVariables, ...style } : gradientVariables) : style),
    [usesTailwind, style]
  )

  return {
    gradientId,
    titleId: `${id}-title`,
    gradient: resolvedGradient,
    svgProps: {
      className,
      fill: resolvedGradient ? `url(#${gradientId})` : fill,
      style: resolvedStyle
    }
  }
}
