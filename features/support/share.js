const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert").strict

const Tuple = require("../../tuple");
const Canvas = require("../../canvas");
const Matrix = require("../../matrix");

let create = function(type, param1, param2, param3, param4) {
    if(Tuple.Factory[type]) {
        if(!param2 && !param3 && !param4) return Tuple.Factory[type](param1);
        if(!param3 && !param4) return Tuple.Factory[type](param1, param2);
        if(!param4) return Tuple.Factory[type](param1, param2, param3);
        else return Tuple.Factory[type](param1, param2, param3, param4);
    }
    if(Canvas.Factory[type]) return Canvas.Factory[type](param1, param2, param3, param4);
}

let operators = {
  '+': function(a, b){ return a.add(b)},
  '-': function(a, b){ return a.minus(b)},
  '*': function(a, b){ return a.multiply(b)},
  '/': function(a, b){ return a.divide(b)},
  '=': function(a, b){ return a.equal(b)},
  '!=': function(a, b){ return !a.equal(b)}
}

Given('{string} ← {string}\\({float}, {float})', function (objName, type, param1, param2) {
    this.objects[objName] = create(type, param1, param2);
});

Given('{string} ← {string}\\({float}, {float}, {float}, {float})', function (tupleName, type, x, y, z, w) {
    this.objects[tupleName] = Tuple.Factory[type](x, y, z, w);
});

Given('{string} ← {string}\\({float}, {float}, {float})', function (tupleName, type, x, y, z) {
    this.objects[tupleName] = Tuple.Factory[type](x, y, z);
});

Then('{string}.{string} = {float}', function (tupleName, variableName, float) {
  assert.equal(this.objects[tupleName][variableName], float);
});

Then('{string} is a point', function (string) {
  assert(this.objects[string].isPoint());
});

Then('{string} is not a point', function (string) {
  assert(!this.objects[string].isPoint());
});

Then('{string} is a vector', function (string) {
  assert(this.objects[string].isVector());
});

Then('{string} is not a vector', function (string) {
  assert(!this.objects[string].isVector());
});

Then('{string} = {string}\\({float}, {float}, {float}, {float})', function (tupleName, type, x, y, z, w) {
  let t = this.objects[tupleName];
  let target = Tuple.Factory[type](x, y, z, w);
  assert(t.isEqual(target));
});

Then('-{string} = {string}\\({float}, {float}, {float}, {float})', function (tupleName, type, x, y, z, w) {
  let t = this.objects[tupleName].negative();
  let target = Tuple.Factory[type](x, y, z, w);
  assert(t.isEqual(target));
});

Then('{string}\\({string}) = {float}', function (functionName, tupleName, scalar) {
  assert.equal(this.objects[tupleName][functionName](), scalar);
});

Then('{string}\\({string}) = {string}\\({float}, {float}, {float})', function (functionName, tupleName, type, x, y, z) {
  let t = this.objects[tupleName][functionName]();
  let target = Tuple.Factory[type](x, y, z);
  assert(t.isEqual(target));
});

When('{string} ← {string}\\({string})', function (tupleName1, functionName, tupleName2) {
    this.objects[tupleName1] = this.objects[tupleName2][functionName]();
});

Then('{string}\\({string}, {string}) = {float}', function (functionName, tupleName1, tupleName2, scalar) {
  assert.equal(Tuple[functionName](this.objects[tupleName1], this.objects[tupleName2]), scalar);
});

Then('{string}\\({string}, {string}) = {string}\\({float}, {float}, {float})', function (functionName, tupleName1, tupleName2, type, x, y, z) {
  let result = Tuple[functionName](this.objects[tupleName1], this.objects[tupleName2]);
  let target = Tuple.Factory[type](x, y, z);
  assert(result.isEqual(target));
});

Then('{string} {string} {string} = {string}\\({float}, {float}, {float})', function (tupleName1, operator, tupleName2, type, x, y, z) {
  let result = operators[operator](this.objects[tupleName1], this.objects[tupleName2]);
  let target = Tuple.Factory[type](x, y, z);

  assert(result.isEqual(target));
});

Then('{string} {string} {string} = {string}\\({float}, {float}, {float}, {float})', function (tupleName1, operator, tupleName2, type, x, y, z, w) {
  let result = operators[operator](this.objects[tupleName1], this.objects[tupleName2]);
  let target = Tuple.Factory[type](x, y, z, w);
  assert(result.isEqual(target));     
});

Then('{string} {string} {float} = {string}\\({float}, {float}, {float})', function (tupleName, operator, scalar, type, x, y, z) {
  let result = operators[operator](this.objects[tupleName], scalar);
  let target = Tuple.Factory[type](x, y, z);
  assert(result.isEqual(target));
});

Then('{string} {string} {float} = {string}\\({float}, {float}, {float}, {float})', function (tupleName, operator, scalar, type, x, y, z, w) {
  let result = operators[operator](this.objects[tupleName], scalar);
  let target = Tuple.Factory[type](x, y, z, w);
  assert(result.isEqual(target));
});

Then('{string} {string} {string}', function (objName1, operator, objName2) {
  let result = operators[operator](this.objects[objName1], this.objects[objName2]);
  assert(result);
});