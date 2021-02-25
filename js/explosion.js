define(["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Explosion = exports.ExplosionManager = void 0;
    const MOVEMENT_SPEED = 0.25;
    const TOTAL_OBJECTS = 100;
    const OBJECT_SIZE = 0.25;
    const EXPLOSION_DURATION = 1000;
    class ExplosionManager {
        constructor(world) {
            this.explosions = [];
            this.world = world;
        }
        explode(position, color) {
            let explosion = new Explosion(position, color);
            this.world.add(explosion.object);
            this.explosions.push(explosion);
            setTimeout(function (w, e) {
                w.remove(explosion.object);
                if (e.length > 3) {
                    e.shift();
                }
            }, EXPLOSION_DURATION, this.world, this.explosions);
        }
        animate(timeDelta) {
            for (let e of this.explosions) {
                e.animate(timeDelta);
            }
        }
    }
    exports.ExplosionManager = ExplosionManager;
    class Explosion {
        constructor(position, color) {
            this.dirs = [];
            let geometry = new THREE.BufferGeometry();
            let positions = [];
            for (let i = 0; i < TOTAL_OBJECTS; i++) {
                positions.push(position.x);
                positions.push(position.y);
                positions.push(position.z);
                this.dirs.push(new THREE.Vector3((Math.random() * MOVEMENT_SPEED) - (MOVEMENT_SPEED / 2), (Math.random() * MOVEMENT_SPEED) - (MOVEMENT_SPEED / 2), (Math.random() * MOVEMENT_SPEED) - (MOVEMENT_SPEED / 2)));
            }
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            let material = new THREE.PointsMaterial({
                size: OBJECT_SIZE,
                color: color
            });
            let particles = new THREE.Points(geometry, material);
            this.object = particles;
        }
        animate(timeDelta) {
            let pCount = TOTAL_OBJECTS;
            let positions = this.object.geometry.attributes.position;
            while (pCount--) {
                positions.setXYZ(pCount, positions.getX(pCount) + this.dirs[pCount].x, positions.getY(pCount) + this.dirs[pCount].y, positions.getZ(pCount) + this.dirs[pCount].z);
            }
            this.object.geometry.attributes.position.needsUpdate = true;
        }
    }
    exports.Explosion = Explosion;
});
