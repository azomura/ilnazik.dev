import { accentColors } from '@/config/appearance'

import type { AccentColor } from '@/interfaces/providers/accent'

import { SettingsService } from './settings.service'

const isAccentColor = (value: unknown): value is AccentColor =>
  accentColors.some(color => color === value)

export class AccentService extends SettingsService<AccentColor> {
  constructor() {
    super('app-accent', accentColors[0], isAccentColor)
  }

  public setAccent = (color: AccentColor): void => {
    if (isAccentColor(color)) this.setValue(color)
  }
}

export const accentService = new AccentService()
