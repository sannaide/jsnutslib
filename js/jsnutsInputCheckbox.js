function jsnutsInputCheckbox(id_dom_input) {

	jsnutsInput.call(this,id_dom_input);

	this.width = 43;
	this.height = 43;
	this.imgurl = 'url("./images/checkboxSmall.jpg")';
	this.wrapper = new jsnutsElement().detachOff();

	this.initUI = function() {
		this.setStyle('display','none');
		this.wrapper.setDOMEl(document.createElement('div'));
		this.wrapper.setStyle('background-image',this.imgurl);
		this.wrapper.setStyle('cursor','pointer');
		this.wrapper.width(this.width);
		this.wrapper.height(this.height);
		this.wrap(this.wrapper);

		if(this.getDOMEl().checked)
			this.wrapper.setStyle('background-position','0 ' + (-this.height) + 'px');
	};

	this.initEvents = function() {
		var self = this;
		this.wrapper.addEvent('click',function(e) {
			if(self.getDOMEl().checked != true) {
				self.wrapper.setStyle('background-position','0 ' + (-self.height) + 'px');
				self.getDOMEl().checked = 'checked';
			}else {
				self.wrapper.setStyle('background-position','0 0px');
				self.getDOMEl().checked = '';
			}
		});
		if(jsnutsGlobals.curBrowser == 'IE8') {
			this.wrapper.addEvent('dblclick',function(e) {
				if(self.getDOMEl().checked != true) {
					self.wrapper.setStyle('background-position','0 ' + (-self.height) + 'px');
					self.getDOMEl().checked = 'checked';
				}else {
					self.wrapper.setStyle('background-position','0 0px');
					self.getDOMEl().checked = '';
				}
			});
		}
	};

}