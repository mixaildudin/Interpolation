var o;
window.onload = function() {
    var w = { A: 0, B: 3, C: 0, D: 1 };
    o = new Interpolator( 6, w );

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
    this.poly = new BesselPoly( this.finiteDifferences );

    this.delta;
    this.step = (this.windowB - this.windowA) / ( this.nodesNum ); //расстояние между узлами

    Interpolator.prototype.func = function( x, alpha, beta, gamma, delta, eps ) {
        return delta * Math.cos(beta * x / (alpha*alpha - x*x)) + eps*Math.sin( gamma * x );
    };

    Interpolator.prototype.start = function() {
        var nodes = this.createNodeList();
        var values = [];
        for( var i = 0; i < nodes.length; i++ )
            values.push( this.func(nodes[i], 5, 1, 1, 1, 1) );
    }

    Interpolator.prototype.createNodeList = function() {
        var res = [], x0 = this.windowA,
            nodesNum = this.nodesNum;
        for( var i = -nodesNum; i < nodesNum+1; i++ )
            res.push( x0 + i * this.step );

        return res;
    }

    Interpolator.prototype.countFiniteDiffs = function () {

    };

    Interpolator.prototype.setNodesNum = function( n ) {
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