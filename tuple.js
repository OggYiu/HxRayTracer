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