import Singleton from "../Base/Singleton";
import { EventEnum, ItemStatusEnum, ItemTypeEnum } from "../Enum";
import EventManager from "./EventManager";

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
    this.render();
  }

  /**
   * 获取所有状态为"在背包中"的物品项
   * 这是一个计算属性，通过过滤_items数组来返回符合条件的物品
   * @returns {Array} 返回状态为ItemStatusEnum.Inventory的所有物品项
   */
  get inventoryItems() {
    return this._items.filter((item) => item.status === ItemStatusEnum.Inventory);
  }

  private _currentItemType: ItemTypeEnum;

  get currentItemType() {
    return this._currentItemType;
  }
  set currentItemType(value: ItemTypeEnum) {
    this._currentItemType = value;
    this.render();
  }

  get currentItem() {
    return this._items.find((item) => item.type === this._currentItemType);
  }

  private _isSelected: boolean = false;

  get isSelected() {
    return this._isSelected;
  }
  set isSelected(value: boolean) {
    this._isSelected = value;
    this.render();
  }

  render() {
    console.log("DataManager render", DataManager.Instance.isSelected);
    EventManager.Instance.emit(EventEnum.Render);
  }
}
