import type { EffectiveTheme, Theme } from '@/interfaces/providers/theme'

import { SettingsService } from './settings.service'

const isTheme = (value: unknown): value is Theme => {
  return value === 'light' || value === 'dark' || value === 'system'
}

export class ThemeService extends SettingsService<Theme> {
  private readonly mediaQuery =
    typeof window === 'undefined' ? null : window.matchMedia('(prefers-color-scheme: dark)')

  constructor() {
    super('app-theme', 'dark', isTheme)
    this.mediaQuery?.addEventListener('change', () => {
      if (this.getSnapshot() === 'system') this.emit()
    })
  }

  public getSystemTheme = (): EffectiveTheme => (this.mediaQuery?.matches ? 'dark' : 'light')

  public getEffectiveTheme = (): EffectiveTheme => {
    const theme = this.getSnapshot()

    return theme === 'system' ? this.getSystemTheme() : theme
  }

  public setTheme = (theme: Theme): void => {
    if (isTheme(theme)) this.setValue(theme)
  }
}

export const themeService = new ThemeService()
