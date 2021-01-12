// var canvas = document.querySelector('#canvas');
// var ctx = canvas.getContext('2d');
// const Tuple = require('./tuple.js');
// const fs = require('browserify-fs');
const fs = require('fs');
const Canvas = require('./canvas.js');

// // Write "Awesome!"
// ctx.font = '30px Impact'
// ctx.rotate(0.1)
// ctx.fillText('Awesome!', 100, 100)

// // Draw line under text
// var text = ctx.measureText('Awesome!')
// ctx.strokeStyle = 'rgba(0,0,0,0.5)'
// ctx.beginPath()
// ctx.lineTo(50, 102)
// ctx.lineTo(50 + text.width, 102)
// ctx.stroke()

// var out = fs.createWriteStream(__dirname + '/state.png')
//   , stream = canvas.createPNGStream();

// stream.on('data', function(chunk){
//   out.write(chunk);
// });

const myCanvas = new Canvas(100, 100);
fs.writeFile('my.ppm', myCanvas.toPPM(), (err)=> {
    if (err) return console.log(err);
});