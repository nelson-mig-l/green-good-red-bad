define(["require", "exports", "three", "./lane"], function (require, exports, THREE, lane_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Hero = void 0;
    class Hero extends THREE.Mesh {
        constructor(radius) {
            let geometry = new THREE.DodecahedronGeometry(radius, 1);
            let material = new THREE.MeshStandardMaterial({
                color: 0x6FA8DC, flatShading: true
            });
            super(geometry, material);
            this.lane = lane_1.LANES.CENTER;
        }
        move(direction) {
            if (direction > 0) {
                this.lane = this.lane.right;
            }
            else {
                this.lane = this.lane.left;
            }
        }
        die() {
            this.position.y = 0;
        }
        animate(timeDelta) {
            this.rotation.x += -26 * timeDelta;
            let val = THREE.MathUtils.lerp(this.position.x, this.lane.index, 6 * timeDelta);
            this.position.x = val;
        }
    }
    exports.Hero = Hero;
});
