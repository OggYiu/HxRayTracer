(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Tuple = require("./tuple");
const Color = require("./color");

class Canvas
{
    constructor(w, h)
    {
        this._width = w;
        this._height = h;
        this._pixels = [];

        for(let i = 0; i < this.width * this.height; ++i)
        {
            this._pixels.push(Color.black);
        }
    }

    setColor(x, y, color)
    {
        let index = this.getIndex(x, y);
        this._pixels[index] = color.clone();
    }

    getIndex(x, y)
    {
        return y * this.width + x;
    }

    getPixel(x, y)
    {
        let index = this.getIndex(x, y);
        return this._pixels[index].clone();
    }
    
    clear(color)
    {
        for(let i = 0; i < this._pixels.length; ++i)
        {
            this._pixels[i] = color.clone();
        }
    }

    toPPM()
    {
        let header =    "P3"
                        + '\n' + `${this.width} ${this.height}`
                        + '\n' + "255";

        let body = "";

        for(let y = 0; y < this.height; ++y)
        {
            if(body.length > 0) body += '\n';
            
            let lines = [];
            let line = '';
            for(let x = 0; x < this.width; ++x)
            {
                let index = this.getIndex(x, y);
                let pixel = this._pixels[index];
                let r = Math.round(pixel.r * 255);
                r = Math.max(0, r);
                r = Math.min(255, r);
                
                let g = Math.round(pixel.g * 255);
                g = Math.max(0, g);
                g = Math.min(255, g);
                
                let b = Math.round(pixel.b * 255);
                b = Math.max(0, b);
                b = Math.min(255, b);

                if((line + `${r}`).length >= 70) { lines.push(line); line = `${r} ` } else line += `${r}`;
                if((line + `${g}`).length >= 70) { lines.push(line); line = `${g} ` } else line += ` ${g}`;
                if((line + `${b}`).length >= 70) { lines.push(line); line = `${b}` } else line += ` ${b}`;
                
                if(x+1 < this.width && line.length > 0) line += ' ';
                if(x+1 >= this.width) lines.push(line);
            }

            for(let i = 0; i < lines.length; ++i)
            {
                body += lines[i];
                if(i+1 < lines.length) body += '\n';
            }
        }


        // console.log(header + '\n' + body);
        return header + '\n' + body + '\n';
    }

    get width() { return this._width; } set width(value) { this._width = value; }
    get height() { return this._height; } set height(value) { this._height = value; }
    get pixels() { return this._pixels; }
}

Canvas.Factory = {};
Canvas.Factory.canvas = function(width, height) { return new Canvas(width, height); }
module.exports = Canvas;
},{"./color":2,"./tuple":5}],2:[function(require,module,exports){
const Tuple = require("./tuple");

class Color extends Tuple
{
    constructor(r, g, b)
    {
        super(r, g, b, 0);
    }
}

Color.black = new Color(0, 0, 0);
Color.white = new Color(1, 1, 1);


module.exports = Color;
},{"./tuple":5}],3:[function(require,module,exports){
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

const myCanvas = new Canvas(10, 10);
fs.writeFile('my.png', myCanvas.toPPM(), (err)=> {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
});
},{"./canvas.js":1,"fs":4}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
class Tuple
{
    constructor(x, y, z, w)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    add(t)
    {
        return new Tuple(
            this.x + t.x,
            this.y + t.y,
            this.z + t.z,
            this.w + t.w,
        );
    }

    minus(t)
    {
        return new Tuple(
            this.x - t.x,
            this.y - t.y,
            this.z - t.z,
            this.w - t.w,
        );
    }

    multiply(t)
    {
        if(typeof(t) === "number")
        {
            return new Tuple(
                this.x * t,
                this.y * t,
                this.z * t,
                this.w * t,
            );
        }
        else
        {
            return new Tuple(
                this.x * t.x,
                this.y * t.y,
                this.z * t.z,
                this.w * t.w,
            );
        }
    }

    divide(t)
    {
        if(typeof(t) === "number")
        {
            return new Tuple(
                this.x / t,
                this.y / t,
                this.z / t,
                this.w / t,
            );
        }
        else
        {
            return new Tuple(
                this.x / t.x,
                this.y / t.y,
                this.z / t.z,
                this.w / t.w,
            );
        }
    }

    negative()
    {
        return new Tuple(
            -this.x,
            -this.y,
            -this.z,
            -this.w,
        );
    }
    
    magnitude()
    {
        return Math.sqrt(
            Math.pow(this.x, 2) +
            Math.pow(this.y, 2) +
            Math.pow(this.z, 2) +
            Math.pow(this.w, 2)
        );
    }

    normalize()
    {
        let mag = this.magnitude();

        return new Tuple(
            this.x / mag,
            this.y / mag,
            this.z / mag,
            this.w / mag,
        );
    }

    dot(t)
    {
        return Tuple.dot(this, t);
    }

    cross(t)
    {
        return Tuple.cross(this, t);
    }

    isPoint()
    {
        return Math.abs(this.w - 1.0) < Number.EPSILON;
    }
    
    isVector()
    {
        return Math.abs(this.w) < Number.EPSILON;
    }
    
    isEqual(t)
    {
        if(Math.abs(this.x - t.x) >= Number.EPSILON) return false;
        if(Math.abs(this.y - t.y) >= Number.EPSILON) return false;
        if(Math.abs(this.z - t.z) >= Number.EPSILON) return false;
        if(Math.abs(this.w - t.w) >= Number.EPSILON) return false;

        return true;
    }

    clone()
    {
        return new Tuple(this.x, this.y, this.z, this.w);
    }
    
    get red() { return this.x; } set red(value) { this.x = value; }
    get r() { return this.red; } set r(value) { this.red = value; }
    
    get green() { return this.y; } set green(value) { this.y = value; }
    get g() { return this.green; } set g(value) { this.green = value; }
    
    get blue() { return this.z; } set blue(value) { this.z = value; }
    get b() { return this.blue; } set b(value) { this.blue = value; }
    
    get alpha() {
        return this.a;
    }

    set alpha(value) {
        this.a = value;
    }

    toString()
    {
        return this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w;
    }
}

Tuple.dot = function(t1, t2) {
    return  t1.x * t2.x +
            t1.y * t2.y +
            t1.z * t2.z +
            t1.w * t2.w;
}

Tuple.cross = function(t1, t2) {
    return new Tuple(
        t1.y * t2.z - t1.z * t2.y,
        t1.z * t2.x - t1.x * t2.z,
        t1.x * t2.y - t1.y * t2.x,
        0);
}

Tuple.Factory = {};

Tuple.Factory.tuple = function(x, y, z, w)
{
    return new Tuple(x, y, z, w);
}

Tuple.Factory.point = function(x, y, z)
{
    return new Tuple(x, y, z, 1);
}

Tuple.Factory.vector = function(x, y, z)
{
    return new Tuple(x, y, z, 0);
}

Tuple.Factory.color = function(r, g, b)
{
    return new Tuple(r, g, b, 0);
}

module.exports = Tuple;
},{}]},{},[3]);
