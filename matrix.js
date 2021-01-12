class Matrix
{
    constructor(array2d)
    {
        this._col = array2d[0].length;
        this._row = array2d.length;
        
        for(let i = 0; i < array2d.length; ++i)
        {
            for(let j = 0; j < array2d[i].length; ++j)
            {
                array2d[i][j] = parseFloat(array2d[i][j]);
            }
        }
        this.elements = array2d;
    }

    element(row, col)
    {
        return this.elements[row][col];
    }

    equal(m)
    {
        return Matrix.equal(this, m);
    }

    get col() { return this._col; }
    get row() { return this._row; }
}

Matrix.equal = function(m1, m2) {
    if(m1.width != m2.width) return false;
    if(m1.height != m2.height) return false;

    let row = m1.row;
    let col = m1.col;
    for(let i = 0; i < row; ++i)
    {
        for(let j = 0; j < col; ++j)
        {
            if(m1.element(i, j) != m2.element(i, j)) return false;
        }
    }

    return true;
}

module.exports = Matrix;