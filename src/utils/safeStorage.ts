/**
 * Safe localStorage utility that handles access restrictions in iframe contexts
 */

interface StorageInterface {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

class MemoryStorage implements StorageInterface {
  private storage = new Map<string, string>();

  getItem(key: string): string | null {
    return this.storage.get(key) || null;
  }

  setItem(key: string, value: string): void {
    this.storage.set(key, value);
  }

  removeItem(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

class SafeStorage implements StorageInterface {
  private storage: StorageInterface;
  private isLocalStorageAvailable: boolean;

  constructor() {
    this.isLocalStorageAvailable = this.checkLocalStorageAvailability();
    this.storage = this.isLocalStorageAvailable
      ? localStorage
      : new MemoryStorage();
  }

  private checkLocalStorageAvailability(): boolean {
    try {
      const test = "__localStorage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn(
        "localStorage is not available, falling back to memory storage",
      );
      return false;
    }
  }

  getItem(key: string): string | null {
    try {
      return this.storage.getItem(key);
    } catch (e) {
      console.warn(`Failed to get item from storage: ${key}`, e);
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      this.storage.setItem(key, value);
    } catch (e) {
      console.warn(`Failed to set item in storage: ${key}`, e);
    }
  }

  removeItem(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (e) {
      console.warn(`Failed to remove item from storage: ${key}`, e);
    }
  }

  clear(): void {
    try {
      this.storage.clear();
    } catch (e) {
      console.warn("Failed to clear storage", e);
    }
  }

  // JSON helpers
  getJSON<T>(key: string, defaultValue: T): T {
    try {
      const item = this.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`Failed to parse JSON from storage: ${key}`, e);
      return defaultValue;
    }
  }

  setJSON(key: string, value: any): void {
    try {
      this.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Failed to stringify and set JSON in storage: ${key}`, e);
    }
  }

  // Get storage info
  isAvailable(): boolean {
    return this.isLocalStorageAvailable;
  }

  getStorageType(): "localStorage" | "memory" {
    return this.isLocalStorageAvailable ? "localStorage" : "memory";
  }
}

// Export singleton instance
export const safeStorage = new SafeStorage();

// Export utility functions for easier migration
export const safeGetItem = (key: string): string | null =>
  safeStorage.getItem(key);
export const safeSetItem = (key: string, value: string): void =>
  safeStorage.setItem(key, value);
export const safeRemoveItem = (key: string): void =>
  safeStorage.removeItem(key);
export const safeGetJSON = <T>(key: string, defaultValue: T): T =>
  safeStorage.getJSON(key, defaultValue);
export const safeSetJSON = (key: string, value: any): void =>
  safeStorage.setJSON(key, value);
