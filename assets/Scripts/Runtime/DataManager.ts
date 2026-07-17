import Singleton from "../Base/Singleton";
import { EventEnum, ItemStatusEnum, ItemTypeEnum } from "../Enum";
import { EventManager } from "./EventManager";

interface IItem {
  type: ItemTypeEnum;
  status: ItemStatusEnum;
}
export class DataManager extends Singleton {
  static get Instance() {
    return this.getInstance<DataManager>();
  }

  /** 全部物品 */
  private _items: Array<IItem> = [
    { type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene },
    { type: ItemTypeEnum.Mail, status: ItemStatusEnum.Scene },
  ];

  get items() {
    return this._items;
  }
  set items(value: Array<IItem>) {
    this._items = value;
    // 执行渲染逻辑
    EventManager.Instance.emit(EventEnum.Render);
  }
}
