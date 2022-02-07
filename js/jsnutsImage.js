function jsnutsImage(id_dom_img,imgname) {
	
	jsnutsElement.call(this);

	this.imgname = imgname;
	this.vml_on = false;
	this.radii = 0;
	this.blur = 0;
	this.vmlObj = null;
	this.jsne = new jsnutsElement();

	var self = this;

	(function init() {
		self.detachOff();
		self.findById(id_dom_img);
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

	this.initUI = function() {
		if(this.vml_on) {
			var id_dom = this.getId();
			var img_w = this.width();
			var img_h = this.height();
			var img_rborders_path = this.vmlObj.getBoxPath(img_w,img_h,null,2,this.radii);
			var img_border_path = this.vmlObj.getBoxPath(img_w + this.radii,img_h + this.radii, { t: -this.blur * 0.7, r: -this.blur * 0.7, b: -this.blur * 0.7, l: -this.blur * 0.7 },2,this.radii);
			//var img_border_path = this.vmlObj.getBoxPath(img_w + this.radii,img_h + this.radii,null,2,this.radii);
			var img_border_focus = this.vmlObj.getFillFocus(img_w + this.radii,img_h + this.radii,this.blur * 0.5);
			this.vmlObj.createImageRoundedCorners(id_dom,img_w,img_h,img_rborders_path,this.imgname);
			//this.vmlObj.createImageRoundedBorder(id_dom,img_w + this.radii,img_h + this.radii,img_border_path);
			this.vmlObj.createImageRoundedBorderBlurred(id_dom,img_w + this.radii,img_h + this.radii,img_border_path,img_border_focus,'#999');
			var img_left = this.getLpos();
			var img_top = this.getTpos();
			this.setStyle('visibility','hidden');
			this.jsne.findById(id_dom + '_rcorners').setLTpos(img_left,img_top);
			//this.jsne.findById(id_dom + '_border').setLTpos(img_left - (this.radii / 2),img_top - (this.radii / 2));
			this.jsne.findById(id_dom + '_border_blurred').setLTpos(img_left - (this.radii / 2),img_top - (this.radii / 2));

		}
	};

	this.initEvents = function() {
	};

}