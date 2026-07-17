import { _decorator } from "cc";
import { ItemTypeEnum } from "../Enum";
import { ItemManager } from "./ItemManager";
const { ccclass, property } = _decorator;

/** 物品 - 钥匙管理器 */
@ccclass("ItemKeyManager")
export class ItemKeyManager extends ItemManager {
  /** 物品名称 */
  label: string = "信箱钥匙";
  /** 物品类型 */
  type: ItemTypeEnum = ItemTypeEnum.Key;
}
