function View( placeholder ) {

	var functions = [];

	/**
	 * Отрисовать все графики
	 * @param args Массив точек (ось Х)
	 * @param values Массив массивов из значений функций в этих точках
	 */
	this.drawPlot = function( args, values ) {

	}

	this.draw = function() {
		$.plot(placeholder, functions, {
			xaxis: {
				ticks: 10,
				min: 0,
				max: 4
			},
			yaxis: {
				ticks: 10,
				min: -10,
				max: 15
			},
			colors : ['#f00', '#00f']
		});
	}

	this.addPlot = function( args, values, label ) {
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
	}
}
