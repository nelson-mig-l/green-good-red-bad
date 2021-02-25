define(["require", "exports", "three", "./say", "./game"], function (require, exports, THREE, say_1, game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Over = void 0;
    class Over extends THREE.Scene {
        constructor() {
            super();
            this.background = new THREE.Color(0xEFB7B7);
            let light = new THREE.HemisphereLight(0xFFFAFA, 0x000000, 0.9);
            this.add(light);
            let sun = new THREE.DirectionalLight(0xCDC1C5, 0.9);
            sun.position.set(12, 6, -7);
            this.add(sun);
        }
        initialize(camera) {
            say_1.Say.info("Game over <br/> Click to restart :)");
        }
        update(timeDelta) {
        }
        handleKeyEvent(event) {
        }
        handleClickEvent(event) {
            this.startGame();
        }
        startGame() {
            let e = new CustomEvent('stage', {
                detail: new game_1.Game()
            });
            document.dispatchEvent(e);
        }
    }
    exports.Over = Over;
});
