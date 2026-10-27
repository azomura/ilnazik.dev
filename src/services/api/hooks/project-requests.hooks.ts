import { useMutation } from '@tanstack/react-query'

import { projectRequestsModule } from '@/services/api/modules/project-requests.module'

export function useCreateProjectRequest() {
  return useMutation({
    mutationKey: ['project-requests', 'create'],
    mutationFn: projectRequestsModule.create,
    retry: false
  })
}
