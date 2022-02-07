function jsnutsInputtextTime(id_dom_input) {

	if(!jsnutsGlobals.stdHTML5  || jsnutsGlobals.curBrowser == 'IE9')
		jsnutsInputtext.call(this,id_dom_input);
	else
		jsnutsInputtextHtml5.call(this,id_dom_input);

	this.placeholder = 'inserisci hh:mm';

	var self = this;

	function isTimeValid(s) {
		
		var bits = s.split(':');
		var mm = bits[1], hh  = bits[0];
		
		if(
			((mm.length < 1 || mm.length > 2) || isNaN(mm) || (parseInt(mm,10) > 59 || parseInt(mm,10) < 0)) ||
			((hh.length < 1 || hh.length > 2) || isNaN(hh) || (parseInt(hh,10) > 23 || parseInt(hh,10) < 0))) return false;
		
		return true;
		
	};

	function formatTime() {

		// hh:mm

		var myTimeText = self.getVal();
		var finalTimeText = myTimeText;

		if(myTimeText.length == 0) return;

		// cerco separatori ":"
		var colonCount = ((myTimeText.match(/:/g) || []).length);
		if(colonCount == 0) {

			// prova a formattare
			finalTimeText = myTimeText.charAt(0) + myTimeText.charAt(1) + ":" + myTimeText.charAt(2) + myTimeText.charAt(3);
			if(!isTimeValid(finalTimeText)) {
				finalTimeText = "";
			}

		}else if(colonCount == 1) {
			
			if(!isTimeValid(finalTimeText)) { 
				finalTimeText = "";
			}
		}
		else {
			finalTimeText = "";
		}

		if(finalTimeText.length == 0)
			self.textToPlaceholder();
		else
			self.setVal(finalTimeText);
	
	};

	var ftagInitUI = (!jsnutsGlobals.stdHTML5) ? ('jsnutsInputtextInitUI') : ('jsnutsInputtextHtml5InitUI');
	this.polymorph(ftagInitUI,this.initUI);
	this.initUI = function() {
		this.polymorph(ftagInitUI).fn.apply(this);
	};

	var ftagInitEvents = (!jsnutsGlobals.stdHTML5) ? ('jsnutsInputtextInitEvents') : ('jsnutsInputtextHtml5InitEvents');
	this.polymorph(ftagInitEvents,this.initEvents);
	this.initEvents = function() {
		this.polymorph(ftagInitEvents).fn.apply(this);

		this.addEvent('blur',function(e) {
			if(self.getVal() != '') formatTime();
		});
	};
}