import { storageService } from './storage.service'

export class SettingsService<T> {
  private listeners = new Set<() => void>()
  private value: T
  private readonly key: string

  constructor(key: string, fallback: T, validate: (value: unknown) => value is T) {
    this.key = key

    const saved = storageService.getItem<unknown>(key)

    this.value = validate(saved) ? saved : fallback
  }

  public getSnapshot = (): T => this.value

  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)

    return () => {
      this.listeners.delete(listener)
    }
  }

  protected emit = (): void => {
    this.listeners.forEach(listener => listener())
  }

  protected setValue(value: T): void {
    if (value === this.value) return

    this.value = value

    storageService.setItem(this.key, value)

    this.emit()
  }
}
