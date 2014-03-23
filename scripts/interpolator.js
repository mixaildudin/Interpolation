var o;
window.onload = function() {
    var w = { A: 0, B: 3, C: 0, D: 1 };
    o = new Interpolator( 50, w );

}

/**
 *
 * @constructor Создает объект Интерполятор, который будет производить все вычисления
 * @param n Количество узлов интерполяции
 * @param intplnWindow Размеры области интерполирования
 */

function Interpolator( n, intplnWindow ) {
    this.finiteDifferences = [];
    this.nodesNum = n;
    this.windowA = intplnWindow.A;
    this.windowB = intplnWindow.B;
    this.windowC = intplnWindow.C;
    this.windowD = intplnWindow.D;
    var poly = new BesselPoly( this.finiteDifferences );
    var func = new ObjFunc( 1, 0, 1, 1, 1 );

    this.delta;
    this.step = (this.windowB - this.windowA) / ( 2*this.nodesNum+1 ); //расстояние между узлами

    this.start = function() {

    }

    /**
     * Создать массив узлов интерполяции для подсчета симметрических разностей
     * @returns {Array} Искомый массив
     */
    this.initFiniteDiffs = function() {
        var res = [],
            n = this.nodesNum;

        for( var i = 0; i < 2*(2*n+2)-1; i++ ) {
            var x = this.windowA + i * this.step/2;
            res.push( func.getValue(x) );
        }

        return res;
    }

    /**
     * Найти конечные (симметрические) разности
     * @returns {Array} Массив необходимых нам разностей (центральная линия в треугольнике)
     */
    this.countFiniteDiffs = function () {
        var values = [];
        var finiteDiffs = this.initFiniteDiffs();
        values.push( finiteDiffs[(finiteDiffs.length-1)/ 2] );

        for( var i = 0; i < 2*this.nodesNum + 1; i++ ) {
            finiteDiffs = this.getNextFiniteDiffs( finiteDiffs );
            values.push( finiteDiffs[(finiteDiffs.length-1)/ 2] );
        }
        return values;
    };

    this.getNextFiniteDiffs = function( current ) {
        var result = [];
        for (var i = 1; i < current.length - 1; i++) {
            result.push( current[i+1] - current[i-1] );
        }
        return result;
    }

   this.setNodesNum = function( n ) {
        this.nodesNum = n;
    };

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