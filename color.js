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