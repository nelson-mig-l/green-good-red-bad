define(["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Collision = void 0;
    class Collision {
        constructor() {
            this.raycaster = new THREE.Raycaster();
        }
        check(the, other) {
            var arr = [];
            if (other != undefined)
                arr.push(other);
            return this.checks(the, arr);
        }
        checks(the, others) {
            let theGeo = the.geometry;
            let vertices = this.toVertices(theGeo);
            var originPoint = the.position.clone();
            for (var vertexIndex = 0; vertexIndex < vertices.length; vertexIndex++) {
                var localVertex = vertices[vertexIndex].clone();
                var globalVertex = localVertex.applyMatrix4(the.matrix);
                var directionVector = globalVertex.sub(the.position);
                var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
                var collisionResults = ray.intersectObjects(others);
                if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                    return collisionResults[0].object;
                }
            }
            return;
        }
        toVertices(geometry) {
            let vertices = [];
            const positions = geometry.attributes.position.array;
            for (let k = 0; k < positions.length; k += 3) {
                vertices.push(new THREE.Vector3(positions[k], positions[k + 1], positions[k + 2]));
            }
            return vertices;
        }
    }
    exports.Collision = Collision;
});
