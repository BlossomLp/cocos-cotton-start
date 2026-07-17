import { _decorator } from "cc";
import { ItemTypeEnum } from "../Enum";
import { ItemManager } from "./ItemManager";
const { ccclass, property } = _decorator;

/** 物品 - 邮件管理器 */
@ccclass("ItemMailManager")
export class ItemMailManager extends ItemManager {
  /** 物品名称 */
  label: string = "船票";
  /** 物品类型 */
  type: ItemTypeEnum = ItemTypeEnum.Mail;
}
