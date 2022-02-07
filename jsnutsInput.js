function jsnutsInput(id_dom_input) {

	jsnutsElement.call(this);

	if(typeof id_dom_input !== 'undefined')
		this.findById(id_dom_input);
	this.detachOff();

	// TEST POLIMORFISMO OK, anche con parametri
	/*this.initEvents = function(a,b,c) {
		this.addEvent('click',function(e) {
			alert('click input parametro: ' + a);
		});
	}*/

}