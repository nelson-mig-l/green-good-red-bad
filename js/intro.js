define(["require", "exports", "three", "./text", "./stage", "./game"], function (require, exports, THREE, text_1, stage_1, game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Intro = void 0;
    class Intro extends THREE.Scene {
        constructor() {
            super();
            this.background = new THREE.Color(0xC3EFB7);
            let light = new THREE.HemisphereLight(0xFFFAFA, 0x000000, 0.9);
            this.add(light);
            let sun = new THREE.DirectionalLight(0xCDC1C5, 0.9);
            sun.position.set(12, 6, -7);
            this.add(sun);
        }
        initialize(camera) {
            text_1.TextOverlay.info("Use arrow keys to move <br/> Click to start");
        }
        update(timeDelta) {
        }
        handleKeyEvent(event) {
            this.startGame();
        }
        handleClickEvent(event) {
            this.startGame();
        }
        startGame() {
            stage_1.StageManager.request(new game_1.Game());
        }
    }
    exports.Intro = Intro;
});
