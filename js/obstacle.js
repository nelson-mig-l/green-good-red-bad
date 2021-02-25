define(["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Obstacle = exports.ObstacleFactory = exports.ObstacleKind = void 0;
    var ObstacleKind;
    (function (ObstacleKind) {
        ObstacleKind[ObstacleKind["GOOD"] = 0] = "GOOD";
        ObstacleKind[ObstacleKind["BAD"] = 1] = "BAD";
        ObstacleKind[ObstacleKind["BORDER"] = 2] = "BORDER";
    })(ObstacleKind = exports.ObstacleKind || (exports.ObstacleKind = {}));
    class ObstacleFactory {
        static good() {
            return new Obstacle(0.50, 0x00FF00, ObstacleKind.GOOD);
        }
        static bad() {
            return new Obstacle(0.75, 0xFF0000, ObstacleKind.BAD);
        }
        static border(even) {
            let color = even ? 0x000000 : 0xFFFF00;
            return new Obstacle(0.5, color, ObstacleKind.BORDER);
        }
    }
    exports.ObstacleFactory = ObstacleFactory;
    class Obstacle extends THREE.Mesh {
        constructor(size, color, kind) {
            let geometry = new THREE.BoxGeometry(size, size, size * 2);
            let material = new THREE.MeshStandardMaterial({
                color: color, flatShading: true
            });
            super(geometry, material);
            this.kind = kind;
        }
    }
    exports.Obstacle = Obstacle;
});
