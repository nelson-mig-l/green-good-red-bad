define(["require", "exports", "three", "./say", "./intro"], function (require, exports, THREE, say_1, intro_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    class App {
        constructor() {
            say_1.Say.console("GGRB Game v0.1.1");
            let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            let renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
            window.addEventListener('resize', onWindowResize, false);
            let handleKeyEvent = function (event) {
                scene.handleKeyEvent(event);
            };
            let handleClickEvent = function (event) {
                scene.handleClickEvent(event);
            };
            document.onkeydown = handleKeyEvent;
            document.onkeyup = handleKeyEvent;
            document.onmousedown = handleClickEvent;
            let hasFocus = true;
            document.addEventListener('visibilitychange', function (e) {
                clock.getDelta(); // reset clock on visibility change
                hasFocus = !(document.hidden);
            });
            document.addEventListener('stage', function (e) {
                scene = e.detail;
                scene.initialize(camera);
            }, false);
            camera.position.z = 4;
            camera.position.y = 30;
            camera.position.x = 0;
            let scene = new intro_1.Intro();
            scene.initialize(camera);
            this.camera = camera;
            this.scene = scene;
            this.renderer = renderer;
            let clock = new THREE.Clock();
            let animate = function () {
                requestAnimationFrame(animate);
                let timeDelta = clock.getDelta();
                if (hasFocus) {
                    scene.update(timeDelta);
                    renderer.render(scene, camera);
                }
            };
            animate();
        }
        launch() {
        }
    }
    exports.App = App;
});
//# sourceMappingURL=app.js.map