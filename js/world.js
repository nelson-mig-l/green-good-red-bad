define(["require", "exports", "three", "./obstacle", "./lane"], function (require, exports, THREE, obstacle_1, lane_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.World = void 0;
    const SECTIONS_BEFORE = 4;
    const SECTIONS_AFTER = 12;
    const SECTIONS_TOTAL = SECTIONS_BEFORE + SECTIONS_AFTER;
    const SECTION_COUNT = 128;
    const SECTION_SIZE = 2 * Math.PI / SECTION_COUNT;
    class Section extends THREE.Group {
        constructor(leftBorder, rightBorder) {
            super();
            this.leftBorder = leftBorder;
            this.rightBorder = rightBorder;
            this.add(this.leftBorder);
            this.add(this.rightBorder);
        }
        update(obstacle) {
            this.remove(this.obstacle);
            this.obstacle = obstacle;
            this.add(obstacle);
            obstacle.visible = true;
        }
    }
    class PositionHelper {
        constructor(radius, center) {
            this.spherical = new THREE.Spherical();
            this.radius = radius;
            this.center = center;
        }
        reposition(sectionIndex, lane, obstacle) {
            this.spherical.set(this.radius, Math.PI / 2 - lane.angle, sectionIndex * SECTION_SIZE);
            obstacle.position.setFromSpherical(this.spherical);
            obstacle.lookAt(this.center);
        }
    }
    // Section Pool or SectionManager with pools
    class SectionFactory {
        constructor(world) {
            this.sections = [];
            this.greens = [];
            this.reds = [];
            this.counter = 0;
            for (var i = 0; i < SECTIONS_TOTAL; i++) {
                var even = i % 2 == 0;
                var section = new Section(obstacle_1.ObstacleFactory.border(even), obstacle_1.ObstacleFactory.border(even));
                this.sections.push(section);
                world.add(section);
                this.greens.push(obstacle_1.ObstacleFactory.good());
                this.reds.push(obstacle_1.ObstacleFactory.bad());
            }
            this.helper = new PositionHelper(world.radius, world.position);
            this.radius = world.radius;
            this.center = world.position.clone();
        }
        // get one section from the pool
        request(up) {
            var section = this.sections.shift();
            this.reposition(up, section);
            this.sections.push(section);
            return section;
        }
        reposition(up, section) {
            //this.test(up, section);
            //this.randomize(up, section);
            //this.empty(up, section);
            this.sequential(up, section);
        }
        // return up section for collision detection
        up() {
            return this.sections[SECTIONS_BEFORE];
        }
        empty(up, section) {
            this.helper.reposition(up + SECTIONS_AFTER, lane_1.LANES.LEFT_BORDER, section.leftBorder);
            this.helper.reposition(up + SECTIONS_AFTER, lane_1.LANES.RIGHT_BORDER, section.rightBorder);
        }
        test(up, section) {
            this.empty(up, section);
            var obstacle = this.greens.shift();
            this.greens.push(obstacle);
            if (up % 12 == 0) {
                this.helper.reposition(up + SECTIONS_AFTER, lane_1.LANES.LEFT, obstacle);
            }
            else if (up % 6 == 0) {
                this.helper.reposition(up + SECTIONS_AFTER, lane_1.LANES.RIGHT, obstacle);
            }
            else {
                this.helper.reposition(up + SECTIONS_AFTER, lane_1.LANES.CENTER, obstacle);
            }
            section.update(obstacle);
        }
        randomize(up, section) {
            this.empty(up, section);
            var obstacle;
            if (Math.random() < 0.1) {
                obstacle = this.reds.shift();
                this.reds.push(obstacle);
            }
            else {
                obstacle = this.greens.shift();
                this.greens.push(obstacle);
            }
            var lane = Math.floor(Math.random() * 3);
            switch (lane) {
                case 0:
                    this.helper.reposition(up + SECTIONS_AFTER, lane_1.LANES.LEFT, obstacle);
                    break;
                case 1:
                    this.helper.reposition(up + SECTIONS_AFTER, lane_1.LANES.CENTER, obstacle);
                    break;
                case 2:
                    this.helper.reposition(up + SECTIONS_AFTER, lane_1.LANES.RIGHT, obstacle);
                    break;
            }
            section.update(obstacle);
        }
        sequential(up, section) {
            this.counter++;
            if (this.counter < 10) {
                this.empty(up, section);
            }
            else if (this.counter < 50) {
                this.test(up, section);
            }
            else {
                this.randomize(up, section);
            }
        }
    }
    class World extends THREE.Mesh {
        constructor(radius) {
            var geometry = new THREE.SphereGeometry(radius, 40, 40);
            var material = new THREE.MeshStandardMaterial({
                color: 0xFFFAFA, flatShading: true
            });
            super(geometry, material);
            // poles to the sides
            this.rotation.z = Math.PI / 2;
            this.radius = radius;
            this.helper = new THREE.Spherical();
            this.sf = new SectionFactory(this);
            this.lastSection = -1;
        }
        upSection() {
            var rot = this.rotation.x % (2 * Math.PI) + Math.PI / 2;
            var section = rot / SECTION_SIZE;
            return Math.floor(section);
        }
        // did we changed section?
        update() {
            var up = this.upSection();
            if (this.lastSection === up) {
                return false;
            }
            this.lastSection = up;
            var section = this.sf.request(up);
            return true;
        }
        animate(timeDelta) {
            this.rotation.x += 0.3 * timeDelta;
        }
    }
    exports.World = World;
});
//# sourceMappingURL=world.js.map