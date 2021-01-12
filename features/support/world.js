// features/support/world.js
const { setWorldConstructor } = require("@cucumber/cucumber");

class CustomWorld {
    constructor() {
        this.objects = {};
    }
}

setWorldConstructor(CustomWorld);