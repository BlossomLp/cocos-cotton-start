import { _decorator, Component, Node, Sprite, SpriteFrame } from "cc";
import { ItemStatusEnum, ItemTypeEnum } from "../Enum";
import { DataManager } from "../Runtime/DataManager";
import { RenderManager } from "../Base/RenderManager";
const { ccclass, property } = _decorator;

/** 物品管理器 */
@ccclass("ItemManager")
export class ItemManager extends RenderManager {
  label: string = "物品";
  status: ItemStatusEnum;
  type: ItemTypeEnum;

  @property({ type: SpriteFrame, tooltip: "场景中状态的物品资源图" })
  sceneSf: SpriteFrame = null;

  @property({ type: SpriteFrame, tooltip: "背包中状态的物品资源图" })
  inventorySf: SpriteFrame = null;

  start(): void {
    super.start();
    this.node.on(Node.EventType.TOUCH_END, this.touchEnd, this);
  }

  onDestroy(): void {
    super.onDestroy();
    this.node.off(Node.EventType.TOUCH_END, this.touchEnd, this);
  }

  touchEnd() {
    const item = DataManager.Instance.items.find((item) => this.type === item.type);
    console.log("touchEnd", item, this.type);

    if (!item) return;

    if (item.status === ItemStatusEnum.Scene) {
      const index = DataManager.Instance.items.findIndex((item) => this.type === item.type);
      DataManager.Instance.items.push(...DataManager.Instance.items.splice(index, 1));
      item.status = ItemStatusEnum.Inventory;
      // 触发set
      DataManager.Instance.items = [...DataManager.Instance.items];
    }
  }

  render() {
    const item = DataManager.Instance.items.find((item) => this.type === item.type);
    if (item) {
      const status = item.status;
      const spriteComp = this.getComponent(Sprite);
      switch (status) {
        case ItemStatusEnum.Scene:
          this.node.active = true;
          spriteComp.spriteFrame = this.sceneSf;
          break;
        case ItemStatusEnum.Inventory:
          this.node.active = true;
          spriteComp.spriteFrame = this.inventorySf;
          break;
        case ItemStatusEnum.Disable:
          this.node.active = false;
        default:
          break;
      }
    }
  }
}
