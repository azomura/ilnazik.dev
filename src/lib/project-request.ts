import { socials } from '@/config/socials'

import type { ProjectRequestV1Dto } from '@/services/api/models'

export function projectRequestTelegramUrl(data: ProjectRequestV1Dto, t: (key: string) => string) {
  const design = t(data.hasDesign ? 'projectRequest.yes' : 'projectRequest.no')

  const lines = [
    t('projectRequest.telegramGreeting'),
    data.name && `${t('projectRequest.name')}: ${data.name}`,
    data.description && `${t('projectRequest.description')}: ${data.description}`,
    data.budget != null && `${t('projectRequest.budget')}: ${data.budget}`,
    `${t('projectRequest.designHelpTitle')}: ${design}`
  ].filter(Boolean)

  const url = new URL(socials.developer.telegram)

  url.searchParams.set('text', lines.join('\n\n'))

  return url.toString()
}
