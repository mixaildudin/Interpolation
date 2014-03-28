function BesselPoly( _x0, _h, _differences ) {
    var x0 = _x0,
        h = _h,
        differences = _differences;

    this.getValue = function( x ) {
        var t = (x0 - x)/h,
            result,
            coeff = t;

        result = differences[0];
        result += (t-0.5)*differences[1];

        for (var i = 2; i < differences.length; i++) {
            coeff = getCoeff( i, t, coeff );
            result += coeff * differences[i];
        }

        return result;
    }

    //TODO:
    function getCoeff( i, t, prevMember ) {
        var factor = prevMember,
            n = Math.floor( i/2 );
        if( i%2 == 1 ) {
            factor *= ( t - 0.5 );
        }
        else {
            factor *= ( t - n );
            if( n != 1 )
                factor *= ( t*t - n*n );
        }
        factor /= i;

        return factor;
    }
}