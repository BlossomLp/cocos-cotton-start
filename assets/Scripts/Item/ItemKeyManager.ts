import { _decorator } from "cc";
import { ItemTypeEnum } from "../Enum";
import { ItemManager } from "./ItemManager";
const { ccclass, property } = _decorator;

/** 物品 - 钥匙管理器 */
@ccclass("ItemKeyManager")
export class ItemKeyManager extends ItemManager {
  label: string = "信箱钥匙";
  type: ItemTypeEnum = ItemTypeEnum.Key;
}
