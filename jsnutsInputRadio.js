function jsnutsInputRadio(id_dom_input) {

	jsnutsInput.call(this,id_dom_input);

	this.width = 43;
	this.height = 43;
	this.imgurl = 'url("./images/radioSmall.jpg")';
	this.wrapper = new jsnutsElement().detachOff();
	this.container = null;

	this.setContainer = function(container) {
		this.container = container;
	};

	this.reset = function() {
		this.wrapper.setStyle('background-position','0 0px');
		this.getDOMEl().checked = '';
	};

	this.initUI = function() {
		this.setStyle('display','none');
		this.wrapper.setDOMEl(document.createElement('div'));
		this.wrapper.setStyle('background-image',this.imgurl);
		this.wrapper.setStyle('cursor','pointer');
		this.wrapper.width(this.width);
		this.wrapper.height(this.height);
		this.wrap(this.wrapper);

		if(this.getDOMEl().checked) {
			this.wrapper.setStyle('background-position','0 ' + (-this.height) + 'px');
			this.container.setClicked(this);
		}	
	};

	this.initEvents = function() {
		var self = this;
		this.wrapper.addEvent('click',function(e) {
			self.container.resetPrec();
			self.wrapper.setStyle('background-position','0 ' + (-self.height) + 'px');
			self.getDOMEl().checked = 'checked';
			self.container.setClicked(self);
		});
	};

}