/**
 * Создает объект Интерполятор, который будет производить все вычисления
 * @constructor
 */

function Interpolator( ) {

    this.finiteDifferences = [];
    this.nodesNum;
    this.windowA, this.windowB, this.windowC, this.windowD;
    this.delta;

    function func( x, alpha, beta, gamma, delta, eps ) {
        return delta * Math.cos(beta * x / (alpha*alpha - x*x)) + eps*Math.sin( gamma * x );
    }

    function setNodesNum( n ) {
        var LOWER_BOUND = 0, HIGHER_BOUND = 200;
        var correct = ( n > LOWER_BOUND && n <= HIGHER_BOUND );
        if( correct )
            this.nodesNum = n;
        else
            alert( "Количество узлов интерполяции должно быть от " + LOWER_BOUND + " до " + HIGHER_BOUND );

        return correct;
    }

    function setIntrplWindow( a, b, c, d ) {
        var LOWER_BOUND = -100, HIGHER_BOUND = 100;
        var correct = true;

        correct &= a >= LOWER_BOUND && a <= HIGHER_BOUND;
        correct &= b >= LOWER_BOUND && b <= HIGHER_BOUND;
        correct &= c >= LOWER_BOUND && c <= HIGHER_BOUND;
        correct &= d >= LOWER_BOUND && d <= HIGHER_BOUND;

        if( correct ) {
            this.windowA = a;
            this.windowB = b;
            this.windowC = c;
            this.windowD = d;
        }
        else
            alert( "Все координаты точек, задающих размер окна, должны быть в диапазоне от " + LOWER_BOUND + " до " + HIGHER_BOUND );

        return correct;
    }

    function setDelta( d ) {
        var ALLOWED_VALUES = [ 1, 1e-1, 1e-2, 1e-3, 1e-4 ];
        var correct = true;

        for (var i = 0; i < ALLOWED_VALUES.length; i++) {
            correct |= ALLOWED_VALUES[i];
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
    }

    //function countFiniteDiffs(

}