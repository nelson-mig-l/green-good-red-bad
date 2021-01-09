requirejs.config({
    baseUrl: "js",
    paths: {
        "three": "https://unpkg.com/three@0.124.0/build/three.min",
        "app": "app"
    },
    shim: {
        "app": ["three"]
    }
});
