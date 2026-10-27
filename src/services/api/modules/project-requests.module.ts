import { apiClient } from '@/services/api/client'

import type { ProjectRequestV1Dto, ProjectRequestV1ResponseDto } from '@/services/api/models'

export const projectRequestsModule = {
  create: (data: ProjectRequestV1Dto) =>
    apiClient.post<ProjectRequestV1ResponseDto, ProjectRequestV1Dto>('requests', data)
}
