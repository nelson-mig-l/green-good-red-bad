requirejs.config({
    baseUrl: "js",
    paths: {
        "three": "../lib/three.min",
        "app": "app"
    },
    shim: {
        "app": ["three"]
    }
});
