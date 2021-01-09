// features/support/steps.js
const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert").strict
const Tuple = require("../../tuple");

// let a;
// let tuple;

let tuples = {};

let operators = {
  '+': function(a, b){ return a.add(b)},
  '-': function(a, b){ return a.minus(b)},
  '*': function(a, b){ return a.multiply(b)},
  '/': function(a, b){ return a.divide(b)}
}

Given('{string} ← tuple\\({float}, {float}, {float}, {float})', function (string, float, float2, float3, float4) {
  tuples[string] = new Tuple(float, float2, float3, float4);
});

Given('{string} ← point\\({int}, {int}, {int})', function (string, int, int2, int3) {
  tuples[string] = new Tuple(int, int2, int3, 1);
});

Given('{string} ← vector\\({float}, {float}, {float})', function (string, float, float2, float3) {
  tuples[string] = new Tuple(float, float2, float3, 0);
});

Then('{string}.{string} = {float}', function (string, string2, float) {
  assert.equal(tuples[string][string2], float);
});

Then('{string} is a point', function (string) {
  assert(tuples[string].isPoint());
});

Then('{string} is not a point', function (string) {
  assert(!tuples[string].isPoint());
});

Then('{string} is a vector', function (string) {
  assert(tuples[string].isVector());
});

Then('{string} is not a vector', function (string) {
  assert(!tuples[string].isVector());
});

Then('{string} = tuple\\({float}, {float}, {float}, {float})', function (string, float, float2, float3, float4) {
  assert.equal(tuples[string]["x"], float);
  assert.equal(tuples[string]["y"], float2);
  assert.equal(tuples[string]["z"], float3);
  assert.equal(tuples[string]["w"], float4);
});

Then('{string} {string} {string} = tuple\\({float}, {float}, {float}, {float})', function (string, string2, string3, float, float2, float3, float4) {
  let result = operators[string2](tuples[string], tuples[string3]);
  assert.equal(result["x"], float);
  assert.equal(result["y"], float2);
  assert.equal(result["z"], float3);
  assert.equal(result["w"], float4);
});

Then('{string} {string} {string} = vector\\({float}, {float}, {float})', function (string, string2, string3, float, float2, float3) {
  let result = operators[string2](tuples[string], tuples[string3]);
  assert
  assert.equal(result["x"], float);
  assert.equal(result["y"], float2);
  assert.equal(result["z"], float3);
  assert.equal(result["w"], 0);
});


Then('{string} {string} {string} = point\\({int}, {int}, {int})', function (string, string2, string3, int, int2, int3) {
  let result = operators[string2](tuples[string], tuples[string3]);
  assert.equal(result["x"], int);
  assert.equal(result["y"], int2);
  assert.equal(result["z"], int3);
  assert.equal(result["w"], 1);
});

Then('-{string} = tuple\\({float}, {float}, {float}, {float})', function (string, float, float2, float3, float4) {
  let t = tuples[string].negative();
  assert.equal(t["x"], float);
  assert.equal(t["y"], float2);
  assert.equal(t["z"], float3);
  assert.equal(t["w"], float4);
});

Then('{string} {string} {float} = tuple\\({float}, {float}, {float}, {float})', function (string, string2, scalar, x, y, z, w) {
  let result = operators[string2](tuples[string], scalar);
  assert.equal(result["x"], x);
  assert.equal(result["y"], y);
  assert.equal(result["z"], z);
  assert.equal(result["w"], w);
});

Then('magnitude\\({string}) = {float}', function (string, float) {
  assert.equal(tuples[string].magnitude(), float);
});


Then('normalize\\({string}) = vector\\({float}, {float}, {float})', function (tuple1, x, y, z) {
  let n = tuples[tuple1].normalize();
  assert.equal(n["x"], x);
  assert.equal(n["y"], y);
  assert.equal(n["z"], z);
  assert.equal(n["w"], 0);
});

When('{string} ← normalize\\({string})', function (tuple1, tuple2) {
  tuples[tuple1] = tuples[tuple2].normalize();
});

Then('dot\\({string}, {string}) = {float}', function (tuple1, tuple2, value) {
  assert.equal(tuples[tuple1].dot(tuples[tuple2]), value);
});

Then('cross\\({string}, {string}) = vector\\({float}, {float}, {float})', function (tuple1, tuple2, x, y, z) {
  let result = tuples[tuple1].cross(tuples[tuple2]);
  assert.equal(result["x"], x);
  assert.equal(result["y"], y);
  assert.equal(result["z"], z);
  assert.equal(result["w"], 0);
});