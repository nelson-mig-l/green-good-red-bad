define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AudioFx = void 0;
    let redAudio = document.createElement("audio");
    redAudio.preload = "auto";
    redAudio.src = "./res/red.mp3";
    let greenAudio = document.createElement("audio");
    greenAudio.preload = "auto";
    greenAudio.src = "./res/green.mp3";
    let sAudio = document.createElement("audio");
    sAudio.preload = "auto";
    sAudio.src = "./res/section.mp3";
    class AudioFx {
        static red() {
            redAudio.currentTime = 0;
            redAudio.play();
        }
        static green() {
            greenAudio.currentTime = 0;
            greenAudio.play();
        }
        static section() {
            sAudio.currentTime = 0;
            sAudio.play();
        }
    }
    exports.AudioFx = AudioFx;
});
