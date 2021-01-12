const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert").strict

const Canvas = require("../../canvas");
const Color = require("../../color");

Then('every pixel of {string} is color\\({float}, {float}, {float})', function (objName, r, g, b) {
    let canvas = this.objects[objName];
    let color = new Color(r, g, b);
    for(let i = 0; i < canvas.pixels.length; ++i)
    {
        assert(canvas.pixels[i].isEqual(color));
    }
});

When('write_pixel\\({string}, {int}, {int}, {string})', function (canvasName, x, y, colorName) {
    this.objects[canvasName].setColor(x, y, this.objects[colorName]);
});

Then('pixel_at\\({string}, {int}, {int}) = {string}', function (canvasName, x, y, colorName) {
    assert(this.objects[canvasName].getPixel(x, y).isEqual(this.objects[colorName]));
});

// When "ppm" ← canvas_to_ppm("c")
When('{string} ← canvas_to_ppm\\({string})', function (objectName, canvasName) {
    this.objects[objectName] = this.objects[canvasName].toPPM();
});

Then('lines {int}-{int} of {string} are', function (lineBegin, lineEnd, ppmName, docString) {
    let ppm = this.objects[ppmName];
    let lines = ppm.split('\n').slice(lineBegin - 1, lineEnd);
    let targetLines = docString.split('\n');
    
    // console.log('\nlines:\n' + lines);
    // console.log('\ntargetLines:\n' + targetLines);
    assert.deepEqual(lines, targetLines);
});


// ? When every pixel of "c" is set to color(1, 0.8, 0.6)
When('every pixel of {string} is set to color\\({float}, {float}, {float})', function (canvasName, r, g, b) {
    let canvas = this.objects[canvasName];
    canvas.clear(new Color(r, g, b));
});


// ? Then "ppm" ends with a newline character
Then('{string} ends with a newline character', function (ppmName) {
    let ppm = this.objects[ppmName];
    assert.equal(ppm[ppm.length-1], '\n');
});