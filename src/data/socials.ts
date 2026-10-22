import { CodeXml } from 'lucide-react'

import { socials } from '@/config/socials'

import type { ISocialLink } from '@/interfaces/social'

export const socialLinks: readonly ISocialLink[] = [
  { label: 'GitHub', href: socials.developer.github, icon: CodeXml },
  { label: 'Telegram', href: socials.developer.telegram, icon: CodeXml },
  { label: 'VK', href: socials.developer.vk, icon: CodeXml },
  { label: 'Discord', href: socials.developer.discord, icon: CodeXml },
  { label: 'X', href: socials.developer.x, icon: CodeXml },
  { label: 'YouTube', href: socials.developer.youtube, icon: CodeXml },
  { label: 'ТГ-канал', href: socials.developer.telegramChannel, icon: CodeXml },
  { label: 'Twitch', href: socials.developer.twitch, icon: CodeXml }
]
