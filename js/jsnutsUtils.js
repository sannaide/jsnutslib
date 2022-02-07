function jsnutsUtils() {

	jsnutsElement.call(this);

	this.dbgPreparePans = function(id_dom_contents) {
		// wrap
		var jsne = new jsnutsElement().detachOff();
		jsne.setDOMEl(document.createElement('div'));
		jsne.setAttribute('id','workpan');
		jsne.setAttribute('style','width:70%; float:left;');
		this.findById(id_dom_contents).wrap(jsne);

		// insertAfter
		jsne.setDOMEl(document.createElement('div'));
		jsne.setAttribute('id','dbgpan');
		jsne.setAttribute('style','width:30%; position:fixed;');
		jsne.setHtml('<textarea id="dbga" style="width:100%; overflow-y:auto;" rows="50"></textarea>');
		jsne.insertAfter('workpan');

		jsne.setDOMEl(document.createElement('div'));
		jsne.setAttribute('style','clear:both;');
		jsne.insertAfter('dbgpan');

		jsne.detachOn();
		jsne.findById('dbgpan').setLpos(jsne.findById(id_dom_contents).getLpos() + jsne.findById(id_dom_contents).width());
	};

	this.dbgs = function(text) {
		this.findById('dbga').getDOMEl().value = this.findById('dbga').getDOMEl().value + text;
	};

	this.dbgsn = function(text) {
		this.findById('dbga').getDOMEl().value = this.findById('dbga').getDOMEl().value + text + '\n';
	};

	this.getBody = function() {
		return this.findByTag('body')[0].getHtml();
	};

	this.getHtml = function() {
		return this.findByTag('html')[0].getHtml();
	};
	
	this.isMobile = function() {
		return isMobile.any;
	};

	this.setCursorPosition = function(elem,pos) {

	    elem.focus();
	
	    if(elem.setSelectionRange) {

		elem.setSelectionRange(pos, pos);

	    }else if(elem.createTextRange) {

		var range = elem.createTextRange();
		range.collapse(true);
		if(pos < 0) {
			pos = elem.value.length + pos;
		}
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();

	    }
	
	};

	this.getCursorPosition = function(oField) {
	 // Initialize
	  var iCaretPos = 0;
	
	  // IE Support
	  if (document.selection) {
	
	    // Set focus on the element
	    oField.focus();
	
	    // To get cursor position, get empty selection range
	    var oSel = document.selection.createRange();
	
	    // Move selection start to 0 position
	    oSel.moveStart('character', -oField.value.length);
	
	    // The caret position is selection length
	    iCaretPos = oSel.text.length;
	  }
	
	  // Firefox support
	  else if (oField.selectionStart || oField.selectionStart == '0')
	    iCaretPos = oField.selectionStart;
	
	  // Return results
	  return iCaretPos;
	};

	this.getInputSelection = function(el) {

/*
var textBox = document.getElementById("textBoxId");
textBox.focus();
alert( getInputSelection(textBox).start ); 
*/

	    var start = 0, end = 0, normalizedValue, range,
	        textInputRange, len, endRange;
	
	    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
	        start = el.selectionStart;
	        end = el.selectionEnd;
	    } else {
		el.focus();
	        range = document.selection.createRange();
	
	        if (range && range.parentElement() == el) {
	            len = el.value.length;
	            normalizedValue = el.value.replace(/\r\n/g, "\n");
	
	            // Create a working TextRange that lives only in the input
	            textInputRange = el.createTextRange();
	            textInputRange.moveToBookmark(range.getBookmark());
	
	            // Check if the start and end of the selection are at the very end
	            // of the input, since moveStart/moveEnd doesn't return what we want
	            // in those cases
	            endRange = el.createTextRange();
	            endRange.collapse(false);
	
	            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
	                start = end = len;
	            } else {
	                start = -textInputRange.moveStart("character", -len);
	                start += normalizedValue.slice(0, start).split("\n").length - 1;
	
	                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
	                    end = len;
	                } else {
	                    end = -textInputRange.moveEnd("character", -len);
	                    end += normalizedValue.slice(0, end).split("\n").length - 1;
	                }
	            }
	        }
	    }
	
	    return {
	        start: start,
	        end: end
	    };
	};

	this.padLeft = function(nr,n,str) {
		return Array(n-String(nr).length+1).join(str||'0')+nr;
	};

	this.browserDetect = function() {
		jsnutsGlobals.curBrowser = '';
		var div = document.createElement('div');
		div.innerHTML = 'X<!--[if IE]>true<![endif]-->';
		if(div.innerHTML.substring(1).indexOf('<!--[if') < 0 && div.innerHTML.length > 1) {
			var ieVersion = 4, all = div.getElementsByTagName('i');
			while (
			    div.innerHTML = '<!--[if gt IE ' + (++ieVersion) + ']><i></i><![endif]-->',
			    all[0]
			) {}
			jsnutsGlobals.curBrowser = 'IE' + ieVersion;
		// eccezione IE9 riconosce solo il suo e non [if IE]
		}else {
			div.innerHTML = 'X<!--[if IE 9]>true<![endif]-->';
			if(div.innerHTML.substring(1).indexOf('<!--[if') < 0 && div.innerHTML.length > 1) {
				jsnutsGlobals.curBrowser = 'IE9';
			} else if((typeof Function('/*@cc_on return document.documentMode===10@*/')() !== 'undefined'))
				jsnutsGlobals.curBrowser = 'IE10';
			else if((!(window.ActiveXObject) && 'ActiveXObject' in window))
				jsnutsGlobals.curBrowser = 'IE11';
			else if(navigator.userAgent.indexOf('Edge/') > -1)
				jsnutsGlobals.curBrowser = 'Edge';
			else if(navigator.userAgent.indexOf('Firefox/') > -1 || typeof InstallTrigger !== 'undefined')
				jsnutsGlobals.curBrowser = 'Firefox';
			else if(navigator.userAgent.indexOf('Chrome/') > -1)
				jsnutsGlobals.curBrowser = 'Chrome';
		}
	};

	this.HTML5Detect = function() {
		jsnutsGlobals.stdHTML5 = this.stdHTML5();
	};
        
        this.mobileDetect = function() {
            	jsnutsGlobals.browserMobile = this.isMobile();
        };

	// interessante per manipolazione DOM
	this.browserDetect2 = function() {
		var styles = document.getElementsByTagName('style');
		var last_style_dom = styles[styles.length - 1];
		var is_functions = 
			'function isIE() {return (typeof isIEchk !== \'undefined\');}'+
			'function isIE6() {return (typeof isIE6chk !== \'undefined\');}'+
			'function isIE7() {return (typeof isIE7chk !== \'undefined\');}'+
			'function isIE8() {return (typeof isIE8chk !== \'undefined\');}'+
			'function isIE9() {return (typeof isIE9chk !== \'undefined\');}'+
			'function isIE10() {return (typeof Function(\'/*@cc_on return document.documentMode===10@*/\')() !== \'undefined\');}'+
			'function isIE11() {return (!(window.ActiveXObject) && \'ActiveXObject\' in window);}'+
			'function isEdge(userAgent) { userAgent = userAgent || navigator.userAgent; return userAgent.indexOf(\'Edge\/\') > -1;}'+
			'function isFF(userAgent) { userAgent = userAgent || navigator.userAgent; return userAgent.indexOf(\'Firefox\/\') > -1 || typeof InstallTrigger !== \'undefined\';}';
		var script = document.createElement('script');
		script.setAttribute('type','text/javascript');
		script.text = is_functions;
		last_style_dom.parentNode.insertBefore(script,last_style_dom.nextSibling);

		var divwithscript = document.createElement('div');
		for(var b = 6, ie_only = true;b <= 9;) {
			if(ie_only) {
				divwithscript.innerHTML = 'X<!--[if IE]><script type="text/javascript">function isIEchk() {}</script><![endif]-->';
				ie_only = false;
			}
			else {
				divwithscript.innerHTML = 'X<!--[if IE ' + b + ']><script type="text/javascript">function isIE' + b + 'chk() {}</script><![endif]-->';
				++b;
			}
			if(divwithscript.innerHTML.substring(1).indexOf('<!--[if') < 0 && divwithscript.innerHTML.length > 1) {
				var divscript = divwithscript.getElementsByTagName('script')[0];
				var content = divscript.text;
				var script = document.createElement('script');
				script.setAttribute('type','text/javascript');
				script.text = content;
				last_style_dom.parentNode.insertBefore(script,last_style_dom.nextSibling);
			}
		}
	};

	this.stdHTML5 = function() {
		return (typeof document.createElement('canvas').getContext === "function");
	};

	this.decToHex = function(num) {
		var asciitab = [
			{a:'0',d:48},{a:'1',d:49},{a:'2',d:50},{a:'3',d:51},{a:'4',d:52},
			{a:'5',d:53},{a:'6',d:54},{a:'7',d:55},{a:'8',d:56},{a:'9',d:57},
			{a:'a',d:97},{a:'b',d:98},{a:'c',d:99},{a:'d',d:100},{a:'e',d:101},
			{a:'f',d:102}];
		var decimalNumber = num, remainder, quotient;
		var i = 1, j, temp;
		var hexadecimalNumber = [];

		quotient = decimalNumber;
		while(parseInt(quotient) != 0) {
			temp = parseInt(quotient % 16);
			if(temp < 10)
			         temp = temp + 48;
			else
			         temp = temp + 87;

			var asciiFound = false;
			for(var a = 0;a < asciitab.length;a++) {
				if(asciitab[a].d == temp) {
					temp = asciitab[a].a;
					asciiFound = true;
					break;
				}
			}
			if(!asciiFound) return null;

			hexadecimalNumber[i++]= temp;

			quotient = quotient / 16;
		}
		var hexNum = '';
		for(j = i - 1;j > 0;j--) hexNum += hexadecimalNumber[j];

		return hexNum;
	};

	this.mouseXY = function(e) {
		//var evtarget = ((typeof e.target !== 'undefined') ? (e.target) : (e.srcElement));
	    	//var target = self.jsne.setDOMEl(evtarget);
		//var borderLeftWidth = parseInt(target.getStyle('borderLeftWidth'), 10);
		//var borderTopWidth = parseInt(target.getStyle('borderTopWidth'), 10);
		//var offsetX = e.clientX - borderLeftWidth;
		//var offsetY = e.clientY - borderTopWidth;

		// relative
	    	//var target = self.jsne.setDOMEl(evtarget);
		//var borderLeftWidth = parseInt(target.getStyle('borderLeftWidth'), 10);
		//var borderTopWidth = parseInt(target.getStyle('borderTopWidth'), 10);
		//var rect = target.getDOMEl().getBoundingClientRect();
		//var offsetX = e.clientX - borderLeftWidth - rect.left;
		//var offsetY = e.clientY - borderTopWidth; - rect.top;

		var offsetX = e.clientX + ( window.pageXOffset || document.documentElement.scrollLeft ) - ( document.documentElement.clientLeft || 0 );
		var offsetY = e.clientY + ( window.pageYOffset || document.documentElement.scrollTop ) - ( document.documentElement.clientTop || 0 );
		return { x:offsetX, y:offsetY };
	};
}

// ---------------
!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,h=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,i=/IEMobile/i,j=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,k=/BlackBerry/i,l=/BB10/i,m=/Opera Mini/i,n=/(CriOS|Chrome)(?=.*\bMobile\b)/i,o=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,p=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),q=function(a,b){return a.test(b)},r=function(a){var r=a||navigator.userAgent,s=r.split("[FBAN");return"undefined"!=typeof s[1]&&(r=s[0]),s=r.split("Twitter"),"undefined"!=typeof s[1]&&(r=s[0]),this.apple={phone:q(b,r),ipod:q(c,r),tablet:!q(b,r)&&q(d,r),device:q(b,r)||q(c,r)||q(d,r)},this.amazon={phone:q(g,r),tablet:!q(g,r)&&q(h,r),device:q(g,r)||q(h,r)},this.android={phone:q(g,r)||q(e,r),tablet:!q(g,r)&&!q(e,r)&&(q(h,r)||q(f,r)),device:q(g,r)||q(h,r)||q(e,r)||q(f,r)},this.windows={phone:q(i,r),tablet:q(j,r),device:q(i,r)||q(j,r)},this.other={blackberry:q(k,r),blackberry10:q(l,r),opera:q(m,r),firefox:q(o,r),chrome:q(n,r),device:q(k,r)||q(l,r)||q(m,r)||q(o,r)||q(n,r)},this.seven_inch=q(p,r),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},s=function(){var a=new r;return a.Class=r,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=r:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=s():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=s()):a.isMobile=s()}(this);

// ---------------
var crypto = window.crypto || window.msCrypto || null; // IE11 fix

var Guid = Guid || (function() {

  var EMPTY = '00000000-0000-0000-0000-000000000000';

  var _padLeft = function(paddingString, width, replacementChar) {
    return paddingString.length >= width ? paddingString : _padLeft(replacementChar + paddingString, width, replacementChar || ' ');
  };

  var _s4 = function(number) {
    var hexadecimalResult = number.toString(16);
    return _padLeft(hexadecimalResult, 4, '0');
  };

  var _cryptoGuid = function() {
    var buffer = new window.Uint16Array(8);
    window.crypto.getRandomValues(buffer);
    return [_s4(buffer[0]) + _s4(buffer[1]), _s4(buffer[2]), _s4(buffer[3]), _s4(buffer[4]), _s4(buffer[5]) + _s4(buffer[6]) + _s4(buffer[7])].join('-');
  };

  var _guid = function() {
    var currentDateMilliseconds = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(currentChar) {
      var randomChar = (currentDateMilliseconds + Math.random() * 16) % 16 | 0;
      currentDateMilliseconds = Math.floor(currentDateMilliseconds / 16);
      return (currentChar === 'x' ? randomChar : (randomChar & 0x7 | 0x8)).toString(16);
    });
  };

  var create = function() {
    var hasCrypto = crypto !== 'undefined' && crypto !== null,
      hasRandomValues = typeof(window.crypto.getRandomValues) !== 'undefined';
    return (hasCrypto && hasRandomValues) ? _cryptoGuid() : _guid();
  };

  return {
    newGuid: create,
    empty: EMPTY
  };
})();

/*
console.log(Guid.newGuid());
*/

// ---------------
(function(funcName, baseObj) {
    // The public function name defaults to window.docReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }

})("docReady", window);
