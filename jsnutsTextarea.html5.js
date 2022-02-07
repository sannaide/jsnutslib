function jsnutsTextareaHtml5(id_dom_input) {

	jsnutsInputtextHtml5.call(this,id_dom_input);

	// PROVE POLIMORFISMO OK, lancia initEvents() delle classi madre
	/*this.polymorph('jsnutsInputtextHtml5',this.initEvents);

	this.initEvents = function() {
		this.polymorph('jsnutsInputtextHtml5').fn.apply(this);

		// TEST
		this.addEvent('click',function(e) {
			alert('click textarea');
		});
	}*/

}
