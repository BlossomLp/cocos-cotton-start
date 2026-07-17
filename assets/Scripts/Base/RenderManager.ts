import { _decorator, Component } from "cc";
import EventManager from "../Runtime/EventManager";
import { EventEnum } from "../Enum";
const { ccclass, property } = _decorator;

@ccclass("RenderManager")
export abstract class RenderManager extends Component {
  onLoad() {
    EventManager.Instance.on(EventEnum.Render, this.render, this);
  }

  onDestroy(): void {
    EventManager.Instance.off(EventEnum.Render, this.render);
  }

  start(): void {
    this.render();
  }

  abstract render(): void;
}
