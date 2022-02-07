function jsnutsDropdown(
	id_dom_dropdown,
	id_dom_dropbtn,
	id_dom_dropdown_container) {

	jsnutsObject.call(this);

	this.id_dom_dropdown = id_dom_dropdown;
	this.id_dom_dropbtn = id_dom_dropbtn;
	this.id_dom_dropdown_container = id_dom_dropdown_container;
	this.jsneDropdown = new jsnutsElement();
	this.jsneDropbtn = new jsnutsElement();
	this.jsneDropdownc = new jsnutsElement();
	this.jsne = new jsnutsElement();
	this.vml_on = false;
	this.radii = 0;
	this.blur = 0;
	this.vmlObj = null;
	this.dropdown_cur_hilight_idx = -1;
	this.a_dom_onmousemove = null;
	this.a_height = -1;
	this.goToScroll = 0;
	this.savedScrollTop = -1;
	this.dropdown_options = null;

	this.utils = new jsnutsUtils();

	var self = this;

	(function init() {
		if(typeof id_dom_dropdown !== 'undefined')
			self.jsneDropdown.findById(id_dom_dropdown);
		if(typeof id_dom_dropbtn !== 'undefined')
			self.jsneDropbtn.findById(id_dom_dropbtn);
		if(typeof id_dom_dropdown_container !== 'undefined')
			self.jsneDropdownc.findById(id_dom_dropdown_container);
		self.jsneDropdown.detachOff();
		self.jsneDropbtn.detachOff();
		self.jsneDropdownc.detachOff();
		self.jsne.detachOff();
	}());

	this.setRadii = function(radii) {
		this.radii = radii;
		this.blur = radii;
	};

	this.setBlur = function(blur) {
		this.blur = blur;
	};

	this.setVmlOn = function() {
		this.vml_on = true;
		if(this.vmlObj == null) this.vmlObj = new jsnutsVML();
	};

	this.getVal = function() {
		if(this.dropdown_cur_hilight_idx >= 0)
			return this.dropdown_options[this.dropdown_cur_hilight_idx][0];
		else
			return void 0;
	};

	this.getText = function() {
		if(this.dropdown_cur_hilight_idx >= 0)
			return this.dropdown_options[this.dropdown_cur_hilight_idx][1];
		else
			return void 0;
	};

	this.getDropbtn = function() {
		return this.jsneDropbtn;
	};

	this.setOptions = function(options) {
		this.dropdown_options = new Array(options.length);
		for(var i = 0;i < options.length;i++)
			this.dropdown_options[i] = options[i];
	};

	this.initUI = function() {
		var a_test =
			new jsnutsElement()
			.detachOff()
			.setDOMEl(document.createElement('a'))
			.append(document.createTextNode('Test'));
		this.jsneDropdown.append(a_test);
		this.a_height = this.jsneDropdown.height();
		a_test.remove();

		var dropbtnW = this.jsneDropbtn.width();
		var dropbtnH = this.jsneDropbtn.height();
                if(jsnutsGlobals.curBrowser == 'IE9' || jsnutsGlobals.curBrowser == 'IE10' || jsnutsGlobals.curBrowser == 'IE11') {
                    dropbtnW +=
                        (((this.jsneDropbtn.getStyle('margin-left',{styleToInt:true}) != 0) ? (this.jsneDropbtn.getStyle('margin-left',{styleToInt:true}))
                        : ((this.jsneDropbtn.getStyle('padding-left',{styleToInt:true}) != 0) ? (this.jsneDropbtn.getStyle('padding-left',{styleToInt:true})) : (0))) * 2) + 2;
                    dropbtnH +=
                        (((this.jsneDropbtn.getStyle('margin-top',{styleToInt:true}) != 0) ? (this.jsneDropbtn.getStyle('margin-top',{styleToInt:true}))
                        : ((this.jsneDropbtn.getStyle('padding-top',{styleToInt:true}) != 0) ? (this.jsneDropbtn.getStyle('padding-top',{styleToInt:true})) : (0))) * 2) +
                        ((jsnutsGlobals.curBrowser == 'IE9') ? (2) : (0));
                }
		this.jsneDropdown.height(this.a_height * this.dropdown_options.length);
		this.jsneDropdown.width(dropbtnW - 2);
		this.jsneDropdownc.width(dropbtnW - 2);
		this.jsneDropdownc.height(this.a_height * Math.min(this.dropdown_options.length,3));
		this.jsneDropdownc.setLTpos(this.jsneDropbtn.getLpos(),this.jsneDropbtn.getTpos() + dropbtnH);

		for(var i = 0;i < this.dropdown_options.length;i++) {
			var a_dropdown = new jsnutsElement()
				.detachOff()
				.setDOMEl(document.createElement('a'))
				.append(document.createTextNode(this.dropdown_options[i][1]));
			a_dropdown.setAttribute('id','a_dropdown_' + i);
			a_dropdown.setAttribute('href','javascript(void);');
			this.jsneDropdown.append(a_dropdown);
		}

		if(this.vml_on) {
			var dropbtn_rborders_path = this.vmlObj.getBorderSegmentsArc(dropbtnW,dropbtnH,2,this.radii);
			var dropbtn_bkgnd_path = this.vmlObj.getBoxPathArcClosed(dropbtnW,dropbtnH,null,2,this.radii);

			var dropbtn_id_dom = this.jsneDropbtn.getId();
			this.vmlObj.createDropbtnNoFocus(dropbtn_id_dom,dropbtnW,dropbtnH,dropbtn_rborders_path);
			this.vmlObj.createDropbtnNoFocusbkgnd(dropbtn_id_dom,dropbtnW,dropbtnH,dropbtn_bkgnd_path);
			this.vmlObj.createDropbtnFocusbkgnd(dropbtn_id_dom,dropbtnW,dropbtnH,dropbtn_bkgnd_path);

			var dropbtn_left = this.jsneDropbtn.getLpos();
			var dropbtn_top = this.jsneDropbtn.getTpos();
			this.jsne.findById(dropbtn_id_dom + '_nofocus').setLTpos(dropbtn_left,dropbtn_top);
			this.jsne.findById(dropbtn_id_dom + '_nofocus').setStyle('visibility','visible');
			this.jsne.findById(dropbtn_id_dom + '_nofocus_bkgnd').setLTpos(dropbtn_left,dropbtn_top);
			this.jsne.findById(dropbtn_id_dom + '_focus_bkgnd').setLTpos(dropbtn_left,dropbtn_top);
		}

	};

	this.initEvents = function() {
		var dropbtn_id_dom = -1;
		var dropbtn_nofocus = null;
		var dropbtn_focus_bkgnd = null;
		var dropbtn_nofocus_bkgnd = null;
		var isDropdownVisible = function () {
			return self.jsneDropdownc.getStyle('visibility') != 'hidden';
		};
		var clickDblClickEvent = function(e) {
			if(self.jsneDropdownc.getStyle('visibility') != 'visible') {
				self.jsneDropdownc.setStyle('visibility','visible');
				self.jsneDropdown.setStyle('display','');
				if(self.savedScrollTop != -1) {
					self.jsneDropdownc.scroll('top',self.savedScrollTop);
				}
			}else {
				self.savedScrollTop = self.jsneDropdownc.scroll('top');
				self.jsneDropdownc.setStyle('visibility','hidden');
				self.jsneDropdown.setStyle('display','none');
			}
		};
		var mouseoutEvent = function(e) {
			if(isDropdownVisible()) return;

			if(!self.vml_on) {
				self.jsneDropbtn.setStyle('background-color','#9ECAED');
			}else {
				dropbtn_nofocus_bkgnd.setStyle('visibility','visible');
				dropbtn_focus_bkgnd.setStyle('visibility','hidden');
			}
		};

		if(this.vml_on) {
			dropbtn_id_dom = this.jsneDropbtn.getId();
			dropbtn_nofocus = new jsnutsElement().detachOff().findById(dropbtn_id_dom + '_nofocus');
			dropbtn_focus_bkgnd = new jsnutsElement().detachOff().findById(dropbtn_id_dom + '_focus_bkgnd');
			dropbtn_nofocus_bkgnd = new jsnutsElement().detachOff().findById(dropbtn_id_dom + '_nofocus_bkgnd');
			dropbtn_nofocus.addEvent('mousemove',function(e) {

				if(isDropdownVisible()) return;
				
				dropbtn_nofocus_bkgnd.setStyle('visibility','hidden');
				dropbtn_focus_bkgnd.setStyle('visibility','visible');
			});
			dropbtn_nofocus_bkgnd.addEvent('mousemove',function(e) {

				if(isDropdownVisible()) return;

				dropbtn_nofocus_bkgnd.setStyle('visibility','hidden');
				dropbtn_focus_bkgnd.setStyle('visibility','visible');
			});
			dropbtn_nofocus.addEvent('mouseout',function(e) {

				if(isDropdownVisible()) return;

				dropbtn_nofocus_bkgnd.setStyle('visibility','visible');
				dropbtn_focus_bkgnd.setStyle('visibility','hidden');
			});
			dropbtn_nofocus.addEvent('click',function(e) {
				clickDblClickEvent(e);
			});
		}
		this.jsneDropbtn.addEvent('mousemove',function(e) {

			if(isDropdownVisible()) return;

			if(!self.vml_on) {
				self.jsneDropbtn.setStyle('background-color','#1E90FF');
			}else {
				dropbtn_nofocus_bkgnd.setStyle('visibility','hidden');
				dropbtn_focus_bkgnd.setStyle('visibility','visible');
			}
		});
		this.jsneDropbtn.addEvent('mouseout',function(e) {
			mouseoutEvent();
		});
		this.jsneDropbtn.addEvent('click',function(e) {
			clickDblClickEvent(e);
		});
		if(
			jsnutsGlobals.curBrowser == 'IE6' ||
			jsnutsGlobals.curBrowser == 'IE7' ||
			jsnutsGlobals.curBrowser == 'IE8') {
				this.jsneDropbtn.addEvent('dblclick',function(e) {
					clickDblClickEvent(e);
				});
				if(self.vml_on) {
					dropbtn_nofocus.addEvent('dblclick',function(e) {
						clickDblClickEvent(e);
					});
				}
		}

		this.forEach(this.jsneDropdown.findByIdTag('a'), function(aobj,index) {
			var aobj_self = aobj;
			aobj.addEvent('mousemove',function(e) {
				aobj_self.setStyle('background-color','#f1f1f1');
				if(self.a_dom_onmousemove != null && self.a_dom_onmousemove != aobj_self) {
					self.a_dom_onmousemove.setStyle('background-color','#f9f9f9');
				}
				self.a_dom_onmousemove = aobj_self;
				self.dropdown_cur_hilight_idx = index;
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
				self.dropdown_cur_hilight_idx = index;
				self.jsneDropbtn.setHtml(self.dropdown_options[index][1]);

				self.savedScrollTop = self.jsneDropdownc.scroll('top');

				self.jsneDropdownc.setStyle('visibility','hidden');
				self.jsneDropdown.setStyle('display','none');
				//self.dropbtn_dom.focus();

				return false;
			});
		});

		new jsnutsDocument().addEvent('click',function(e) {
			var target = e.target || e.srcElement;
			if(
				typeof target.getAttribute('id') === 'undefined' ||
				(target.getAttribute('id') != self.id_dom_dropbtn && target.getAttribute('id') != self.id_dom_dropbtn + '_nofocus')) {
					if(isDropdownVisible()) {
						clickDblClickEvent(e);
						mouseoutEvent();
					}else {
						mouseoutEvent();
					}
			}
		});
	};

}