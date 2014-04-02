var windowA = 0, windowB = 5, windowC = -15, windowD = 15;
var n = 4;
var delta = 1e-4;

$(document).ready( function() {
	var w = { A: windowA, B: windowB, C: windowC, D: windowD };
	var func = new ObjFunc( 2, 4, 6, 1, 1 );
	var o = new Interpolator( func, n, delta, w );
	var view = new View( getEl('plot') );

	o.start();

	var points = createPointsArray();
	var funcValues = o.countFuncValues( points );
	var polyValues = o.countPolyValues( points );
	var diffValues = o.countDiffValues( points );
	var funcDerivValues = o.countFuncDerivative( points );
	var polyDerivValues = o.countPolyDerivative( points );

	view.clear();
	view.addPlot( points, funcValues, 'f(x)', '#f00' );
	view.addPlot( points, polyValues, 'p(x)', '#00f' );
	view.addPlot( points, diffValues, 'r(x)', '#0f0' );
	view.addPlot( points, funcDerivValues, '∂f(x)', '#FF00FF' );
	view.addPlot( points, polyDerivValues, '∂p(x)', '#FFA500' );
	view.draw( w );
});

function createPointsArray() {
	var step = (windowB - windowA) / $('#plot').width();
	var result = [];
	for ( var i = windowA; i < windowB ; i += step )
		result.push(i);
	result.push( windowB ); //иначе правая граница может быть не учтена из-за погрешностей

	return result;
}