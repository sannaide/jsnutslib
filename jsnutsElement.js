function jsnutsElement() {

	jsnutsObject.call(this);

	this.cacheOn = false;
	this.cacheIdx = -1;
	this.cacheIdxj = -1;
	this.thisEls = [];
	this.thisJsnutsEls = [];
	this.detach = true;
	this.evtokens = [];

	/*
		Developed by Robert Nyman, http://www.robertnyman.com
		Code/licensing: http://code.google.com/p/getelementsbyclassname/
	*/	
	var getElementsByClassName = function (className, tag, elm){
		if (document.getElementsByClassName) {
			getElementsByClassName = function (className, tag, elm) {
				elm = elm || document;
				var elements = elm.getElementsByClassName(className),
					nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
					returnElements = [],
					current;
				for(var i=0, il=elements.length; i<il; i+=1){
					current = elements[i];
					if(!nodeName || nodeName.test(current.nodeName)) {
						returnElements.push(current);
					}
				}
				return returnElements;
			};
		}
		else if (document.evaluate) {
			getElementsByClassName = function (className, tag, elm) {
				tag = tag || "*";
				elm = elm || document;
				var classes = className.split(" "),
					classesToCheck = "",
					xhtmlNamespace = "http://www.w3.org/1999/xhtml",
					namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
					returnElements = [],
					elements,
					node;
				for(var j=0, jl=classes.length; j<jl; j+=1){
					classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
				}
				try	{
					elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
				}
				catch (e) {
					elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
				}
				while ((node = elements.iterateNext())) {
					returnElements.push(node);
				}
				return returnElements;
			};
		}
		else {
			getElementsByClassName = function (className, tag, elm) {
				tag = tag || "*";
				elm = elm || document;
				var classes = className.split(" "),
					classesToCheck = [],
					elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
					current,
					returnElements = [],
					match;
				for(var k=0, kl=classes.length; k<kl; k+=1){
					classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
				}
				for(var l=0, ll=elements.length; l<ll; l+=1){
					current = elements[l];
					match = false;
					for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
						match = classesToCheck[m].test(current.className);
						if (!match) {
							break;
						}
					}
					if (match) {
						returnElements.push(current);
					}
				}
				return returnElements;
			};
		}
		return getElementsByClassName(className, tag, elm);
	};

	function getStyle(el,styleProp) {
		var value, defaultView = (el.ownerDocument || document).defaultView;
		// W3C standard way:
		if(defaultView && defaultView.getComputedStyle) {
			// sanitize property name to css notation
			// (hyphen separated words eg. font-Size)
			styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
			var styleValue = defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
			if(styleValue == 'auto') {
				if(styleProp == 'width') {
					if(el.offsetWidth) {
					    styleValue = el.offsetWidth;
					} else if(el.style.pixelWidth) {
					    styleValue = el.style.pixelWidth;
					}
				}else if(styleProp == 'height') {
					if(el.offsetHeight) {
					    styleValue = el.offsetHeight;
					} else if(el.style.pixelHeight) {
					    styleValue = el.style.pixelHeight;
					}
				}else if(styleProp == 'marginLeft') {
					styleValue = el.offsetLeft;
				}
			}
			return styleValue;
		}else if(el.currentStyle) { // IE
		        // sanitize property name to camelCase
		        styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
		            return letter.toUpperCase();
		        });
			value = el.currentStyle[styleProp];
			if(value == 'auto') {
				if(styleProp == 'width') {
					if(el.offsetWidth) {
					    value = el.offsetWidth;
					} else if(el.style.pixelWidth) {
					    value = el.style.pixelWidth;
					}
				}else if(styleProp == 'height') {
					if(el.offsetHeight) {
					    value = el.offsetHeight;
					} else if(el.style.pixelHeight) {
					    value = el.style.pixelHeight;
					}
				}else if(styleProp == 'marginLeft') {
					value = el.offsetLeft;
				}
			}
			// convert other units to pixels on IE
			//if(/^\d+(em|pt|%|ex)?$/i.test(value)) {
                        var valToString = value.toString();
                        if(valToString.indexOf('em') >= 0 || valToString.indexOf('pt') >= 0 ||
                            valToString.indexOf('%') >= 0 || valToString.indexOf('ex') >= 0) {
				return (function(value) {
					switch(styleProp) {
						case 'width': { value = el.clientWidth; break; }
						case 'height': { value = el.clientHeight; break; }
						default: {
							var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
							el.runtimeStyle.left = el.currentStyle.left;
							el.style.left = value || 0;
							value = el.style.pixelLeft + "px";
							el.style.left = oldLeft;
							el.runtimeStyle.left = oldRsLeft;
						}
					}
					return value;
			    	})(value);
			}
	        	return value;
		}
	};

	function getChilds(DOMnode,childArray,self) {
		var childs = [];

		if(typeof childArray !== 'undefined') { for(var j = 0;j < childArray.length;j++) childs[j] = childArray[j]; }

		var curDOMnode = ((typeof DOMnode !== 'undefined') ? (DOMnode) : ((!self.cacheOn)
			? ((self.detach) ? (self.thisEls.pop()) : (self.thisEls[self.thisEls.length - 1]))
			: ((self.detach) ? (self.thisEls[self.cacheIdx--]) : (self.thisEls[self.cacheIdx]))));

		var childNodes = curDOMnode.childNodes;
		for(var i = 0;i < childNodes.length;i++) {
			childs.push(childNodes[i]);
			var tmpChilds = getChilds(childNodes[i],childs,self);
			for(var c = 0;c < tmpChilds.length;c++) childs[c] = tmpChilds[c];
		}

		return childs;
	};

	function getParentOffset(lastEl) {
		var a = lastEl.offsetParent || document.body;
		while(a && a.tagName && a != document.body && getStyle(a,'position') == 'static')
		    a = a.offsetParent;
		var finalParent = a || document.documentElement;
		var parentOffset = {
			left: finalParent.getBoundingClientRect().left + ( window.pageXOffset || document.documentElement.scrollLeft )  - ( document.documentElement.clientLeft  || 0 ),
			top: finalParent.getBoundingClientRect().top + ( window.pageYOffset || document.documentElement.scrollTop )  - ( document.documentElement.clientTop  || 0 )
		};
		return parentOffset;
	};

	function styleToInt(styleProp) {
		return parseInt(styleProp);
	};

	function styleToFloat(styleProp) {
		return parseFloat(styleProp);
	};

	this.getChilds = function() {
		var elems = [];
		var cnt = 0;
		var childs = getChilds(void 0,void 0,this);
		this.forEach(childs,function(currentValue, index, arr) {
			elems[cnt++] =
				((!this.cacheOn) ?
					((this.detach) ? (new jsnutsElement().setDOMEl(currentValue)) : (new jsnutsElement().detachOff().setDOMEl(currentValue))) :
					((this.detach) ? (new jsnutsElement().cacheOn().setDOMEl(currentValue)) : (new jsnutsElement().detachOff().cacheOn().setDOMEl(currentValue))));
		});

		if(this.cacheOn)
			this.thisJsnutsEls[++this.cacheIdxj] = elems;

		return elems;
	};

	// add event cross browser
	this.addEvent = function(event, fn) {
            var elem = this.getDOMEl();
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
		if(typeof this[this.getId() + '_fn' + event] === 'undefined')
			this[this.getId() + '_fn' + event] = [];
		this[this.getId() + '_fn' + event].push(fn);

		if(typeof this.evtokens[this.getId()] === 'undefined') {
			this.evtokens[this.getId()] = [];
		}
		if(typeof this.evtokens[this.getId()][event] === 'undefined') {
			this.evtokens[this.getId()][event] = [];
		}
		this.evtokens[this.getId()][event].push({ elem: elem, handler: listenHandler, event: event });

	        return {elem: elem, handler: listenHandler, event: event};
	    } else {
	        elem.attachEvent("on" + event, attachHandler);
		if(typeof this[this.getId() + '_fn' + event] === 'undefined')
			this[this.getId() + '_fn' + event] = [];
		this[this.getId() + '_fn' + event].push(fn);

		if(typeof this.evtokens[this.getId()] === 'undefined') {
			this.evtokens[this.getId()] = [];
		}
		if(typeof this.evtokens[this.getId()][event] === 'undefined') {
			this.evtokens[this.getId()][event] = [];
		}
		this.evtokens[this.getId()][event].push({ elem: elem, handler: listenHandler, event: event });

	        return {elem: elem, handler: attachHandler, event: event};
	    }
	};

	this.removeEvent = function(eventName) {
		var tokens = this.evtokens[this.getId()][eventName];
		if(typeof tokens === 'undefined') return this;
		var cnt = this[this.getId() + '_fn' + eventName].length;
		while(cnt-- > 0) this[this.getId() + '_fn' + eventName].pop();
		this[this.getId() + '_fn' + eventName] = void 0;
		for(var token = 0;token < this.evtokens[this.getId()][eventName].length;token++) {
			var token = this.evtokens[this.getId()][eventName][token];
			if(token.elem.removeEventListener)
				token.elem.removeEventListener(token.event, token.handler);
			else
				token.elem.detachEvent("on" + token.event, token.handler);
		}
		cnt = this.evtokens[this.getId()][eventName].length;
		while(cnt-- > 0) {
			this.evtokens[this.getId()][eventName].pop();
		}
		this.evtokens[this.getId()][eventName] = void 0;
		return this;
	};

	this.callEventsFn = function(event) {
		if(typeof this[this.getId() + '_fn' + event] !== 'undefined') {
			for(var fn = 0;fn < this[this.getId() + '_fn' + event].length;fn++) {
				this[this.getId() + '_fn' + event][fn].apply(this);
			}
		}
	};

	this.setCacheOn = function(value) {
		this.setCacheOff();
		this.cacheOn = true;
		if(typeof value !== 'undefined') this.thisEls = new Array(value);
		return this;
	};

	this.setCacheOff = function() {
		this.cacheOn = false;
		var cnt = this.thisEls.length;
		while(cnt-- > 0) this.thisEls.pop();
		for(var i = 0;i < this.thisJsnutsEls.length;i++) {
			for(var j = 0;j < this.thisJsnutsEls[i].length;j++) {
				this.thisJsnutsEls[i][j].setCacheOff();
			}
		}
		cnt = this.thisJsnutsEls.length;
		var btmIdx = this.thisJsnutsEls.length - 1;
		while(cnt-- > 0) {
			var cnt2 = this.thisJsnutsEls[btmIdx].length;
			while(cnt2-- > 0) this.thisJsnutsEls[btmIdx].pop();
			--btmIdx;
			this.thisJsnutsEls.pop();
		}
		this.cacheIdx = -1;
		this.cacheIdxj = -1;
		this.thisEls = [];
		this.thisJsnutsEls = [];
		return this;
	};

	this.findById = function(id_dom_element) {
		if(!this.cacheOn)
			this.thisEls.push(document.getElementById(id_dom_element));
		else
			this.thisEls[++this.cacheIdx] = document.getElementById(id_dom_element);

		return this;
	};

	this.findByClass = function(class_dom_element) {
		var elems = [];
		var elemsByClassName = getElementsByClassName(class_dom_element);
		var cnt = 0;
		this.forEach(elemsByClassName,function(currentValue, index, arr) {
			elems[cnt++] =
				((!this.cacheOn) ?
					(new jsnutsElement().setDOMEl(currentValue)) :
					(new jsnutsElement().cacheOn().setDOMEl(currentValue)));
		});

		if(this.cacheOn)
			this.thisJsnutsEls[++this.cacheIdxj] = elems;

		return elems;
	};

	this.findByTag = function(tag_dom_element) {
		var elems = [];
		var elemsByTagName = document.getElementsByTagName(tag_dom_element);
		var cnt = 0;
		this.forEach(elemsByTagName,function(currentValue, index, arr) {
			elems[cnt++] =
				((!this.cacheOn) ?
					(new jsnutsElement().setDOMEl(currentValue)) :
					(new jsnutsElement().cacheOn().setDOMEl(currentValue)));
		});

		if(this.cacheOn)
			this.thisJsnutsEls[++this.cacheIdxj] = elems;

		return elems;
	};

	this.findByTagel = function(tag_dom_element) {
		var elems = [];
		var elemsByTagName = this.getDOMEl().getElementsByTagName(tag_dom_element);
		var cnt = 0;
		this.forEach(elemsByTagName,function(currentValue, index, arr) {
			elems[cnt++] =
				((!this.cacheOn) ?
					(new jsnutsElement().setDOMEl(currentValue)) :
					(new jsnutsElement().cacheOn().setDOMEl(currentValue)));
		});

		if(this.cacheOn)
			this.thisJsnutsEls[++this.cacheIdxj] = elems;

		return elems;
	};

	this.findByIdTag = function(tag_dom_element) {
		var elems = [];
		if(this.thisEls.length == 0) return elems;
		var cnt = 0;
		var childs = getChilds(void 0,void 0,this);

		this.forEach(childs,function(currentValue, index, arr) {
			if(typeof currentValue.tagName !== 'undefined' &&
				currentValue.tagName.toLowerCase() == tag_dom_element) {
				elems[cnt++] =
					((!this.cacheOn) ?
						((this.detach) ? (new jsnutsElement().setDOMEl(currentValue)) : (new jsnutsElement().detachOff().setDOMEl(currentValue))) :
						((this.detach) ? (new jsnutsElement().cacheOn().setDOMEl(currentValue)) : (new jsnutsElement().detachOff().cacheOn().setDOMEl(currentValue))));
			}
		});

		if(this.cacheOn)
			this.thisJsnutsEls[++this.cacheIdxj] = elems;

		return elems;
	};

	this.findByClassTag = function(class_dom_element,tag_dom_element) {
		var elems = [];
		var elemsByClassNameTag = getElementsByClassName(class_dom_element,tag_dom_element);
		var cnt = 0;
		this.forEach(elemsByClassNameTag,function(currentValue, index, arr) {
			elems[cnt++] =
				((!this.cacheOn) ?
					(new jsnutsElement().setDOMEl(currentValue)) :
					(new jsnutsElement().cacheOn().setDOMEl(currentValue)));
		});

		if(this.cacheOn)
			this.thisJsnutsEls[++this.cacheIdxj] = elems;

		return elems;
	};

	this.findByClassTagId = function(class_dom_element,tag_dom_element,id_dom_element) {
		var elems = [];
		var elemsByClassNameTagId = getElementsByClassName(class_dom_element,tag_dom_element,document.getElementById(id_dom_element));
		var cnt = 0;
		this.forEach(elemsByClassNameTagId,function(currentValue, index, arr) {
			elems[cnt++] =
				((!this.cacheOn) ?
					(new jsnutsElement().setDOMEl(currentValue)) :
					(new jsnutsElement().cacheOn().setDOMEl(currentValue)));
		});

		if(this.cacheOn)
			this.thisJsnutsEls[++this.cacheIdxj] = elems;

		return elems;
	};

	this.getAttribute = function(name) {
		if(this.thisEls.length == 0) return '';
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		return lastEl.getAttribute(name);
	};

	this.setAttribute = function(name,value) {
		if(this.thisEls.length == 0) return '';
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		lastEl.setAttribute(name,value);
		return this;
	};

	this.removeAttribute = function(name) {
		if(this.thisEls.length == 0) return '';
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		lastEl.removeAttribute(name);
		return this;
	};

	this.getId = function() {
		if(this.thisEls.length == 0) return '';
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		return lastEl.getAttribute('id');
	};

	this.getTag = function() {
		if(this.thisEls.length == 0) return '';
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		return ((typeof lastEl.tagName !== 'undefined') ? (lastEl.tagName.toLowerCase()) : (lastEl.nodeName.toLowerCase()));
	};

	this.detachOn = function(forceDetach) {
		this.detach = true;
		if(this.thisEls.length > 0) {
			if(typeof forceDetach !== 'undefined' && forceDetach == true) {
				if(!this.cacheOn)
					this.thisEls.pop();
				else
					--this.cacheIdx;
			}
		}
	};

	this.detachOff = function() {
		this.detach = false;
		return this;
	};

	this.getDOMEl = function() {
		if(this.thisEls.length == 0) return null;
		return ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
	};

	this.setDOMEl = function(DOMEl) {
		if(!this.cacheOn)
			this.thisEls.push(DOMEl);
		else
			this.thisEls[++this.cacheIdx] = DOMEl;
		return this;
	};

	this.replaceDOMEl = function(DOMEl) {
		if(thisEls.length == 0) return;
		if(!this.cacheOn)
			this.thisEls[this.thisEls.length - 1] = DOMEl;
		else
			this.thisEls[this.cacheIdx] = DOMEl;
		return this;
	};

	this.detachDOMEl = function() {
		if(this.thisEls.length == 0) return;
		if(!this.cacheOn)
			this.thisEls.pop();
		else
			--this.cacheIdx;
	};

	this.getStyle = function(styleProp,params) {
		if(this.thisEls.length == 0) return '';
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		if(typeof params === 'undefined')
			return getStyle(lastEl,styleProp);
		else if(params.styleToInt)
			return styleToInt(getStyle(lastEl,styleProp));
		else if(params.styleToFloat)
			return styleToFloat(getStyle(lastEl,styleProp));
		else
			return '';
	};
        
	this.setStyle = function(styleProp,value) {
		if(this.thisEls.length == 0) return '';
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		var CCstyleProp = styleProp.replace(/\-(\w)/g, function(str, letter) { return letter.toUpperCase(); });
		lastEl.style[CCstyleProp] = value;
		return this;
	};

	this.getClassName = function() {
		if(this.thisEls.length == 0) return '';
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		return (lastEl.getAttribute('class') != null) ? (lastEl.getAttribute('class')) : (lastEl.className);
	};

	this.addClass = function(className) {
		if(this.thisEls.length == 0) return '';

		var classes = this.getClassName(); // pop() o --cacheIdx
		var lastEl = ((!this.cacheOn)? (this.thisEls[this.thisEls.length - 1]) : (this.thisEls[this.cacheIdx]));

		classes = ((classes == null || classes.length <= 0) ? ('') : (classes));
		classes += ((classes.length > 0) ? (' ') : ('')) + this.trim(className);

		lastEl.className = classes;
                
		return this;
	};

	this.removeClass = function(className) {
		if(this.thisEls.length == 0) return '';

		var classes = this.getClassName(); // pop() o --cacheIdx
		var lastEl = ((!this.cacheOn)? (this.thisEls[this.thisEls.length - 1]) : (this.thisEls[this.cacheIdx]));

		classes = ((classes == null || classes.length <= 0) ? ('') : (classes));
		classes = classes.replace(className,'');

		var classes_split = classes.split(' ');
		var finalClasses = '';
		for(var i = 0;i < classes_split.length;i++)
			if(classes_split[i].length > 0)
				finalClasses += ((finalClasses.length > 0) ? (' ' + classes_split[i]) : (classes_split[i]));
		if(finalClasses.length > 0) classes = finalClasses;

		lastEl.setAttribute('class',classes);
		return this;
	};

	this.getStyles = function() {
		var styles = [];
		if(this.thisEls.length == 0) return styles;
		var className = this.getClassName();
		if(typeof className === 'undefined' || className == '' || className == null) return styles;
		var classNames = className.split(' ');
		for(var c = 0;c < classNames.length;c++) {
			for(var i = 0;i < document.styleSheets.length;i++) {
				var cssRules = (document.styleSheets[i].cssRules) ? (document.styleSheets[i].cssRules) : (document.styleSheets[i].rules);
				var skipLastBracket = (document.styleSheets[i].cssRules) ? (-1) : (0); // -1 salta la chiusura dallo split(';') ("}") (FF)
				for(var r = 0;r < cssRules.length;r++) {
					var selectorText = cssRules[r].selectorText;
					if(selectorText.indexOf(classNames[c]) > -1 && selectorText.length == classNames[c].length + 1) {
						var cssText = cssRules[r].style.cssText;
						var nStyles = cssText.split(';');
						for(var s = 0;s < nStyles.length + skipLastBracket;s++) {
							var styleAndValue = nStyles[s].toLowerCase().split(':');
							styles[s] = { style:this.trim(styleAndValue[0]),value:this.trim(styleAndValue[1]) };
						}
					}
				}
			}
		}
		return styles;
	};

	this.width = function(value) {
		if(this.thisEls.length == 0) return '';
		if(typeof value === 'undefined')
			return parseFloat(this.getStyle('width'));
		else {
			var lastEl = ((!this.cacheOn)
				? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
				: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));

			lastEl.style.width = value + 'px';
		}
	};

	this.height = function(value) {
		if(this.thisEls.length == 0) return '';
		if(typeof value === 'undefined')
			return parseFloat(this.getStyle('height'));
		else {
			var lastEl = ((!this.cacheOn)
				? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
				: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));

			lastEl.style.height = value + 'px';
		}
	};

	this.setLpos = function(value) {
		if(this.thisEls.length == 0) return '';
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		lastEl.style.left = value + 'px';
		return this;
	};

	this.setTpos = function(value) {
		if(this.thisEls.length == 0) return '';
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));

		lastEl.style.top = value + 'px';
		return this;
	};

	this.setLTpos = function(left,top) {
		this.setLpos(left);
		this.setTpos(top);
		return this;
	};

	this.getLpos = function() {
		if(this.thisEls.length == 0) return '';
		var lastEl =
			((!this.cacheOn) ? (this.thisEls[this.thisEls.length - 1]) :
			(this.thisEls[this.cacheIdx]));
		var parentOffset;
		if(getStyle(lastEl,'position') === 'fixed')
			parentOffset = lastEl.getBoundingClientRect();
		else
			parentOffset = getParentOffset(lastEl);

		// tolgo il detach temporaneamente perch� chiama hasStyle() 2 volte
		var last_detach = this.detach;
		this.detachOff();
		var lastEloffsetLeft = lastEl.getBoundingClientRect().left + ( window.pageXOffset || document.documentElement.scrollLeft )  - ( document.documentElement.clientLeft  || 0 );
		var lpos = lastEloffsetLeft -
			((this.hasStyle('margin') || this.hasStyle('margin-left')) ? (this.getStyle('margin-left',{styleToInt:true})) : (0));

		// ripristino il detach
		this.detach = last_detach;
		((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));

		return lpos;
	};
        

	this.hasStyle = function(style) {
		var styles = this.getStyles();
		for(var s = 0;s < styles.length;s++) {
			if(styles[s].style == style) return true;
		}
		styles = this.getInlineStyles();
		for(var s = 0;s < styles.length;s++) {
			if(styles[s].style == style) return true;
		}
		return false;
	};

	this.getTpos = function() {
		if(this.thisEls.length == 0) return '';
		var lastEl =
			((!this.cacheOn) ? (this.thisEls[this.thisEls.length - 1]) :
			(this.thisEls[this.cacheIdx]));
		var parentOffset;
		if(getStyle(lastEl,'position') === 'fixed')
			parentOffset = lastEl.getBoundingClientRect();
		else
			parentOffset = getParentOffset(lastEl);

		// tolgo il detach temporaneamente perchè chiama hasStyle() 2 volte
		var last_detach = this.detach;
		this.detachOff();
		var lastEloffsetTop = lastEl.getBoundingClientRect().top + ( window.pageYOffset || document.documentElement.scrollTop )  - ( document.documentElement.clientTop  || 0 );
		var tpos = lastEloffsetTop -
			((this.hasStyle('margin') || this.hasStyle('margin-top')) ? (this.getStyle('margin-top',{styleToInt:true})) : (0));

		// ripristino il detach
		this.detach = last_detach;
		((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));

		return tpos;
	};

	this.scroll = function(which,value) {
		if(typeof which === 'undefined' || (which != 'top' && which != 'left')) return 0;
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));

		// lettura
		if(typeof value === 'undefined') {
			if(which == 'top') {
				var scrollTop = typeof lastEl.pageYOffset !== 'undefined' ? lastEl.pageYOffset : typeof lastEl.scrollTop !== 'undefined' ? lastEl.scrollTop : 0;
				return scrollTop;
			}else if(which == 'left') {
				// TODO
				// ...
			}
		// scrittura
		}else {
			if(which == 'top') {
				if(typeof lastEl.pageYOffset !== 'undefined')
					lastEl.pageYOffset = value;
				else if(typeof lastEl.scrollTop !== 'undefined')
					lastEl.scrollTop = value;
			}else if(which == 'left') {
				// TODO
				// ...
			}
		}
	};

	this.getHtml = function() {
		if(this.thisEls.length == 0) return '';
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		return lastEl.innerHTML;
	};

	this.setHtml = function(innerHTML) {
		if(this.thisEls.length == 0) return '';
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		lastEl.innerHTML = innerHTML;
		return this;
	};

	this.wrap = function(wrapper) {
		if(this.thisEls.length == 0) return;
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		var wrapperObj = (!(wrapper instanceof jsnutsElement)) ? (document.createElement(wrapper)) : (wrapper.getDOMEl());
		lastEl.parentNode.insertBefore(wrapperObj,lastEl);
		wrapperObj.appendChild(lastEl);
		return this;
	};

	this.insertAfter = function(dom_element) {
		if(this.thisEls.length == 0) return;
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		var referenceNode = (!(dom_element instanceof jsnutsElement)) ? (document.getElementById(dom_element)) : (dom_element.getDOMEl());
		referenceNode.parentNode.insertBefore(lastEl,referenceNode.nextSibling);
		return this;
	};

	this.append = function(dom_element) {
		if(this.thisEls.length == 0) return;
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		var referenceNode = (!(dom_element instanceof jsnutsElement)) ?	(dom_element) :	(dom_element.getDOMEl());
		lastEl.appendChild(referenceNode);
		return this;
	};

	this.remove = function() {
		if(this.thisEls.length == 0) return;
		var lastEl = ((!this.cacheOn)
			? ((this.detach) ? (this.thisEls.pop()) : (this.thisEls[this.thisEls.length - 1]))
			: ((this.detach) ? (this.thisEls[this.cacheIdx--]) : (this.thisEls[this.cacheIdx])));
		lastEl.parentNode.removeChild(lastEl);
		return this;
	};

	this.isElement = function(o) {
		return (typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
			o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string");
	};

	this.switchDisplay = function() {
		if(this.getStyle('display') == 'none')
			this.setStyle('display','');
		else
			this.setStyle('display','none');
	};

	this.switchVisibility = function() {
		if(this.getStyle('visibility') == 'hidden')
			this.setStyle('visibility','visible');
		else
			this.setStyle('visibility','hidden');
	};

	this.getInlineStyles = function() {
		var inlineStyles = [];
		if(typeof this.getAttribute('style') !== 'undefined' && this.getAttribute('style') != '' && this.getAttribute('style') != null) {
			var attrStyle = (typeof this.getAttribute('style').cssText !== 'undefined') ? (this.getAttribute('style').cssText) : (this.getAttribute('style'));
			var nStyles = attrStyle.split(';');
			for(var s = 0;s < nStyles.length;s++) {
				if(nStyles[s] == '') continue;
				var styleAndValue = nStyles[s].toLowerCase().split(':');
				inlineStyles[s] = { style:this.trim(styleAndValue[0]),value:this.trim(styleAndValue[1]) };
			}
		}
		return inlineStyles;
	};

	this.isVisible = function() {
		var posLTin = (this.getLpos() >= 0 && this.getTpos() >= 0) &&
			(this.getLpos() < jsnutsGlobals.nwindow.width()) &&
			(this.getTpos() < jsnutsGlobals.nwindow.height());
		var inlineStyles = this.getInlineStyles();
		var classStyles = this.getStyles();
		var displayOrVisibility = void 0;
		var searchArray = null;
		for(var c = 0;c < 2;c++) {

			if(typeof displayOrVisibility !== 'undefined') break;

			if(c == 0)
				searchArray = inlineStyles;
			else
				searchArray = classStyles;

			for(var s = 0;s < searchArray.length;s++) {
				if(searchArray[s].style == 'display' && searchArray[s].value != 'none') {
					displayOrVisibility = true;
					break;
				}else if(searchArray[s].style == 'display' && searchArray[s].value == 'none') {
					displayOrVisibility = false;
					break;
				}
				else if(searchArray[s].style == 'visibility' && searchArray[s].value != 'hidden') {
					displayOrVisibility = true;
					break;
				}
				else if(searchArray[s].style == 'visibility' && searchArray[s].value == 'hidden') {
					displayOrVisibility = false;
					break;
				}
			}

		}

		if(typeof displayOrVisibility !== 'undefined')
			return posLTin && displayOrVisibility;
		else
			return posLTin;
	};
}