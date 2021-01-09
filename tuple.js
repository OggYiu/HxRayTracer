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
        return Tuple.Dot(this, t);
    }

    cross(t)
    {
        return Tuple.Cross(this, t);
    }

    isPoint()
    {
        return Math.abs(this.w - 1.0) < Number.EPSILON;
    }
    
    isVector()
    {
        return Math.abs(this.w) < Number.EPSILON;
    }
}

Tuple.Dot = function(t1, t2) {
    return  t1.x * t2.x +
            t1.y * t2.y +
            t1.z * t2.z +
            t1.w * t2.w;
}

Tuple.Cross = function(t1, t2) {
    return new Tuple(
        t1.y * t2.z - t1.z * t2.y,
        t1.z * t2.x - t1.x * t2.z,
        t1.x * t2.y - t1.y * t2.x,
        0);
}

module.exports = Tuple;