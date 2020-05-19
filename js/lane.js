define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LANES = exports.Lane = void 0;
    class Lane {
        constructor(index) {
            this.index = index;
            var unit = Math.PI / 96; // distance between lanes
            this.angle = index * unit;
        }
    }
    exports.Lane = Lane;
    exports.LANES = {
        LEFT_BORDER: new Lane(-2),
        LEFT: new Lane(-1),
        CENTER: new Lane(0),
        RIGHT: new Lane(1),
        RIGHT_BORDER: new Lane(2)
    };
    exports.LANES.LEFT.left = exports.LANES.LEFT;
    exports.LANES.LEFT.right = exports.LANES.CENTER;
    exports.LANES.CENTER.left = exports.LANES.LEFT;
    exports.LANES.CENTER.right = exports.LANES.RIGHT;
    exports.LANES.RIGHT.left = exports.LANES.CENTER;
    exports.LANES.RIGHT.right = exports.LANES.RIGHT;
});
//# sourceMappingURL=lane.js.map