import { makeAutoObservable } from 'mobx';

import { localStorageManager } from '../LocalStorageManager';

class SettingsStore {
  showFullAttendance = false;

  constructor() {
    makeAutoObservable(this);
    this.loadSettings();
  }

  setShowFullAttendance = (value: boolean) => {
    this.showFullAttendance = value;
    this.saveSettings();
  };

  saveSettings = () => {
    localStorageManager.saveToLocalStorage({
      showFullAttendance: this.showFullAttendance,
    });
  };

  loadSettings = () => {
    const loadedSettings = localStorageManager.loadFromLocalStorage({
      showFullAttendance: this.showFullAttendance,
    });

    this.showFullAttendance = loadedSettings.showFullAttendance;
  };
}

export const settingsStore = new SettingsStore();
