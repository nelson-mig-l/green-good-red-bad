define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Play = exports.Say = void 0;
    class Say {
        static console(message) {
            console.log(message);
        }
        static points(message) {
            document.getElementById("points").innerText = message;
        }
        static multiplier(message) {
            document.getElementById("multiplier").innerText = message;
        }
        static lives(message) {
            document.getElementById("lives").innerText = message;
        }
        static info(message) {
            clearTimeout(this.handler);
            document.getElementById("info").innerHTML = message;
        }
        static message(message) {
            clearTimeout(this.handler);
            document.getElementById("info").innerHTML = message;
            this.handler = setTimeout(function () {
                document.getElementById("info").innerHTML = "";
            }, 5000);
        }
        static clear() {
            Say.points("");
            Say.lives("");
            Say.info("");
        }
    }
    exports.Say = Say;
    let redAudio = document.createElement("audio");
    redAudio.preload = "auto";
    redAudio.src = "./res/red.mp3";
    let greenAudio = document.createElement("audio");
    greenAudio.preload = "auto";
    greenAudio.src = "./res/green.mp3";
    let sAudio = document.createElement("audio");
    sAudio.preload = "auto";
    sAudio.src = "./res/section.mp3";
    class Play {
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
    exports.Play = Play;
});
//# sourceMappingURL=say.js.map