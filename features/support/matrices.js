const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert").strict
const Matrix = require("../../matrix");

let operators = {
    '+': function(a, b){ return a.add(b)},
    '-': function(a, b){ return a.minus(b)},
    '*': function(a, b){ return a.multiply(b)},
    '/': function(a, b){ return a.divide(b)},
    '=': function(a, b){ return a.equal(b)},
    '!=': function(a, b){ return !a.equal(b)}
  }

Given('the following {int}x{int} matrix {string}:', function (row, col, matrixName, dataTable) {
    this.objects[matrixName] = new Matrix(dataTable.rawTable);
});

Given('the following matrix {string}:', function (matrixName, dataTable) {
    this.objects[matrixName] = new Matrix(dataTable.rawTable);
});

Then('{string}[{int},{int}] = {float}', function (matrixName, row, col, value) {
    assert.equal(this.objects[matrixName].element(row, col), value);
});   

// ? Then matrix "A" = matrix "B"
// Undefined. Implement with the following snippet:

Then('matrix {string} {string} matrix {string}', function (matrixName1, operator, matrixName2) {
    let result = operators[operator](this.objects[matrixName1], this.objects[matrixName2]);
    assert(result);
});
