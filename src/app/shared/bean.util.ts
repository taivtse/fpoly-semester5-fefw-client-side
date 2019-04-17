export class BeanUtil {
  constructor() {
  }

  public static copyProperties(target: object, source: object): void {
    for (const key of Object.keys(target)) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
}
