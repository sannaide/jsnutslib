function jsnutsSlider(
	range_min,range_max,
	range_container_width,
	range_value_width,
	id_dom_range_container,
	id_dom_slider_guide,
	id_dom_slider,
	id_dom_range_value) {

	jsnutsObject.call(this);

	this.offsetX = 0;
	this.range_container_width = range_container_width;
	this.range_value_width = range_value_width;
	this.slider_width = 0;
	this.range_min = range_min;
	this.range_max = range_max;
	this.range_value = 0;
	this.id_dom_range_container = id_dom_range_container;
	this.id_dom_slider_guide = id_dom_slider_guide;
	this.id_dom_slider = id_dom_slider;
	this.id_dom_range_value = id_dom_range_value;
	this.jsneRangec = new jsnutsElement();
	this.jsneSliderGuide = new jsnutsElement();
	this.jsneSlider = new jsnutsElement();
	this.jsneRangeValue = new jsnutsElement();
	this.utils = new jsnutsUtils();

	var self = this;

	(function init() {
		self.jsneRangec.findById(id_dom_range_container);
		self.jsneSliderGuide.findById(id_dom_slider_guide);
		self.jsneSlider.findById(id_dom_slider);
		self.jsneRangeValue.findById(id_dom_range_value);
		self.jsneRangec.detachOff();
		self.jsneSliderGuide.detachOff();
		self.jsneSlider.detachOff();
		self.jsneRangeValue.detachOff();
	}());

	this.changeValue = function(event) {
		var adjx = self.utils.mouseXY(event).x - self.offsetX;
		self.range_value = adjx * (self.range_max - self.range_min) / self.range_container_width + self.range_min;
		if(self.range_value >= self.range_max) { self.range_value = self.range_max; }
		if(self.range_value <= self.range_min) { self.range_value = self.range_min; }
		var left_calc = (self.range_value - self.range_min) * (self.range_container_width - self.slider_width) / (self.range_max - self.range_min);
		self.jsneSlider.setLpos(left_calc);
		self.jsneRangeValue.setHtml(parseInt(self.range_value));
	};

	this.initUI = function() {
		this.jsneRangec.width(this.range_container_width);
		this.jsneRangeValue.width(this.range_value_width);
		this.jsneSliderGuide.setTpos(((this.jsneRangec.height() - this.jsneSliderGuide.height()) / 2) + 1);
		this.range_container_width = this.jsneRangec.width();
		this.offsetX = this.jsneRangec.getDOMEl().getBoundingClientRect().left;
		this.slider_width = this.jsneSlider.width();
	};

	this.initEvents = function() {
		this.jsneRangec.addEvent('click', function(e) {
			self.changeValue(e);
		});
		this.jsneSlider.addEvent('mousedown',function(e) {
			jsnutsGlobals.ndocument.addEvent('selectstart', function(e) {
				return false;
			});
			jsnutsGlobals.ndocument.addEvent('mousemove', function(e) {
				self.changeValue(e);
			});
		});
		jsnutsGlobals.ndocument.addEvent('mouseup', function(e) {
			jsnutsGlobals.ndocument.removeEvent('mousemove');
			jsnutsGlobals.ndocument.removeEvent('selectstart');
		});

		if(typeof document.addEventListener === 'undefined') {
			document.body.attachEvent('onmouseleave',function() {
				jsnutsGlobals.ndocument.removeEvent('mousemove');
				//jsnutsGlobals.ndocument.removeEvent('selectstart');
			});
		}else {
			document.body.addEventListener('mouseleave',function() {
				jsnutsGlobals.ndocument.removeEvent('mousemove');
				//jsnutsGlobals.ndocument.removeEvent('selectstart');
			},false);
			//jsnutsGlobals.ndocument.addEvent('mouseleave', function(e) {
			//	jsnutsGlobals.ndocument.removeEvent('mousemove');
			//	jsnutsGlobals.ndocument.removeEvent('selectstart');
			//});
		}

		//$(document).on('mouseleave',function() { alert(); });
	};
	
}