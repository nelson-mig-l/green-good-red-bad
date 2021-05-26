define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextOverlay = void 0;
    class TextOverlay {
        static console(message) {
            console.log(message);
        }
        static points(message) {
            document.getElementById("points").innerText = String(message);
        }
        static multiplier(message) {
            document.getElementById("multiplier").innerText = String(message);
        }
        static lives(message) {
            document.getElementById("lives").innerText = String(message);
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
            document.getElementById("points").innerText = "";
            document.getElementById("lives").innerText = "";
            document.getElementById("info").innerHTML = "";
        }
    }
    exports.TextOverlay = TextOverlay;
});
