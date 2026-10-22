import type { IIconProps } from '@/interfaces/icon'

import { IconSvg } from '../shared/icon-svg'
import {
  wordmarkPath0,
  wordmarkPath1,
  wordmarkPath2,
  wordmarkPath3,
  wordmarkPath4,
  wordmarkPath5,
  wordmarkPath6
} from './wordmark-paths'

export function Wordmark({ size = 84, ...props }: IIconProps) {
  return (
    <IconSvg viewBox='0 0 84 9' size={size} aspectRatio={84 / 9} {...props}>
      <path d={wordmarkPath0} />
      <path d={wordmarkPath1} />
      <path d={wordmarkPath2} />
      <path d={wordmarkPath3} />
      <path d={wordmarkPath4} />
      <path d={wordmarkPath5} />
      <path d={wordmarkPath6} />
    </IconSvg>
  )
}
