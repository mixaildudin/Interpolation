/**
 * @constructor Создает объект Интерполятор, который будет производить все вычисления
 * @param func Функция для интерполяции
 * @param n Количество узлов интерполяции
 * @param intplnWindow Размеры области интерполирования
 */

function Interpolator( func, n, intplnWindow ) {
    var nodesNum = n;
    var windowA = intplnWindow.A,
        windowB = intplnWindow.B,
        windowC = intplnWindow.C,
        windowD = intplnWindow.D;
    var delta;
    var step = (windowB - windowA) / ( 2*nodesNum+1 ); //расстояние между узлами
    var x0 = (windowB - windowA)/2 - step/2;
	var poly;

    this.start = function() {
        var finiteDifferences = countFiniteDiffs();
        var points = [];
        poly = new BesselPoly( x0, step, finiteDifferences );

        console.log( finiteDifferences );

        for( var i = 0; i < 2*n+2; i++ ) {
            var x = windowA + i * step;
            points.push(x);
        }

		console.log( "POINT\t\t\t\tFUNCTION\t\t\t\tPOLY" );
        for( var i = 0; i < 2*n+2; i++ ) {
            console.log( points[i] + "\t" + func.getValue(points[i]) + "\t" + poly.getValue( points[i] ) + "\n" );
        }
    }

    /**
     * Создать массив значений функции в узлах интерполяции для подсчета симметрических разностей
     * @returns {Array} Искомый массив
     */
    function initFiniteDiffs() {
        var res = [],
            n = nodesNum;

        for( var i = 0; i < 2*n+2; i++ ) {
            var x = windowA + i * step;
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

    this.getNodesNum = function() {
        return nodesNum;
    }

	this.setObjFunction = function( f ) {
		func = f;
	}

	this.getXPoints = function() {
		var res = [];
		for( var x = windowA; x <= windowB; x += step )
			res.push(x);

		return res;
	}

	this.countFuncValues = function( points ) {
		var res = [];
		for ( var i = 0; i < points.length; i++ ) {
			var x = points[i];
			res.push( func.getValue(x) );
		}

		return res;
	}

	this.countPolyValues = function( points ) {
		var res = [];
		for ( var i = 0; i < points.length; i++ ) {
			var x = points[i];
			res.push( poly.getValue(x) );
		}

		return res;
	}

    /*Interpolator.prototype.setNodesNum = function( n ) {
        var LOWER_BOUND = 0, HIGHER_BOUND = 200;
        var correct = isNumber(n) && ( n > LOWER_BOUND && n <= HIGHER_BOUND );
        if( correct )
            this.nodesNum = n;
        else
            alert( "Количество узлов интерполяции должно быть числом от " + LOWER_BOUND + " до " + HIGHER_BOUND );

        return correct;
    }

    Interpolator.prototype.setIntrplWindow = function( a, b, c, d ) {
        var LOWER_BOUND = -100, HIGHER_BOUND = 100;
        var correct = true;

        correct &= isNumber(a) >= LOWER_BOUND && a <= HIGHER_BOUND;
        correct &= isNumber(b) >= LOWER_BOUND && b <= HIGHER_BOUND;
        correct &= isNumber(c) >= LOWER_BOUND && c <= HIGHER_BOUND;
        correct &= isNumber(d)  >= LOWER_BOUND && d <= HIGHER_BOUND;

        if( correct ) {
            this.windowA = a;
            this.windowB = b;
            this.windowC = c;
            this.windowD = d;
        }
        else
            alert( "Все координаты точек, задающих размер окна, должны быть числами в диапазоне от " + LOWER_BOUND + " до " + HIGHER_BOUND );

        return correct;
    }

    Interpolator.prototype.setDelta = function( d ) {
        var ALLOWED_VALUES = [ 1, 1e-1, 1e-2, 1e-3, 1e-4 ];
        var correct = isNumber(d);

        for (var i = 0; i < ALLOWED_VALUES.length; i++) {
            correct |= (d == ALLOWED_VALUES[i]);
        }

        if( correct )
            this.delta = d;
        else {
            var buffer = "";
            for (var i = 0; i < ALLOWED_VALUES.length; i++) {
                buffer += ALLOWED_VALUES[i] + " ";
            }
            alert( "Дельта должна принимать одно из следующих значений: " + buffer );
        }

        return correct;
    }*/
}