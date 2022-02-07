function jsnutsPopup(id_dom_popup,jsneDarklayer,title,msg,w,h) {

	jsnutsElement.call(this);

	this.id_dom_popup = id_dom_popup;
	this.jsneDarklayer = jsneDarklayer;
	this.jsne = new jsnutsElement();
	this.title = title;
	this.msg = msg;
	this.pwidth = w;
	this.pheight = h;
	this.vml_on = false;
	this.radii = 0;
	this.blur = 0;
	this.vmlObj = null;

	var self = this;

	(function init() {
		self.findById(id_dom_popup);
		self.jsneDarklayer.width(jsnutsGlobals.nwindow.widthnsb());
		self.jsneDarklayer.height(jsnutsGlobals.nwindow.height());
		self.detachOff();
		self.jsne.detachOff();
	}());
        
	function setPos() {
	        var left = ((jsnutsGlobals.nwindow.widthnsb() - (self.width() + self.getStyle('padding-left',{styleToInt:true}) * 2)) / 2);
	        var top = ((jsnutsGlobals.nwindow.height() - (self.height() + self.getStyle('padding-left',{styleToInt:true}) * 2)) / 2);
		self.setLTpos(left,top);
	};

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

	this.handleScrollY = function() {
		var left_offset = ((jsnutsGlobals.nwindow.widthnsb() - (this.width() + this.getStyle('padding',{styleToInt:true}) * 2)) / 2);
		var top_offset = ((jsnutsGlobals.nwindow.height() - (this.height() + this.getStyle('padding',{styleToInt:true}) * 2)) / 2);
		var popup_dom = document.getElementById(this.id_dom_popup);
		popup_dom.style.setExpression('left',left_offset + '+((e=document.documentElement.scrollLeft)?e:document.body.scrollLeft) + \'px\'');
		popup_dom.style.setExpression('top',top_offset + '+((e=document.documentElement.scrollTop)?e:document.body.scrollTop) + \'px\'');

                left_offset = top_offset = 0;
                this.jsneDarklayer.getDOMEl().style.setExpression('left',left_offset + '+((e=document.documentElement.scrollLeft)?e:document.body.scrollLeft) + \'px\'');
                this.jsneDarklayer.getDOMEl().style.setExpression('top',top_offset + '+((e=document.documentElement.scrollTop)?e:document.body.scrollTop) + \'px\'');
	};

	this.show = function() {
                if(jsnutsGlobals.browserMobile) setPos();
		this.darkLayerOn();
		if(this.vml_on) {
			this.jsne.findById(this.id_dom_popup + '_border').setStyle('visibility','visible');
			this.jsne.findById(this.id_dom_popup + '_bkgnd').setStyle('visibility','visible');
		}
		this.setStyle('visibility','visible');
	};

	this.hide = function() {
		this.darkLayerOff();
		if(this.vml_on) {
			this.jsne.findById(this.id_dom_popup + '_border').setStyle('visibility','hidden');
			this.jsne.findById(this.id_dom_popup + '_bkgnd').setStyle('visibility','hidden');
		}
		this.setStyle('visibility','hidden');
	};

	this.darkLayerOn = function() {
		this.jsneDarklayer.width(jsnutsGlobals.nwindow.widthnsb());
		this.jsneDarklayer.height(jsnutsGlobals.nwindow.height());
		this.jsneDarklayer.setStyle('display','');
	};

	this.darkLayerOff = function() {
		this.jsneDarklayer.setStyle('display','none');
	};

	this.initUI = function() {
		this.width(this.pwidth);
		this.height(this.pheight);
                
		this.findByIdTag('h2')[0].setHtml(title);
		var titleH = this.findByClassTagId('popup_title','div',this.id_dom_popup)[0].height();
                this.findByClassTagId('popup_title','div',this.id_dom_popup)[0].height(titleH); // IE6/7
		var titleCDH = this.jsne.findById('title_content_divider').height();
                
		//this.findByClassTagId('popup_content','div',this.id_dom_popup)[0].height(this.height() - titleH - this.getStyle('padding-left',{styleToInt:true}));
		//this.findByClassTagId('popup_content','div',this.id_dom_popup)[0].height(this.height() - titleH - titleCDH  - (this.getStyle('padding-left',{styleToInt:true}) * 2));
		this.findByClassTagId('popup_content','div',this.id_dom_popup)[0].height(this.height() - titleH - titleCDH);
		this.findByClassTagId('popup_content','div',this.id_dom_popup)[0].setHtml(this.msg);

		if(jsnutsGlobals.curBrowser != 'IE6' && jsnutsGlobals.curBrowser != 'IE7') {
                        var left = ((jsnutsGlobals.nwindow.widthnsb() - (this.width() + this.getStyle('padding-left',{styleToInt:true}) * 2)) / 2);
                        var top = ((jsnutsGlobals.nwindow.height() - (this.height() + this.getStyle('padding-left',{styleToInt:true}) * 2)) / 2);
			this.setLTpos(left,top);
		}else {
			this.handleScrollY(); // IE6,7
		}

		if(this.vml_on) {
			var popup_w = this.width() + (this.getStyle('padding-left',{styleToInt:true}) * 2);
			var popup_h = this.height() + titleH + titleCDH;
			//var popup_h = this.height() + (this.getStyle('padding-left',{styleToInt:true}) * 2) + titleH;
			var popup_rborders_path = this.vmlObj.getBorderSegments(popup_w,popup_h,2,this.radii);
			var popup_bkgnd_path = this.vmlObj.getBoxPath(popup_w,popup_h,null,2,this.radii);
			this.vmlObj.createPopupRoundedBorder(this.id_dom_popup,popup_w,popup_h,popup_rborders_path);
			this.vmlObj.createPopupRoundedBkgnd(this.id_dom_popup,popup_w,popup_h,popup_bkgnd_path);
			this.jsne.findById(this.id_dom_popup + '_border').setLTpos(0,0);
			this.jsne.findById(this.id_dom_popup + '_bkgnd').setLTpos(0,0);
		}
	};

	this.initEvents = function() {
		this.jsneDarklayer.addEvent('click',function() {
			self.hide();
		});
		this.findByClassTagId('close','a',this.id_dom_popup)[0].addEvent('click',function() {
			self.hide();
		});
		new jsnutsDocument().addEvent('keyup',function(e) {
			var keyCode = e.which || e.keyCode;
			if(keyCode === 27) {
				self.hide();
			}
		});
	};
}