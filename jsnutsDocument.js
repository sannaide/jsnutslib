function jsnutsDocument() {

	jsnutsObject.call(this);

	this.evtokens = [];

	// add event cross browser
	this.addEvent = function(event, fn) {
            var elem = document;
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