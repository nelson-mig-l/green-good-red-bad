define(["require", "exports", "three", "./world", "./hero", "./collision", "./stage", "./say", "./obstacle", "./over", "./explosion"], function (require, exports, THREE, world_1, hero_1, collision_1, stage_1, say_1, obstacle_1, over_1, explosion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    class Game extends THREE.Scene {
        constructor() {
            super();
            this.fog = new THREE.FogExp2(0xF0FFF0, 0.14);
            this.background = new THREE.Color(0xF0FFF0);
            // lights
            let light = new THREE.HemisphereLight(0xFFFAFA, 0x000000, 0.9);
            this.add(light);
            let sun = new THREE.DirectionalLight(0xCDC1C5, 0.9);
            sun.position.set(12, 6, -7);
            this.add(sun);
            this.world = new world_1.World(26);
            this.add(this.world);
            this.hero = new hero_1.Hero(0.2);
            this.hero.position.y = this.world.radius + 0.1;
            this.add(this.hero);
            this.coll = new collision_1.Collision();
            this.boom = new explosion_1.ExplosionManager(this.world);
            this.multiplier = 1;
            this.points = 0;
            this.lives = 3;
            say_1.Say.points(this.points);
            say_1.Say.lives(this.lives);
            say_1.Say.message("Quick! Get ready!");
        }
        initialize(camera) {
            camera.lookAt(this.hero.position);
        }
        update(timeDelta) {
            let obstacle = this.world.sf.up().obstacle;
            if (obstacle != undefined && obstacle.visible) { // not visible no collision possible
                let collision = this.coll.check(this.hero, obstacle);
                if (collision != undefined) {
                    this.handleCollision(collision);
                }
            }
            if (this.world.update()) {
                say_1.Play.section();
                if (this.multiplier > 1)
                    this.multiplier--;
                say_1.Say.multiplier(this.multiplier);
            }
            this.world.animate(timeDelta);
            this.hero.animate(timeDelta);
            this.boom.animate(timeDelta);
        }
        handleKeyEvent(event) {
            let down = (event.type === "keydown") ? true : false;
            switch (event.key) {
                case "ArrowLeft":
                    if (down)
                        this.hero.move(-1);
                    break;
                case "ArrowRight":
                    if (down)
                        this.hero.move(+1);
                    break;
            }
        }
        handleClickEvent(event) {
            let half = document.body.clientWidth / 2;
            if (event.clientX > half) {
                this.hero.move(+1);
            }
            else {
                this.hero.move(-1);
            }
        }
        handleCollision(obstacle) {
            obstacle.visible = false;
            let kind = obstacle.kind;
            this.boom.explode(obstacle.position, obstacle.material['color']);
            if (kind === obstacle_1.ObstacleKind.GOOD) {
                this.points += this.multiplier;
                this.multiplier += 2;
                say_1.Say.points(this.points);
                say_1.Say.multiplier(this.multiplier);
                say_1.Play.green();
            }
            else {
                this.lives--;
                this.multiplier = 1;
                say_1.Say.lives(this.lives);
                say_1.Say.multiplier(this.multiplier);
                say_1.Play.red();
                say_1.Say.message("Be careful!");
                if (this.lives == 0) {
                    this.hero.die();
                    say_1.Say.message("You lost!");
                    setTimeout(function () {
                        stage_1.StageManager.request(new over_1.Over());
                    }, 2000);
                }
            }
        }
    }
    exports.Game = Game;
});
//# sourceMappingURL=game.js.map