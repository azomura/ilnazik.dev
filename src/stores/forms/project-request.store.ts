import { create } from 'zustand'

import type { ProjectRequestValues } from '@/validations/project-request'

interface IProjectRequestStore {
  draft: ProjectRequestValues
  save: (draft: ProjectRequestValues) => void
}

export const useProjectRequestStore = create<IProjectRequestStore>(set => ({
  draft: {
    name: '',
    contact: '',
    contactMethod: 'Telegram',
    description: '',
    budget: '',
    hasDesign: true
  },
  save: draft => set({ draft })
}))
