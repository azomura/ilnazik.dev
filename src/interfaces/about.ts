import type { ComponentType } from 'react'

import type { IIconProps } from './icon'

export interface IAboutStatistic {
  value: string
  label: string
  icon: ComponentType<IIconProps>
}
