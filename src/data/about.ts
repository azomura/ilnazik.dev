import { Cake, Check, Clock, User2 } from '@/components/icons'

import type { IAboutStatistic } from '@/interfaces/sections/about'

export const aboutStatistics: readonly IAboutStatistic[] = [
  { value: '20', label: 'about.years', icon: Cake },
  { value: '5', label: 'about.experience', icon: Clock },
  { value: '>10', label: 'about.clients', icon: User2 },
  { value: '6', label: 'about.completed', icon: Check }
]
