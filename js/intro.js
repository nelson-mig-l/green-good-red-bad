define(["require", "exports", "three", "./say", "./stage", "./game"], function (require, exports, THREE, say_1, stage_1, game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Intro = void 0;
    class Intro extends THREE.Scene {
        constructor() {
            super();
            this.background = new THREE.Color(0xFF00A0);
            // lights
            var light = new THREE.HemisphereLight(0xFFFAFA, 0x000000, 0.9);
            this.add(light);
            var sun = new THREE.DirectionalLight(0xCDC1C5, 0.9);
            sun.position.set(12, 6, -7);
            this.add(sun);
        }
        initialize(camera) {
            say_1.Say.info("Use arrow keys to move <br/> Click to start");
        }
        update(timeDelta) {
            //
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
//# sourceMappingURL=intro.js.map