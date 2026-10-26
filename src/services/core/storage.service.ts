export class StorageService {
  public getItem<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key)

      return value === null ? null : (JSON.parse(value) as T)
    } catch {
      return null
    }
  }

  public setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }

  public removeItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch {}
  }
}

export const storageService = new StorageService()
