function jsnutsInputRadios() {

	jsnutsObject.call(this);

	this.clicked = null;

	this.resetPrec = function() {
		if(this.clicked != null) {
			this.clicked.reset();
		}
	};

	this.setClicked = function(clicked) {
		this.clicked = clicked;
	};

}