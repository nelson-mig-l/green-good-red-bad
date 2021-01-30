requirejs.config({
    baseUrl: "js",
    paths: {
        "three": "https://unpkg.com/three@0.125.1/build/three.min",
        "app": "app"
    },
    shim: {
        "app": ["three"]
    }
});
