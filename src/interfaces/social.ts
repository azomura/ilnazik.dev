import type { ComponentType, SVGProps } from 'react'

export interface ISocialLink {
  label: string
  href?: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}
