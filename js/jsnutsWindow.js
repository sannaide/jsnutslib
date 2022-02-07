function jsnutsWindow() {
	var windowW;
	var documentW;
	var documentOW;
	var documentBOW;
	var documentSW;
	var windowH;
	var documentH;
	var documentOH;
	var documentBOH;
	var documentSH;
	var body = null;

	this.evtokens = [];

	function recalc() {
		if(!body) body = document.getElementsByTagName('body')[0];
		windowW = window.innerWidth;
		documentW = document.documentElement.clientWidth || body.clientWidth;
		documentOW = document.documentElement.offsetWidth;
		documentBOW = body.offsetWidth;
		documentSW = document.documentElement.scrollWidth || body.scrollWidth;
		windowH = window.innerHeight;
		documentH = document.documentElement.clientHeight || body.clientHeight;
		documentOH = document.documentElement.offsetHeight;
		documentBOH = body.offsetHeight;
		documentSH = document.documentElement.scrollHeight || body.scrollHeight;
	};

	this.width = function() {
		recalc();
		return (typeof windowW !== 'undefined') ? (windowW) : (documentW);
	};

	this.height = function() {
		recalc();
		return (typeof windowH !== 'undefined') ? (windowH) : (documentH);
	};

	this.widthnsb = function() {
		recalc();
		return (typeof windowW !== 'undefined') ? (Math.min(windowW,documentW)) : (documentW);
	};

	this.heightnsb = function() {
		recalc();
		return (typeof windowH !== 'undefined') ? (Math.min(windowH,documentH)) : (documentH);
	};

	this.dwidth = function() {
		recalc();
		return (typeof documentOW !== 'undefined') ? (Math.max(documentOW,documentSW)) : (documentSW);
	};

	this.dheight = function() {
		recalc();
		return (typeof documentOH !== 'undefined') ? (Math.max(documentOH,documentSH)) : (documentSH);
	};

	this.scroll = function(which,value) {
		// lettura
		if(typeof value === 'undefined') {
			if(which == 'top') {
				var scrollTop = typeof window.pageYOffset !== 'undefined' ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
				return scrollTop;
			}else if(which == 'left') {
				// TODO
				return void 0;
			}
			else return void 0;
		// scrittura
		}else {
			if(which == 'top') {
				if(typeof window.pageYOffset !== 'undefined')
					window.pageYOffset = value;
				else if(typeof window.scrollTop !== 'undefined')
					window.scrollTop = value;
			}else if(which == 'left') {
				// TODO
				// ...
			}
		}
	};

	// add event cross browser
	this.addEvent = function(event, fn) {
            var elem = window;
	    // avoid memory overhead of new anonymous functions for every event handler that's installed
	    // by using local functions
	    function listenHandler(e) {
		var ret = fn.apply(this, arguments);
	        if (ret === false) {
	            e.stopPropagation();
	            e.preventDefault();
	        }
	        return(ret);
	    }
	
	    function attachHandler() {
	        // set the this pointer same as addEventListener when fn is called
	        // and make sure the event is passed to the fn also so that works the same too
	        var ret = fn.call(elem, window.event);
	        if (ret === false) {
	            window.event.returnValue = false;
	            window.event.cancelBubble = true;
	        }
	        return(ret);
	    }
	
	    if (elem.addEventListener) {
	        elem.addEventListener(event, listenHandler, false);

		this['fn' + event] = fn;
		this.evtokens[event] = { elem: elem, handler: listenHandler, event: event };

	        return {elem: elem, handler: listenHandler, event: event};
	    } else {
	        elem.attachEvent("on" + event, attachHandler);

		this['fn' + event] = fn;
		this.evtokens[event] = { elem: elem, handler: attachHandler, event: event };

	        return {elem: elem, handler: attachHandler, event: event};
	    }
	};
	
	this.removeEvent = function(eventName) {
	    var token = this.evtokens[eventName];
	    if(typeof token === 'undefined') return this;
	    if(token.elem.removeEventListener) {
	        token.elem.removeEventListener(token.event, token.handler);
		this['fn' + token.event] = void 0;
		this.evtokens[token.event] = void 0;
	    }else {
	        token.elem.detachEvent("on" + token.event, token.handler);
		this['fn' + token.event] = void 0;
		this.evtokens[token.event] = void 0;
	    }
	};
}