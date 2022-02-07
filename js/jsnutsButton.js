function jsnutsButton(id_dom_input) {

	jsnutsInput.call(this,id_dom_input);

	this.utils = new jsnutsUtils();
	this.button_text = 'My Button';
	this.vml_on = false;
	this.radii = 0;
	this.blur = 0;
	this.vmlObj = null;
	this.jsne = new jsnutsElement();
	
	var self = this;

	(function init() {
		self.jsne.setCacheOn(10);
		self.jsne.detachOff();
	}());

	this.setVmlOn = function() {
		this.vml_on = true;
		if(this.vmlObj == null) this.vmlObj = new jsnutsVML();
	};

	this.setRadii = function(radii) {
		this.radii = radii;
		this.blur = radii;
	};

	this.setBlur = function(blur) {
		this.blur = blur;
	};

	this.reposition = function() {
		if(this.vml_on) {
			var id_dom = this.getId();
			this.jsne.findById(id_dom + '_border').remove();
			this.jsne.findById(id_dom + '_nofocus_bkgnd').remove();
			this.jsne.findById(id_dom + '_focus_bkgnd').remove();
			this.initUI();
		}
	};

	this.initUI = function() {
		if(this.vml_on) {
			var button_width = this.width() + (this.getStyle('margin',{styleToInt:true}) * 2);
			var button_height = this.height() + (this.getStyle('margin',{styleToInt:true}) * 2); // jquery toglie 2 da height()
			var button_rborders_path = this.vmlObj.getBorderSegments(button_width,button_height,2,this.radii);
			var button_bkgnd_path = this.vmlObj.getBoxPath(button_width,button_height,null,2,this.radii);

			this.vmlObj.createButtonborder(button_width,button_height,button_rborders_path);
			this.vmlObj.createButtonNoFocusbkgnd(button_width,button_height,button_bkgnd_path);
			this.vmlObj.createButtonFocusbkgnd(button_width,button_height,button_bkgnd_path);

			var id_dom = this.getId();
			this.vmlObj.createButtonborder(id_dom,button_width,button_height,button_rborders_path);
			this.vmlObj.createButtonNoFocusbkgnd(id_dom,button_width,button_height,button_bkgnd_path);
			this.vmlObj.createButtonFocusbkgnd(id_dom,button_width,button_height,button_bkgnd_path);

			var button_left = this.getLpos();
			var button_top = this.getTpos();
			this.jsne.findById(id_dom + '_border').setLTpos(button_left,button_top);
			this.jsne.findById(id_dom + '_nofocus_bkgnd').setLTpos(button_left,button_top);
			this.jsne.findById(id_dom + '_focus_bkgnd').setLTpos(button_left,button_top);
		}
	};

	this.initEvents = function() {
		/*var self = this;
		this.domObj().on('mousemove',function() {
			if(!self.vml_on) {
				$(this).css({backgroundColor:'#9ECAED'});
			}else {
				var button_id_dom = self.id_dom_button;
				$('#' + button_id_dom + '_nofocus_bkgnd').css({visibility:'hidden'});
				$('#' + button_id_dom + '_focus_bkgnd').css({visibility:'visible'});
			}
		});
		this.domObj().on('mouseout',function() {
			if(!self.vml_on) {
				$(this).css({backgroundColor:'#CCCCCC'});
			}else {
				var button_id_dom = self.id_dom_button;
				$('#' + button_id_dom + '_nofocus_bkgnd').css({visibility:'visible'});
				$('#' + button_id_dom + '_focus_bkgnd').css({visibility:'hidden'});
			}
		});*/
	};
}