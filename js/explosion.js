define(["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Particle System (Points) parameter
    const MOVEMENT_SPEED = 0.25;
    const TOTAL_OBJECTS = 100;
    const OBJECT_SIZE = 0.25;
    const EXPLOSION_DURATION = 1000; // 1 second
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
                    //console.log("too many explosions");
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
            var geometry = new THREE.Geometry();
            for (var i = 0; i < TOTAL_OBJECTS; i++) {
                var vertex = new THREE.Vector3();
                vertex.x = position.x;
                vertex.y = position.y;
                vertex.z = position.z;
                geometry.vertices.push(vertex);
                this.dirs.push(new THREE.Vector3((Math.random() * MOVEMENT_SPEED) - (MOVEMENT_SPEED / 2), (Math.random() * MOVEMENT_SPEED) - (MOVEMENT_SPEED / 2), (Math.random() * MOVEMENT_SPEED) - (MOVEMENT_SPEED / 2)));
            }
            var material = new THREE.PointsMaterial({
                size: OBJECT_SIZE,
                color: color
            });
            var particles = new THREE.Points(geometry, material);
            this.object = particles;
            this.dir = new THREE.Vector3((Math.random() * MOVEMENT_SPEED) - (MOVEMENT_SPEED / 2), (Math.random() * MOVEMENT_SPEED) - (MOVEMENT_SPEED / 2), (Math.random() * MOVEMENT_SPEED) - (MOVEMENT_SPEED / 2));
        }
        animate(timeDelta) {
            var pCount = TOTAL_OBJECTS;
            while (pCount--) {
                var particle = this.object.geometry['vertices'][pCount];
                particle.y += this.dirs[pCount].y;
                particle.x += this.dirs[pCount].x;
                particle.z += this.dirs[pCount].z;
            }
            this.object.geometry['verticesNeedUpdate'] = true;
        }
    }
    exports.Explosion = Explosion;
});
//# sourceMappingURL=explosion.js.map