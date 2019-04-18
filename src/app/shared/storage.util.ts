export class StorageUtil {
  constructor() {
  }

  public static setLocalStorage(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  public static getLocalStorage(key: string): object {
    return JSON.parse(localStorage.getItem(key));
  }
}
