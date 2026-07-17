export default class Singleton {
  private static _instance: any = null;

  public static getInstance<T>(): T {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }
}
