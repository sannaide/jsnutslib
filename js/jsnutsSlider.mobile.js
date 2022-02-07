function jsnutsSliderMobile(
	range_min,range_max,
	range_container_width,
	range_value_width,
	id_dom_range_container,
	id_dom_slider_guide,
	id_dom_slider,
	id_dom_range_value) {

	jsnutsSlider.call(this,
		range_min,range_max,
		range_container_width,
		range_value_width,
		id_dom_range_container,
		id_dom_slider_guide,
		id_dom_slider,
		id_dom_range_value);

	this.initEvents = function() {
		var el = document.getElementById(this.id_dom_slider);
		var touchsurface = el,
		swipedir,
		startX,
		startY,
		distX,
		distY,
		threshold = 5, //required min distance traveled to be considered swipe
		restraint = 100, // maximum distance allowed at the same time in perpendicular direction
		allowedTime = 1000, // maximum time allowed to travel that distance
		elapsedTime,
		startTime,
		handleswipe = function(swipedir){},
		self = this;
        
		touchsurface.addEventListener('touchstart', function(e) {
			var touchobj = e.changedTouches[0];
			swipedir = 'none';
			dist = 0;
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime(); // record time when finger first makes contact with surface
			e.preventDefault();
		}, false);
  
		touchsurface.addEventListener('touchmove', function(e) {
			e.preventDefault(); // prevent scrolling when inside DIV
			var touchobj = e.changedTouches[0];
			self.changeValue(touchobj);
		}, false);
  
		touchsurface.addEventListener('touchend', function(e){
			//var touchobj = e.changedTouches[0];
			//e.preventDefault();
		}, false);
	};

}