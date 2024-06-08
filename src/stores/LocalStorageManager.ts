class LocalStorageManager {
  LOCAL_STORAGE_KEY = 'settingsStore';

  saveToLocalStorage(value: any) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(value));
  }

  loadFromLocalStorage(defaultValue: any) {
    const storedValue = localStorage.getItem(this.LOCAL_STORAGE_KEY);

    return storedValue ? JSON.parse(storedValue) : defaultValue;
  }
}

export const localStorageManager = new LocalStorageManager();
