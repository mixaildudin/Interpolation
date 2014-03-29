function BesselPoly( _x0, _h, _differences ) {
    var x0 = _x0,
        h = _h,
        differences = _differences;

    this.getValue = function( x ) {
        var t = (x - x0)/h,
            result,
			accumulator = t;

        result = differences[0];
        result += (t-0.5)*differences[1];

        for (var i = 2; i < differences.length; i++) {
            var coeff = getCoeff( i, t );
            result += coeff * differences[i];
        }

        return result;
		
		function getCoeff( i, t ) {
			var n = Math.floor( i/2 );
			
			accumulator /= i;
			
			var res = accumulator;	
			/*if( n > 1 )
				accumulator *= (sqr(t) - sqr(n-1));*/
			if( i%2 == 0 ) {
				if( n > 1 )
					accumulator *= (sqr(t) - sqr(n-1));
				res = accumulator*( t-n );
			}
			else if( i%2 == 1 )
				res = accumulator*( t-n )*( t-0.5 );

			return res;
		}
    }
}