/**
 * @constructor Создает объект Интерполятор, который будет производить все вычисления
 */

function Interpolator( ) {
	var nodesNum;
    var intervalA, intervalB;
    var delta,
		step,
    	x0,
		func, poly;

	var points = [],//массив точек, в которых будем считать значения функции, полинома и т.д.
		funcValues = [],
		polyValues = [],
		diffValues = [],
		funcDerivValues = [],
		polyDerivValues = [],
		maxDiff = {};

    this.start = function() {
		step = (intervalB - intervalA) / ( 2*nodesNum+1 ); //расстояние между узлами;
		x0 = (intervalB + intervalA)/2 - step/2;
        var finiteDifferences = countFiniteDiffs();
        var points = [];
        poly = new BesselPoly( x0, step, finiteDifferences );

        for( var i = 0; i < 2*nodesNum+2; i++ ) {
            var x = intervalA + i * step;
            points.push(x);
        }

		console.log( "POINT\t\t\t\tFUNCTION\t\t\t\tPOLY" );
        for( var i = 0; i < 2*nodesNum+2; i++ ) {
            console.log( points[i] + "\t" + func.getValue(points[i]) + "\t" + poly.getValue( points[i] ) + "\n" );
        }

		countValues();
    }

    /**
     * Создать массив значений функции в узлах интерполяции для подсчета симметрических разностей
     * @returns {Array} Искомый массив
     */
    function initFiniteDiffs() {
        var res = [],
            n = nodesNum;

        for( var i = 0; i < 2*n+2; i++ ) {
            var x = intervalA + i * step;
            res.push( func.getValue(x) );
        }

        return res;
    }

    /**
     * Найти конечные (симметрические) разности
     * @returns {Array} Массив необходимых нам разностей (центральная линия в треугольнике)
     */
    function countFiniteDiffs() {
        var values = [];
        var intermediateDiffs = initFiniteDiffs();

        for( var i = 0; i < 2*nodesNum + 2; i++ ) {
            if( i%2 == 0 ) {
                var f0 = intermediateDiffs[ (intermediateDiffs.length/2) - 1],
                    f1 = intermediateDiffs[ (intermediateDiffs.length/2) ];
                values.push( getMu(f0, f1) );
            }
            else if( i%2 == 1 ) {
                values.push( intermediateDiffs[(intermediateDiffs.length-1)/ 2] );
            }
            intermediateDiffs = getNextFiniteDiffs( intermediateDiffs );
        }
        return values;
    };

    function getNextFiniteDiffs( current ) {
        var result = [];
        for (var i = 1; i < current.length; i++) {
            result.push( current[i] - current[i-1] );
        }
        return result;
    }

    function getMu( a, b ) {
        return (b+a)/2;
    }

    this.setNodesNum = function( n ) {
        nodesNum = n;
    };

	this.setObjFunction = function( f ) {
		func = f;
	}

	this.setDelta = function( d ) {
		delta = d;
	}

	this.setIntrpInterval = function( A, B ) {
		intervalA = A;
		intervalB = B;
	}

	/*this.getXPoints = function() {
		var res = [];
		for( var x = intervalA; x <= intervalB; x += step )
			res.push(x);

		return res;
	}*/

	this.setPoints = function( p ) {
		points = p;
	}

	function countValues() {
		countFuncValues();
		countPolyValues();
		countDiffValues();
		countFuncDerivative();
		countPolyDerivative();
	}

	function countFuncValues() {
		funcValues = [];
		for ( var i = 0; i < points.length; i++ ) {
			var x = points[i];
			funcValues.push( func.getValue(x) );
		}
	}

	this.getFuncValuesArray = function() {
		return funcValues;
	}

	function countPolyValues() {
		polyValues = [];
		for ( var i = 0; i < points.length; i++ ) {
			var x = points[i];
			polyValues.push( poly.getValue(x) );
		}
	}

	this.getPolyValuesArray = function() {
		return polyValues;
	}

	function countDiffValues() {
		diffValues = [];
		var max = -Infinity;
		for ( var i = 0; i < points.length; i++ ) {
			var x = points[i];
			var diff = func.getValue(x) - poly.getValue(x);
			diffValues.push( diff );
			if( diff > max ) {
				maxDiff = {
					'x': points[i],
					'val': diff
				};
				max = diff;
			}
		}
	}

	this.getDiffValuesArray = function() {
		return diffValues;
	}

	this.getMaxDiffValue = function() {
		return maxDiff;
	}

	function countFuncDerivative() {
		funcDerivValues = [];
		for ( var i = 0; i < points.length; i++ ) {
			var x = points[i];
			funcDerivValues.push( (1/delta) * ( func.getValue(x+delta) - func.getValue(x) ) );
		}
	}

	this.getFuncDerivValuesArray = function() {
		return funcDerivValues;
	}

	function countPolyDerivative() {
		polyDerivValues = [];
		for ( var i = 0; i < points.length; i++ ) {
			var x = points[i];
			polyDerivValues.push( (1/delta) * ( poly.getValue(x+delta) - poly.getValue(x) ) );
		}
	}

	this.getPolyDerivValuesArray = function() {
		return polyDerivValues;
	}
}