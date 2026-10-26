export type EffectiveTheme = 'light' | 'dark'
export type Theme = EffectiveTheme | 'system'

export interface IThemeContextValue {
  theme: Theme
  effectiveTheme: EffectiveTheme
  setTheme: (theme: Theme) => void
}
