function jsnutsTextarea(id_dom_input) {

	jsnutsInputtext.call(this,id_dom_input);

	var self = this;

	var ftagInitEvents = 'jsnutsInputtextInitEvents';
	this.polymorph(ftagInitEvents,this.initEvents);
	this.initEvents = function() {
		this.polymorph(ftagInitEvents).fn.apply(this);
		this.addEvent('keydown',function(e) {
			var enter_pressed = (e.which == 13 || e.keyCode == 13);
			if(enter_pressed && self.getVal().length == 0) {
				self.setVal('');
				self.setStyle('color','black');
			}
		});
	};

}
