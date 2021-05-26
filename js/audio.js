define(["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AudioFx = void 0;
    class AudioFx {
        constructor(camera) {
            const listener = new THREE.AudioListener();
            camera.add(listener);
            const loader = new THREE.AudioLoader();
            this.sectionFx = new THREE.PositionalAudio(listener);
            loader.load('res/section.mp3', (buffer) => {
                this.sectionFx.setBuffer(buffer);
                this.sectionFx.setRefDistance(20);
            });
            this.greenFx = new THREE.PositionalAudio(listener);
            loader.load('res/green.mp3', (buffer) => {
                this.greenFx.setBuffer(buffer);
                this.greenFx.setRefDistance(20);
            });
            this.redFx = new THREE.PositionalAudio(listener);
            loader.load('res/red.mp3', (buffer) => {
                this.redFx.setBuffer(buffer);
                this.redFx.setRefDistance(20);
            });
        }
        red() {
            if (this.redFx.isPlaying) {
                this.redFx.stop();
            }
            this.redFx.play();
        }
        green() {
            if (this.greenFx.isPlaying) {
                this.greenFx.stop();
            }
            this.greenFx.play();
        }
        section() {
            if (this.sectionFx.isPlaying) {
                this.sectionFx.stop();
            }
            this.sectionFx.play();
        }
    }
    exports.AudioFx = AudioFx;
});
