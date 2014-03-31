function View( placeholder ) {

	var functions = [];
	var colors = [];

	/**
	 * Отрисовать все графики
	 * @param args Массив точек (ось Х)
	 * @param values Массив массивов из значений функций в этих точках
	 */
	this.drawPlot = function( args, values ) {

	}

	this.draw = function( w ) {
		$.plot(placeholder, functions, {
			'xaxis': {
				min: w.A,
				max: w.B
			},
			'yaxis': {
				min: w.C,
				max: w.D
			},
			'colors' : colors
		});
	}

	this.addPlot = function( args, values, label, col ) {
		var graph = [];
		if( args.length != values.length )
			return;

		for ( var i = 0; i < values.length; i++ ) {
			graph.push( [ args[i], values[i] ] );
		}

		functions.push({
			'label': label,
			'data': graph
		});

		colors.push( col );
	}

	this.clear = function() {
		functions = [];
		colors = [];
	}
}
