import { _decorator, Component, director, Event } from 'cc';
import { SceneEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends Component {
    protected start(): void {
        director.preloadScene(SceneEnum.H1)
        director.preloadScene(SceneEnum.H2)
        director.preloadScene(SceneEnum.H3)
        director.preloadScene(SceneEnum.H4)
    }

    changeScene(e: Event, scene: string) {
        director.loadScene(scene as SceneEnum)
    }
}

 