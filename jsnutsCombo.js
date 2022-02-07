function jsnutsCombo(
	id_dom_input,
	id_dom_dropdown,
	id_dom_dropdown_container) {

	if(!jsnutsGlobals.stdHTML5 || jsnutsGlobals.curBrowser == 'IE9')
		jsnutsInputtext.call(this,id_dom_input);
	else
		jsnutsInputtextHtml5.call(this,id_dom_input);

	this.id_dom_dropdown = id_dom_dropdown;
	this.id_dom_dropdown_container = id_dom_dropdown_container;
	this.jsneDropdown = new jsnutsElement();
	this.jsneDropdownc = new jsnutsElement();
	this.jsneDDButton = new jsnutsElement();
	this.jsne = new jsnutsElement();
	this.a_dom_onmousemove = null;
	this.a_height = -1;
	this.goToScroll = 0;
	this.savedScrollTop = -1;
	this.suggestions_options = null;
	this.suggestions_options_filtered = [];
	this.suggestions_selected_option_val = -1;
	this.suggestions_hilight_idx = -1;
	this.suggestions_cur_hilight_idx = -1;
	this.combo_button = null;

	this.utils = new jsnutsUtils();

	var self = this;
	var idTimeout = -1;

	(function init() {
		if(typeof id_dom_dropdown !== 'undefined') {
			self.jsneDropdown.findById(id_dom_dropdown);
			self.jsneDDButton.findById(id_dom_dropdown + '_button');
		}
		if(typeof id_dom_dropdown_container !== 'undefined')
			self.jsneDropdownc.findById(id_dom_dropdown_container);
		self.jsneDropdown.detachOff();
		self.jsneDropdownc.detachOff();
		self.jsneDDButton.detachOff();
		self.jsne.detachOff();
	}());

	this.getCVal = function() {
		if(this.suggestions_cur_hilight_idx >= 0)
			return this.suggestions_options[this.suggestions_cur_hilight_idx][0];
		else
			return void 0;
	};

	this.getCText = function() {
		if(this.suggestions_cur_hilight_idx >= 0)
			return this.suggestions_options[this.suggestions_cur_hilight_idx][1];
		else
			return void 0;
	};

	this.setOptions = function(options) {
		this.suggestions_options = new Array(options.length);
		for(var i = 0;i < options.length;i++)
			this.suggestions_options[i] = options[i];
	};

	this.setComboButton = function(combo_button) {
		this.combo_button = combo_button;
	};

	this.suggestionsAppend = function(option,val) {
		++this.suggestions_hilight_idx;
		var a_dropdown = new jsnutsElement()
			.detachOff()
			.setDOMEl(document.createElement('a'))
			.append(document.createTextNode(option));
		a_dropdown.setAttribute('id','a_suggestions_' + this.suggestions_hilight_idx);
		a_dropdown.setAttribute('href','javascript(void);');
		this.jsneDropdown.append(a_dropdown);
		this.suggestions_options_filtered.push([
			val,option
		]);
	};

	this.populateSuggestions = function(strsearch) {
		var populateAll = (typeof strsearch === 'undefined');
		this.suggestions_hilight_idx = this.suggestions_cur_hilight_idx = -1;
		this.suggestions_options_filtered = [];
		this.jsneDropdown.setHtml('');
		// cerco nelle options
		var cnt = 0;
		for(var i in this.suggestions_options) {
			if(populateAll || this.suggestions_options[i][1].toLowerCase().indexOf(strsearch.toLowerCase()) > -1) {
				this.suggestionsAppend(this.suggestions_options[i][1],this.suggestions_options[i][0]);
				++cnt;
			}
		}
		this.jsneDropdown.height(this.a_height * cnt);
		self.jsneDropdownc.setStyle('visibility','visible');
		self.jsneDropdown.setStyle('display','');
	};

	this.initAlinkEvents = function() {
		this.forEach(this.jsneDropdown.findByIdTag('a'), function(aobj,index) {
			var aobj_self = aobj;
			aobj.addEvent('mousemove',function(e) {
				aobj_self.setStyle('background-color','#f1f1f1');
				if(self.a_dom_onmousemove != null && self.a_dom_onmousemove != aobj_self) {
					self.a_dom_onmousemove.setStyle('background-color','#f9f9f9');
				}
				self.a_dom_onmousemove = aobj_self;
				self.suggestions_cur_hilight_idx = index;
			});
			aobj.addEvent('mouseout',function(e) {
				//var idTimeout = setTimeout(function() {
					if(self.a_dom_onmousemove != aobj_self) {
						aobj_self.setStyle('background-color','#f9f9f9');
					}
					//clearTimeout(idTimeout);
				//},50);
			});
			aobj.addEvent('click',function(e) {
				self.suggestions_cur_hilight_idx = index;
				self.setVal(self.suggestions_options_filtered[index][1]);
				self.setStyle('color','black');
				self.savedScrollTop = self.jsneDropdownc.scroll('top');
				self.jsneDropdownc.setStyle('visibility','hidden');
				self.jsneDropdown.setStyle('display','none');
				return false;
			});
		});
	};

	var ftagInitUI = (!jsnutsGlobals.stdHTML5) ? ('jsnutsInputtextInitUI') : ('jsnutsInputtextHtml5InitUI');
	this.polymorph(ftagInitUI,this.initUI);
	this.initUI = function() {
		this.polymorph(ftagInitUI).fn.apply(this);

		var a_test =
			new jsnutsElement()
			.detachOff()
			.setDOMEl(document.createElement('a'))
			.append(document.createTextNode('Test'));
		this.jsneDropdown.append(a_test);
		this.a_height = this.jsneDropdown.height();
		a_test.remove();

		var inputtextW = this.width() + (((this.getStyle('margin-left',{styleToInt:true}) > 0) ?
			(this.getStyle('margin-left',{styleToInt:true})) : (this.getStyle('padding-left',{styleToInt:true}))) * 2);
		var inputtextH = this.height() + (((this.getStyle('margin-left',{styleToInt:true}) > 0) ?
			(this.getStyle('margin-left',{styleToInt:true})) : (this.getStyle('padding-left',{styleToInt:true}))) * 2) +
			((jsnutsGlobals.curBrowser.indexOf('IE') >= 0) ? (0) : (2));
		this.jsneDropdown.height(this.a_height * this.suggestions_options.length);
		this.jsneDropdown.width(inputtextW);
		this.jsneDropdownc.width(inputtextW);
		this.jsneDropdownc.height(this.a_height * Math.min(this.suggestions_options.length,3));
		this.jsneDropdownc.setLTpos(this.getLpos(),this.getTpos() + inputtextH);

		this.jsneDDButton.width(inputtextH);
		this.jsneDDButton.height(inputtextH);

		this.populateSuggestions();

		self.jsneDropdownc.setStyle('visibility','hidden');
		self.jsneDropdown.setStyle('display','none');
	};

	var ftagInitEvents = (!jsnutsGlobals.stdHTML5) ? ('jsnutsInputtextInitEvents') : ('jsnutsInputtextHtml5InitEvents');
	this.polymorph(ftagInitEvents,this.initEvents);
	this.initEvents = function() {
		this.polymorph(ftagInitEvents).fn.apply(this);

		//var keydownTxtLen = -1;

		this.addEvent('keypress',function(e) {
			var keypressed = (typeof e.which !== 'undefined') ? e.which : e.keyCode;
			if(!(keypressed >= 32 && keypressed <= 255)) return;

			if(idTimeout != -1) clearTimeout(idTimeout);
			idTimeout = setTimeout(function() {
				clearTimeout(idTimeout);
				self.populateSuggestions(self.getVal());
				self.initAlinkEvents();
			},500);
		});

		/*this.addEvent('keydown',function(e) {
			if(self.getVal().length == 0 && keydownTxtLen == 2) {
				keydownTxtLen = 1;
                        }
			else {
				keydownTxtLen = self.getVal().length;
                        }
		});*/

		this.addEvent('keydown',function(e) {
			var backspace_pressed = (e.which == 8 || e.keyCode == 8);
			var canc_pressed = (e.which == 46 || e.keyCode == 46);
			var arrow_down_pressed = (e.which == 40 || e.keyCode == 40);
			var arrow_up_pressed = (e.which == 38 || e.keyCode == 38);
			var pgdown_pressed = (e.which == 34 || e.keyCode == 34);
			var pgup_pressed = (e.which == 33 || e.keyCode == 33);
			var enter_pressed = (e.which == 13 || e.keyCode == 13);
			var esc_pressed = (e.which == 27 || e.keyCode == 27);
			var end_pressed = (e.which == 35 || e.keyCode == 35);

			if(pgdown_pressed || pgup_pressed) return false;

			if(esc_pressed && self.jsneDropdown.getStyle('display') != 'none') {
				self.savedScrollTop = self.jsneDropdownc.scroll('top');
				self.jsneDropdownc.setStyle('visibility','hidden');
				self.jsneDropdown.setStyle('display','none');
				return false;
			}

			//if((backspace_pressed || canc_pressed) && keydownTxtLen >= 1) {
                        if((backspace_pressed || canc_pressed) && self.getVal().length > 0) {
				if(self.getVal().length == 1) {
					if(self.jsneDropdown.getStyle('display') != 'none') {
						self.savedScrollTop = self.jsneDropdownc.scroll('top');
						self.jsneDropdownc.setStyle('visibility','hidden');
						self.jsneDropdown.setStyle('display','none');
					}
					self.populateSuggestions();
					self.initAlinkEvents();
				}else {
					if(idTimeout != -1) clearTimeout(idTimeout);
					idTimeout = setTimeout(function() {
						clearTimeout(idTimeout);
						self.populateSuggestions(self.getVal());
						self.initAlinkEvents();
					},500);
				}
			}

			if(arrow_down_pressed || arrow_up_pressed) {
				if(arrow_down_pressed && self.jsneDropdown.getStyle('display') == 'none') {
					if(self.getVal().length >= 1) {
						self.populateSuggestions(self.getVal());
						self.initAlinkEvents();
					}else {
						self.jsneDropdownc.setStyle('visibility','visible');
						self.jsneDropdown.setStyle('display','');
					}
					if(self.savedScrollTop != -1)
						self.jsneDropdownc.scroll('top',self.savedScrollTop);
					//self.jsneDropdown.getDOMEl().focus();
                                        self.getDOMEl().focus();
					return false;
				}
			}

			/*if(enter_pressed) {
				self.savedScrollTop = self.dropdown_container_dom.scrollTop();
				self.setSuggestionsTextVal(self.suggestions_options_filtered[self.suggestions_cur_hilight_idx][1],self.suggestions_options_filtered[self.suggestions_cur_hilight_idx][0]);
				return false;
			}*/
		});

		this.initAlinkEvents();

	};

	this.adjComboButton = function() {
		// fa posto per il pulsante del combo
		if(this.combo_button != null) {
			this.combo_button.initUI();
			this.combo_button.initEvents();

			this.combo_button.addEvent('keyup',function(e) {
				var esc_pressed = (e.which == 27 || e.keyCode == 27);
				if(esc_pressed && self.jsneDropdown.getStyle('display') != 'none') {
					self.savedScrollTop = self.jsneDropdownc.scroll('top');
					self.jsneDropdownc.setStyle('visibility','hidden');
					self.jsneDropdown.setStyle('display','none');
					return false;
				}
			});

                        if(jsnutsGlobals.curBrowser != 'IE9' && jsnutsGlobals.curBrowser != 'IE10' && jsnutsGlobals.curBrowser != 'IE11')
                            this.width(this.width() - this.jsneDDButton.width());
                        else {
                            this.width(this.width() - this.jsneDDButton.width() -
                                (((this.jsneDDButton.getStyle('margin-left',{styleToInt:true}) != 0) ? (this.jsneDDButton.getStyle('margin-left',{styleToInt:true}))
                                : ((this.jsneDDButton.getStyle('padding-left',{styleToInt:true}) != 0) ? (this.jsneDDButton.getStyle('padding-left',{styleToInt:true})) : (0))) * 2) - 2);
                        }
			if(typeof this.removeUIE !== 'undefined') {
				this.removeUIE();
				this.polymorph(ftagInitUI).fn.apply(this);
				this.polymorph(ftagInitEvents).fn.apply(this);
				this.combo_button.reposition();
                                this.jsneDropdownc.setLpos(this.getLpos());
			}
			var clickDblClickEvent = function() {
				if(self.jsneDropdown.getStyle('display') == 'none') {
					self.jsneDropdownc.setStyle('visibility','visible');
					self.jsneDropdown.setStyle('display','');
					//self.jsneDropdown.getDOMEl().focus();
					if(self.savedScrollTop != -1) {
						self.jsneDropdownc.scroll('top',self.savedScrollTop);
					}
				}else {
					self.savedScrollTop = self.jsneDropdownc.scroll('top');
					self.jsneDropdownc.setStyle('visibility','hidden');
					self.jsneDropdown.setStyle('display','none');
				}
			};

			this.combo_button.addEvent('click',function(e) {
				clickDblClickEvent(e);
			});

			if(
				jsnutsGlobals.curBrowser == 'IE6' ||
				jsnutsGlobals.curBrowser == 'IE7' ||
				jsnutsGlobals.curBrowser == 'IE8') {
					this.combo_button.addEvent('dblclick',function(e) {
						clickDblClickEvent(e);
					});
	
			}
		}
	};
}