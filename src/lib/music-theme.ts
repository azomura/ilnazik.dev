function channels(color: string) {
  return [1, 3, 5].map(offset => parseInt(color.slice(offset, offset + 2), 16))
}

function luminance(color: string) {
  const rgb = channels(color).map(value => {
    const channel = value / 255

    if (channel <= 0.04045) return channel / 12.92

    return ((channel + 0.055) / 1.055) ** 2.4
  })

  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722
}

function contrast(first: string, second: string) {
  const values = [luminance(first), luminance(second)]

  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05)
}

function mix(color: string, target: string, amount: number) {
  const destination = channels(target)
  const rgb = channels(color).map((value, index) =>
    Math.round(value + (destination[index] - value) * amount)
  )

  return '#' + rgb.map(value => value.toString(16).padStart(2, '0')).join('')
}

function adapt(color: string, dark: boolean) {
  const surface = dark ? '#171a1e' : '#f6f6f6'
  const target = dark ? '#ffffff' : '#000000'
  let result = mix(color, dark ? '#000000' : '#ffffff', 0.12)

  for (let step = 0; step < 20 && contrast(result, surface) < 3; step++) {
    result = mix(result, target, 0.08)
  }

  return result
}

export function musicTheme(palette: readonly string[], dark: boolean, fallback = '#7986cb') {
  const valid = palette.filter(color => /^#[\da-f]{6}$/i.test(color))
  const chromatic = valid.filter(color => {
    const rgb = channels(color)

    return Math.max(...rgb) - Math.min(...rgb) > 25
  })

  const colors = chromatic.length ? chromatic : valid
  const target = dark ? 0.16 : 0.3

  const sorted = colors.toSorted(
    (first, second) => Math.abs(luminance(first) - target) - Math.abs(luminance(second) - target)
  )

  const first = sorted[0] ?? fallback
  const base = channels(first)

  const distance = (color: string) =>
    channels(color).reduce((sum, value, index) => sum + (value - base[index]) ** 2, 0)

  const second = colors.reduce(
    (best, color) => (distance(color) > distance(best) ? color : best),
    first
  )

  const accent = colors.length ? adapt(first, dark) : fallback
  const foreground =
    contrast(accent, '#ffffff') > contrast(accent, '#000000') ? '#ffffff' : '#000000'

  return {
    '--primary': accent,
    '--music-controls-accent': colors.length
      ? mix(accent, dark ? '#ffffff' : '#000000', 0.6)
      : accent,
    '--primary-foreground': foreground,
    '--accent': accent,
    '--accent-foreground': foreground,
    '--ring': accent,
    '--sidebar-primary': accent,
    '--sidebar-primary-foreground': foreground,
    '--sidebar-ring': accent,
    '--music-color-one': accent,
    '--music-color-two': colors.length ? adapt(second, dark) : fallback
  }
}
