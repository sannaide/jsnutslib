function jsnutsInputtext(id_dom_input) {
    
	jsnutsInput.call(this,id_dom_input);

	this.utils = new jsnutsUtils();
	this.input_text_insert = false;
	this.placeholder = 'inserisci del testo';
	this.vml_on = false;
	this.radii = 0;
	this.blur = 0;
	this.shadowOn = false;
	this.vmlObj = null;
	this.jsne = new jsnutsElement();
	
	var self = this;

	(function init() {
		self.jsne.setCacheOn(10);
		self.jsne.detachOff();
	}());

	this.textToPlaceholder = function() {
		this.setVal(this.placeholder);
		this.setStyle('color','#CCC');
		this.input_text_insert = false;
	};

	this.getVars = function() {
		var thisVars = {};
		for(var p in this) { if(typeof this[p] !== 'function') thisVars[p] = this[p]; }
		return thisVars;
	};

	this.setVmlOn = function() {
		this.vml_on = true;
		if(this.vmlObj == null) this.vmlObj = new jsnutsVML();
	};

	this.setShadowOn = function() {
		this.shadowOn = true;
	};

	this.getVal = function() {
		var DOMElvalue = this.getDOMEl().value;
		if(DOMElvalue == this.placeholder && !this.input_text_insert)
			return '';
		else
			return DOMElvalue;
	};

	this.setVal = function(value) {
		this.getDOMEl().value = value;
		this.input_text_insert = true;
		return this;
	};

	this.setPlaceholder = function(placeholder) {
		this.placeholder = placeholder;
		this.textToPlaceholder();
	};

	this.getPlaceholder = function() {
		return this.placeholder;
	};

	this.setRadii = function(radii) {
		this.radii = radii;
		this.blur = radii;
	};

	this.setBlur = function(blur) {
		this.blur = blur;
	};

	this.disable = function() {
		this.setStyle('background-color','#EBEBE4');
		this.removeClass('glowing_border');
		this.setAttribute('disabled','disabled');
		if(this.vml_on) {
			var id_dom = this.getId();
			this.jsne.findById(id_dom + '_focus_gradient').remove();
			this.jsne.findById(id_dom + '_focus_bkgnd').removeEvent('click').remove();
			this.jsne.findById(id_dom + '_focus_border').removeEvent('click').remove();
			var inputtext_wpm = this.width() + (this.getStyle('margin',{styleToInt:true}) * 2) + 2;
			var inputtext_hpm = this.height() + (this.getStyle('margin',{styleToInt:true}) * 2); // jquery toglie 2 da height()
			var inputtext_bkgnd_path = this.vmlObj.getBoxPath(inputtext_wpm,inputtext_hpm,null,2,this.radii);
			this.vmlObj.createInputtextFocusbkgnd(id_dom,inputtext_wpm,inputtext_hpm,inputtext_bkgnd_path,'#EBEBE4');
			var inputtext_left = this.getLpos();
			var inputtext_top = this.getTpos();
			this.jsne.findById(id_dom + '_focus_bkgnd').setLTpos(inputtext_left,inputtext_top);
			this.jsne.findById(id_dom + '_nofocus').removeEvent('click');
		}
	};

	this.enable = function() {
		this.setStyle('background-color','white');
		this.removeAttribute('disabled');
		if(this.vml_on) {
			var id_dom = this.getId();
			this.jsne.findById(id_dom + '_nofocus').remove();
			this.jsne.findById(id_dom + '_focus_bkgnd').remove();
			this.initUI();
			this.jsne.findById(id_dom + '_focus_bkgnd').addEvent('click',function() {
				self.utils.setCursorPosition(self.getDOMEl(),self.getVal().length);
				//self.fnclick();
			});
			this.jsne.findById(id_dom + '_focus_border').addEvent('click',function() {
				self.utils.setCursorPosition(self.getDOMEl(),self.getVal().length);
				//self.fnclick();
			});
			this.jsne.findById(id_dom + '_nofocus').addEvent('click',function() {
				self.utils.setCursorPosition(self.getDOMEl(),self.getVal().length);
				//self.fnclick();
			});

		}
	};

        // DEVMOD
	this.reposition = function(/*x,y*/) {
		if(this.vml_on) {
			var id_dom = this.getId();
			var inputtext_left = /*x || */this.getLpos();
			var inputtext_top = /*y || */this.getTpos();
			if(this.getAttribute('disabled') != 'disabled') {
				this.jsne.findById(id_dom + '_nofocus').setLTpos(inputtext_left,inputtext_top);
				this.jsne.findById(id_dom + '_focus_gradient').setLTpos(inputtext_left,inputtext_top);
				this.jsne.findById(id_dom + '_focus_bkgnd').setLTpos(inputtext_left,inputtext_top);
				this.jsne.findById(id_dom + '_focus_border').setLTpos(inputtext_left,inputtext_top);
			}else {
				this.jsne.findById(id_dom + '_nofocus').setLTpos(inputtext_left,inputtext_top);
				this.jsne.findById(id_dom + '_focus_bkgnd').setLTpos(inputtext_left,inputtext_top);
			}
		}
	};

	this.removeUIE = function() {
		if(this.vml_on) {
			var id_dom = this.getId();
			this.jsne.findById(id_dom + '_nofocus').removeEvent('click').remove();
			this.jsne.findById(id_dom + '_focus_gradient').remove();
			this.jsne.findById(id_dom + '_focus_bkgnd').removeEvent('click').remove();
			this.jsne.findById(id_dom + '_focus_border').removeEvent('click').remove();
		}
		this.removeEvent('focus');
		this.removeEvent('click');
		this.removeEvent('blur');
		this.removeEvent('keydown');
		this.removeEvent('keypress');

		// ? chiama quelle del chiamante...forse perchè
		// lì le ridefinisco (vedi jsnutsCombo)
		//this.initUI();
		//this.initEvents();
	};

	this.initUI = function() {
		if(this.getVal().length == 0)
			this.textToPlaceholder();
		else
			this.setStyle('color','#000');

		if(this.vml_on) {
			var inputtext_wpm = this.width() + (this.getStyle('margin',{styleToInt:true}) * 2) + 2;
			var inputtext_hpm = this.height() + (this.getStyle('margin',{styleToInt:true}) * 2); // jquery toglie 2 da height()
			var inputtext_rborders_path = this.vmlObj.getBorderSegments(inputtext_wpm,inputtext_hpm,2,this.radii);

			var inputtext_gradient_path;
			var inputtext_focus;

			if(!this.shadowOn) {
				// glowing border
				inputtext_gradient_path = this.vmlObj.getBoxPath(
					inputtext_wpm,inputtext_hpm, { t: -this.blur, r: -this.blur, b: -this.blur, l: -this.blur },2,this.radii); // era this.blur
				inputtext_focus = this.vmlObj.getFillFocus(inputtext_wpm,inputtext_hpm,this.blur);
			}else {
				// shadow
				inputtext_gradient_path = this.vmlObj.getBoxPath(
					inputtext_wpm,inputtext_hpm, { t: -this.blur * 0.0, r: -this.blur * 0.6, b: -this.blur * 0.8, l: -this.blur * 0.6 },2,this.radii);
				inputtext_focus = this.vmlObj.getFillFocus(inputtext_wpm,inputtext_hpm,this.blur * 0.5);
			}

			// piccolo bordo (vedi jsnutsVML.createInputtextFocusgradient)
			//var inputtext_gradient_path = this.vmlObj.getBoxPath(
			//	inputtext_wpm,inputtext_hpm, { t: -2, r: -2, b: -2, l: -2 },2,5);

			var inputtext_bkgnd_path = this.vmlObj.getBoxPath(inputtext_wpm,inputtext_hpm,null,2,this.radii);

			var id_dom = this.getId();
			this.vmlObj.createInputtextNoFocus(id_dom,inputtext_wpm,inputtext_hpm,inputtext_rborders_path);
			if(!this.shadowOn)
				this.vmlObj.createInputtextFocusgradient(id_dom,inputtext_wpm,inputtext_hpm,inputtext_gradient_path,inputtext_focus);
			else
				this.vmlObj.createInputtextFocusgradient(id_dom,inputtext_wpm,inputtext_hpm,inputtext_gradient_path,inputtext_focus,'#999');
			this.vmlObj.createInputtextFocusbkgnd(id_dom,inputtext_wpm,inputtext_hpm,inputtext_bkgnd_path);
			if(!this.shadowOn)
				this.vmlObj.createInputtextFocusborder(id_dom,inputtext_wpm,inputtext_hpm,inputtext_rborders_path);
			else
				this.vmlObj.createInputtextFocusborder(id_dom,inputtext_wpm,inputtext_hpm,inputtext_rborders_path,'#999');

			var inputtext_left = this.getLpos();
			var inputtext_top = this.getTpos();
			this.jsne.findById(id_dom + '_nofocus').setLTpos(inputtext_left,inputtext_top);
			this.jsne.findById(id_dom + '_nofocus').setStyle('visibility','visible');
			this.jsne.findById(id_dom + '_focus_gradient').setLTpos(inputtext_left,inputtext_top);
			this.jsne.findById(id_dom + '_focus_bkgnd').setLTpos(inputtext_left,inputtext_top);
			this.jsne.findById(id_dom + '_focus_border').setLTpos(inputtext_left,inputtext_top);
		}
	};

	// TEST OK
	//this.polymorph(this.initEvents);

	this.initEvents = function() {

		// TEST OK
		//this.polymorph().apply(this);

		this.addEvent('focus',function(e) {
			if(!self.vml_on) {
				if(!self.shadowOn)
					self.removeClass('glowing_border').addClass('glowing_border');
				else
					self.removeClass('input_class_shadow').addClass('input_class_shadow');
			}
			else {
				var id_dom = self.getId();
				self.jsne.findById(id_dom + '_nofocus').setStyle('visibility','hidden');
				self.jsne.findById(id_dom +'_focus_gradient').setStyle('visibility','visible');
			}

			if(self.getVal().length == 0)
				self.utils.setCursorPosition(self.getDOMEl(),0);
		});

		this.addEvent('click',function(e) {
			if(self.getVal().length == 0)
				self.utils.setCursorPosition(self.getDOMEl(),0);
		});

		if(self.vml_on) {
			var id_dom = self.getId();
			self.jsne.findById(id_dom + '_focus_bkgnd').addEvent('click',function() {
				self.utils.setCursorPosition(self.getDOMEl(),self.getVal().length);
				//self.fnclick();
			});
			self.jsne.findById(id_dom + '_focus_border').addEvent('click',function() {
				self.utils.setCursorPosition(self.getDOMEl(),self.getVal().length);
				//self.fnclick();
			});
			self.jsne.findById(id_dom + '_nofocus').addEvent('click',function() {
				self.utils.setCursorPosition(self.getDOMEl(),self.getVal().length);
				//self.fnclick();
			});
		}

		this.addEvent('blur',function() {
			if(self.getVal().length == 0)
				self.textToPlaceholder();
			if(!self.vml_on) {
				if(!self.shadowOn)
					self.removeClass('glowing_border');
				else
					self.removeClass('input_class_shadow');
			}
			else {
				var id_dom = self.getId();
				self.jsne.findById(id_dom + '_focus_gradient').setStyle('visibility','hidden');
				self.jsne.findById(id_dom + '_nofocus').setStyle('visibility','visible');
			}
		});

		this.addEvent('keydown',function(e) {
			var backspace_pressed = (e.which == 8 || e.keyCode == 8);
			var canc_pressed = (e.which == 46 || e.keyCode == 46);
			var esc_pressed = (e.which == 27 || e.keyCode == 27);
			var end_pressed = (e.which == 35 || e.keyCode == 35);
			var pgdown_pressed = (e.which == 34 || e.keyCode == 34);
			var left_pressed = (e.which == 37 || e.keyCode == 37);
			var right_pressed = (e.which == 39 || e.keyCode == 39);
			//var enter_pressed = (e.which == 13 || e.keyCode == 13);

			if((backspace_pressed || canc_pressed) && self.getVal().length == 0)
				return false;

			if(((backspace_pressed || canc_pressed) && self.getVal().length == 1) ||
				((backspace_pressed || canc_pressed) && (self.utils.getInputSelection(self.getDOMEl()).start == 0 &&
					self.utils.getInputSelection(self.getDOMEl()).end == self.getVal().length))) {
				self.textToPlaceholder();
				self.utils.setCursorPosition(self.getDOMEl(),0);
				return false;
			}

			if(esc_pressed)
				return false;

			if(((end_pressed || pgdown_pressed || left_pressed || right_pressed) && self.getVal().length == 0)) {
				return false;
			}

			//if(enter_pressed && self.getVal().length == 0) {
			//	self.setVal('');
			//	self.setStyle('color','black');
			//}
		});

		this.addEvent('keypress',function(e) {
			var keypressed = (typeof e.which !== 'undefined') ? e.which : e.keyCode;
			if(!(keypressed >= 32 && keypressed <= 255)) return;
			if(!self.input_text_insert) {
				self.setVal('');
				self.setStyle('color','black');
			}
			self.input_text_insert = true;
		});

	};
}
