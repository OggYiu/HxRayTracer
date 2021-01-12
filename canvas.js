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