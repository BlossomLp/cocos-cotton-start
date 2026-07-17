import { _decorator, Button, instantiate, Label, Node, Prefab } from "cc";
import { RenderManager } from "../Base/RenderManager";
import { DataManager } from "../Runtime/DataManager";
import { ItemStatusEnum, ItemTypeEnum } from "../Enum";
import { ItemManager } from "../Item/ItemManager";
const { ccclass, property } = _decorator;

@ccclass("InventoryManager")
export class InventoryManager extends RenderManager {
  @property({ type: Prefab, tooltip: "钥匙预制体" })
  keyPrefab: Prefab = null;

  @property({ type: Prefab, tooltip: "船票预制体" })
  mailPrefab: Prefab = null;

  @property({ type: Label, tooltip: "物品名称" })
  label: Label = null;

  @property({ type: Button, tooltip: "向左按钮" })
  leftBtn: Button = null;

  @property({ type: Button, tooltip: "向右按钮" })
  rightBtn: Button = null;

  @property({ type: Node, tooltip: "背包" })
  placeholder: Node = null;

  @property({ type: Node, tooltip: "手" })
  hand: Node = null;

  render() {
    console.log("InventoryManager render", DataManager.Instance);
    this.placeholder.destroyAllChildren();
    const { inventoryItems, currentItemType, currentItem } = DataManager.Instance;
    this.node.active = inventoryItems.length > 0;
    if (inventoryItems.length) {
      // 渲染物品
      if (currentItemType) {
        // 加入背包
        if (currentItem.status === ItemStatusEnum.Inventory) {
          console.log(`加入背包生成`, currentItemType);
          this.generateItem(currentItemType);
        }
        // 拿出使用
        else {
          // TODO: why???
          const type = inventoryItems[0].type;
          console.log(`拿出时生成`, type);
          this.generateItem(type);
          DataManager.Instance.currentItemType = type;
        }
      } else {
        const type = inventoryItems[0].type;
        console.log(`第一次生成`, type);
        // 第一次加入背包 也要生成
        this.generateItem(type);
        DataManager.Instance.currentItemType = type;
      }
    }
    console.log("render", currentItemType, DataManager.Instance.isSelected);
    this.hand.active = Boolean(DataManager.Instance.isSelected && currentItemType);

    this.changeBtnInteractable();
  }

  generateItem(type: ItemTypeEnum) {
    console.log("generateItem", type);
    switch (type) {
      case ItemTypeEnum.Key:
        const keyNode = instantiate(this.keyPrefab);
        this.placeholder.addChild(keyNode);
        this.label.string = keyNode.getComponent(ItemManager).label;
        break;
      case ItemTypeEnum.Mail:
        const mailNode = instantiate(this.mailPrefab);
        this.placeholder.addChild(mailNode);
        this.label.string = mailNode.getComponent(ItemManager).label;
        break;
      default:
        break;
    }
  }

  onSelect() {
    console.log("onSelect");
    DataManager.Instance.isSelected = !DataManager.Instance.isSelected;
  }

  handleLeftBtn() {
    const { inventoryItems, currentItemType } = DataManager.Instance;
    // 背包没有物品
    if (!currentItemType) return;
    const currentIdx = inventoryItems.findIndex((item) => item.type === currentItemType);
    if (currentIdx > 0) {
      DataManager.Instance.isSelected = false;
      DataManager.Instance.currentItemType = inventoryItems[currentIdx - 1].type;
    }
  }

  handleRightBtn() {
    const { inventoryItems, currentItemType } = DataManager.Instance;
    // 背包没有物品
    if (!currentItemType) return;
    const currentIdx = inventoryItems.findIndex((item) => item.type === currentItemType);
    if (currentIdx < inventoryItems.length - 1) {
      DataManager.Instance.isSelected = false;
      DataManager.Instance.currentItemType = inventoryItems[currentIdx + 1].type;
    }
  }

  changeBtnInteractable() {
    const { inventoryItems, currentItemType } = DataManager.Instance;
    if (!currentItemType) {
      this.leftBtn.interactable = this.rightBtn.interactable = false;
      return;
    }
    const currentIdx = inventoryItems.findIndex((item) => item.type === currentItemType);
    this.leftBtn.interactable = currentIdx > 0;
    this.rightBtn.interactable = currentIdx < inventoryItems.length - 1;

    console.log("changeBtnInteractable", currentIdx, this.leftBtn.interactable, this.rightBtn.interactable);
  }
}
