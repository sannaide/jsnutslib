function jsnutsInputtextHtml5(id_dom_input) {
    
	jsnutsInput.call(this,id_dom_input);

	this.placeholder = 'inserisci del testo';
	this.shadowOn = false;
	this.utils = new jsnutsUtils();
	this.jsne = new jsnutsElement();
	
	var self = this;

	(function init() {
		self.jsne.setCacheOn(10);
	}());

	this.textToPlaceholder = function() {
		this.setVal('');
		this.setAttribute('placeholder',this.getPlaceholder());
		this.setStyle('color','lightgray');
	};

	this.getVal = function() {
		return this.getDOMEl().value;
	};

	this.setVal = function(value) {
		this.getDOMEl().value = value;
		return this;
	};

	this.setPlaceholder = function(placeholder) {
		this.placeholder = placeholder;
		this.textToPlaceholder();
	};

	this.getPlaceholder = function() {
		return this.placeholder;
	};

	this.setShadowOn = function() {
		this.shadowOn = true;
	};

	this.disable = function() {
		this.setStyle('background-color','#EBEBE4');
		this.removeClass('glowing_border');
		this.setAttribute('disabled','disabled');
	};

	this.enable = function() {
		this.removeAttribute('disabled');
		this.setStyle('background-color','white');
	};

	this.initUI = function() {
		if(this.getVal().length == 0)
			this.textToPlaceholder();
		else
			this.setStyle('color','#000');
	};

	// PROVE POLIMORFISMO OK, lancia initEvents() delle classi madre
	//this.polymorph('jsnutsInput',this.initEvents);

	this.initEvents = function() {

		// TEST POLIMORFISMO OK
		//var pmorph = this.polymorph(); // NO
		//eval('pmorph.fn.apply(this,['+pmorph.args+'])'); // NO
		//this.polymorph('jsnutsInput').fn.apply(this,[1,2,3]); // OK, anche con parametri

		// TEST POLIMORFISMO OK
		/*this.addEvent('click',function(e) {
			alert('click inputtext');
		});*/

		// TEMPDEBUG
		//this.addEvent('click',function(e) {
		//	self.textToPlaceholder();
		//});

		this.addEvent('focus',function(e) {
			if(!self.shadowOn)
				self.removeClass('glowing_border').addClass('glowing_border');
			else
				self.removeClass('input_class_shadow').addClass('input_class_shadow');
		});

		this.addEvent('blur',function() {
			if(!self.shadowOn)
				self.removeClass('glowing_border');
			else
				self.removeClass('input_class_shadow')
		});

		var printable_chars = /^[\u0020-\u007e\u00a0-\u00ff]*$/;
		this.addEvent('keydown',function(e) {
			var keyCode = (typeof e.which !== 'undefined') ? (e.which) : (e.keyCode);
			var backspace_pressed = (e.which == 8 || e.keyCode == 8);
			var canc_pressed = (e.which == 46 || e.keyCode == 46);
			var esc_pressed = (e.which == 27 || e.keyCode == 27);

			if(printable_chars.test(String.fromCharCode(keyCode)))
				self.setStyle('color','#000');

			if(((backspace_pressed || canc_pressed) && self.getVal().length == 1) ||
				((backspace_pressed || canc_pressed) && (self.utils.getInputSelection(self.getDOMEl()).start == 0 &&
					self.utils.getInputSelection(self.getDOMEl()).end == self.getVal().length))) {
				self.textToPlaceholder();
			}
		});

		/*this.addEvent('keyup',function(e) {
			//var keypressed = (typeof e.which !== 'undefined') ? e.which : e.keyCode;
			//if(!(keypressed >= 32 && keypressed <= 255)) return;
			//if(typeof e.key !== 'undefined' && e.key.length != 1) return;

			if(self.getVal().length > 0)
				self.setStyle('color','#000');
			else
				self.textToPlaceholder();
		});*/
	};

}
