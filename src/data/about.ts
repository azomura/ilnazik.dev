import { Cake, Check, Clock, User2 } from '@/components/icons'

import type { IAboutStatistic } from '@/interfaces/about'

export const aboutStatistics: readonly IAboutStatistic[] = [
  { value: '20', label: 'лет', icon: Cake },
  { value: '5', label: 'лет опыта в разработке', icon: Clock },
  { value: '>10', label: 'клиентов', icon: User2 },
  { value: '6', label: 'завершённых проектов', icon: Check }
]
