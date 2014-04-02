function Controller() {

	var view = new View( getEl('plot') );
	var interpolator = new Interpolator();
	var intrpWindow = {};
	var points = [];

	this.start = function() {
		intrpWindow = {
			'A': +getEl('windowA_input').value,
			'B': +getEl('windowB_input').value,
			'C': +getEl('windowC_input').value,
			'D': +getEl('windowD_input').value
		};

		var func = new ObjFunc(
			+getEl('alpha_input').value,
			+getEl('beta_input').value,
			+getEl('gamma_input').value,
			+getEl('delta_input').value,
			+getEl('eps_input').value
		);

		interpolator.setObjFunction( func );
		interpolator.setNodesNum( +getEl('n_input').value );
		interpolator.setIntrpInterval( intrpWindow.A, intrpWindow.B );
		interpolator.setDelta( +getEl('delta_deriv_input').value );
		points = createPointsArray();
		interpolator.setPoints( points );

		interpolator.start();

		this.drawAccordingToChoices();

		showMaxDifference();
	}

	function createPointsArray() {
		var windowA = +getEl('windowA_input').value,
			windowB = +getEl('windowB_input').value;
		var step = (windowB - windowA) / $('#plot').width();
		var result = [];
		for ( var i = windowA; i < windowB ; i += step )
			result.push(i);
		result.push( windowB ); //иначе правая граница может быть не учтена из-за погрешностей

		return result;
	}

	this.drawAccordingToChoices = function(){
		view.clear();
		if( getEl('draw_f').checked )
			view.addPlot( points, interpolator.getFuncValuesArray(), 'f(x)', '#f00' );
		if( getEl('draw_p').checked )
			view.addPlot( points, interpolator.getPolyValuesArray(), 'p(x)', '#00f' );
		if( getEl('draw_r').checked )
			view.addPlot( points, interpolator.getDiffValuesArray(), 'r(x)', '#0f0' );
		if( getEl('draw_fd').checked )
			view.addPlot( points, interpolator.getFuncDerivValuesArray(), '∂f(x)', '#FF00FF' );
		if( getEl('draw_pd').checked )
			view.addPlot( points, interpolator.getPolyDerivValuesArray(), '∂p(x)', '#FFA500' );

		view.draw( intrpWindow );
	}

	function showMaxDifference() {
		var max = interpolator.getMaxDiffValue();

		getEl('max_rx').innerHTML = max.val;
		getEl('max_rx_x').innerHTML = max.x;
	}
}