import aromaForgeOutline from '@/assets/projects/aroma-forge-outline.svg'
import AromaForgeLogo from '@/assets/projects/aroma-forge-logo.svg'
import aromaForgeScreen from '@/assets/projects/aroma-forge-screen.png'

import type { IProject, ProjectCategory } from '@/interfaces/project'
export const projectCategories: readonly ProjectCategory[] = [
  'Mini-apps',
  'Web',
  'Desktop',
  'Mobile'
]

export const projects: readonly IProject[] = [
  {
    id: 'aroma-forge',
    title: 'Aroma Forge — Магазин ароматизаторов',
    category: 'Mini-apps',
    platform: 'Telegram mini app',
    tags: ['Fullstack', 'Frontend', 'Backend', 'Mini-apps'],
    logo: AromaForgeLogo,
    outlineLogo: aromaForgeOutline,
    screenshot: aromaForgeScreen
  },
  {
    id: 'aroma-forge',
    title: 'Aroma Forge — Магазин ароматизаторов',
    category: 'Mini-apps',
    platform: 'Telegram mini app',
    tags: ['Fullstack', 'Frontend', 'Backend', 'Mini-apps'],
    logo: AromaForgeLogo,
    outlineLogo: aromaForgeOutline,
    screenshot: 'https://i.pinimg.com/1200x/a3/81/8d/a3818d740a67d5c229f321446444884c.jpg'
  },
  {
    id: 'aroma-forge',
    title: 'Aroma Forge — Магазин ароматизаторов',
    category: 'Mini-apps',
    platform: 'Telegram mini app',
    tags: ['Fullstack', 'Frontend', 'Backend', 'Mini-apps'],
    logo: AromaForgeLogo,
    outlineLogo: aromaForgeOutline,
    screenshot: 'https://i.pinimg.com/736x/4f/da/ac/4fdaac01ce8e4867d88785b753d8165b.jpg'
  }
]
