var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
const Tuple = require('./tuple.js');

const tuple = new Tuple(1.1, 1, 1, 1);

// const fs = require('fs');

// Write "Awesome!"
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText('Awesome!' + tuple.x, 100, 100)

// Draw line under text
var text = ctx.measureText('Awesome!' + tuple.x)
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()

// var out = fs.createWriteStream(__dirname + '/state.png')
//   , stream = canvas.createPNGStream();

// stream.on('data', function(chunk){
//   out.write(chunk);
// });