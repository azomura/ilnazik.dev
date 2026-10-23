export type ProjectCategory = 'Mini-apps' | 'Web' | 'Desktop' | 'Mobile'

export interface IProject {
  id: string
  title: string
  category: ProjectCategory
  platform: string
  tags: readonly string[]
  logo?: string
  outlineLogo?: string
  screenshot?: string
}
