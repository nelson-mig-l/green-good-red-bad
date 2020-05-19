define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StageManager = void 0;
    class StageManager {
        static request(stage) {
            var event = new CustomEvent('stage', {
                detail: stage
            });
            document.dispatchEvent(event);
        }
    }
    exports.StageManager = StageManager;
});
//# sourceMappingURL=stage.js.map