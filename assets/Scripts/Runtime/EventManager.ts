import Singleton from "../Base/Singleton";

interface IEvent {
  func: Function;
  ctx: unknown;
}

export class EventManager extends Singleton {
  static get Instance() {
    return this.getInstance<EventManager>();
  }
  private _eventMap = new Map<string, IEvent[]>();
  // 事件监听
  public on(event: string, func: Function, ctx: unknown) {
    if (!this._eventMap.has(event)) {
      this._eventMap.set(event, []);
    }
    this._eventMap.get(event).push({ func, ctx });
  }
  // 事件移除
  public off(event: string, func: Function, ctx: any) {
    if (!this._eventMap.has(event)) {
      return;
    }
    const list = this._eventMap.get(event);
    for (let i = 0; i < list.length; i++) {
      const { func, ctx } = list[i];
      if (func === func && ctx === ctx) {
        list.splice(i, 1);
        break;
      }
    }
  }
  // 事件触发
  public emit(event: string, ...args: any[]) {
    if (!this._eventMap.has(event)) {
      return;
    }
    const list = this._eventMap.get(event);
    for (let i = 0; i < list.length; i++) {
      const { func, ctx } = list[i];
      ctx ? func.apply(ctx, args) : func(...args);
    }
  }

  public clear() {
    this._eventMap.clear();
  }
}
