function jsnutsInputtextDate(
	id_dom_input,
	id_dom_calendar,
	id_dom_calendar_monthyear,
	id_dom_calendar_daysofweek,
	id_dom_calendar_days,
	id_dom_a_calendar_previous,
	id_dom_a_calendar_next) {

	if(!jsnutsGlobals.stdHTML5 || jsnutsGlobals.curBrowser == 'IE9')
		jsnutsInputtext.call(this,id_dom_input);
	else
		jsnutsInputtextHtml5.call(this,id_dom_input);

	this.placeholder = 'inserisci gg/mm/aaaa';
	this.id_dom_calendar = id_dom_calendar;
	this.id_dom_calendar_monthyear = id_dom_calendar_monthyear;
	this.id_dom_calendar_daysofweek = id_dom_calendar_daysofweek;
	this.id_dom_calendar_days = id_dom_calendar_days;
	this.id_dom_a_calendar_previous = id_dom_a_calendar_previous;
	this.id_dom_a_calendar_next = id_dom_a_calendar_next;
	this.jsne = new jsnutsElement();
	this.jsneCalendar = new jsnutsElement();
	this.jsneCalendarMonthyear = new jsnutsElement();
	this.jsneCalendarDaysofweek = new jsnutsElement();
	this.jsneCalendarDays = new jsnutsElement();
	this.jsneCalendarPrevious = new jsnutsElement();
	this.jsneCalendarNext = new jsnutsElement();
	this.jsneCalButton = new jsnutsElement();
	this.cal_button = null;
	this.adays = [];

	this.curMonth = new Date().getMonth();
	this.curYear = new Date().getYear(); if( this.curYear < 1000 ) { this.curYear += 1900; }

	var self = this;

	this.utils = new jsnutsUtils();

	(function init() {
		if(typeof id_dom_input !== 'undefined')
			self.jsneCalButton.findById(id_dom_input + '_button');
		if(typeof id_dom_calendar !== 'undefined')
			self.jsneCalendar.findById(id_dom_calendar);
		if(typeof id_dom_calendar_monthyear !== 'undefined')
			self.jsneCalendarMonthyear.findById(id_dom_calendar_monthyear);
		if(typeof id_dom_calendar_daysofweek !== 'undefined')
			self.jsneCalendarDaysofweek.findById(id_dom_calendar_daysofweek);
		if(typeof id_dom_calendar_days !== 'undefined')
			self.jsneCalendarDays.findById(id_dom_calendar_days);
		if(typeof id_dom_a_calendar_previous !== 'undefined')
			self.jsneCalendarPrevious.findById(id_dom_a_calendar_previous);
		if(typeof id_dom_a_calendar_next !== 'undefined')
			self.jsneCalendarNext.findById(id_dom_a_calendar_next);

		self.jsne.detachOff();
		self.jsneCalendar.detachOff();
		self.jsneCalendarDaysofweek.detachOff();
		self.jsneCalendarDays.detachOff();
		self.jsneCalendarPrevious.detachOff();
		self.jsneCalendarNext.detachOff();
		self.jsneCalButton.detachOff();
	}());

	function isDateValid(s) {
		var bits = s.split('/');
		var y = bits[2], m = bits[1], d = bits[0];

		if( ((d.length < 1 || d.length > 2) || isNaN(d) || (parseInt(d,10) < 1 || parseInt(d,10) > 31)) ||
		    ((m.length < 1 || m.length > 2) || isNaN(m) || (parseInt(m,10) < 1 || parseInt(m,10) > 12)) ||
		    ((y.length < 2 || y.length > 4) || isNaN(y))) return false;

		// Assume not leap year by default (note zero index for Jan)
		var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	
		// If evenly divisible by 4 and not evenly divisible by 100,
		// or is evenly divisible by 400, then a leap year
		if((!(y % 4) && y % 100) || !(y % 400)) {
			daysInMonth[1] = 29;
		}
		m = parseInt(m,10);
		return d <= daysInMonth[--m];
		
	};

	function formatDate() {

		// dd/mm/yyyy
		var miaDataText = self.getVal();
		var finalDataText = miaDataText;

		if(miaDataText.length == 0) return;

		// cerco separatori "/"
		var slashCount = ((miaDataText.match(/\//g) || []).length);
		if(slashCount == 0) {
			// prova a formattare
			finalDataText = miaDataText.charAt(0) + miaDataText.charAt(1) + "/" + miaDataText.charAt(2) + miaDataText.charAt(3) + "/" + miaDataText.charAt(4) + miaDataText.charAt(5) + miaDataText.charAt(6) + miaDataText.charAt(7);
			if(!isDateValid(finalDataText)) {
				finalDataText = "";
			}
		}else if(slashCount == 2) {
			if(!isDateValid(finalDataText)) { 
				finalDataText = "";
			}
		}
		else {
			finalDataText = "";
		}

		if(finalDataText.length == 0)
			self.textToPlaceholder();
		else
			self.setVal(finalDataText);
	
	};

	this.setCalButton = function(cal_button) {
		this.cal_button = cal_button;
	};

	this.adjCalButton = function() {
		// fa posto per il pulsante del combo
		if(this.cal_button != null) {
			this.cal_button.initUI();
			this.cal_button.initEvents();

                        if(jsnutsGlobals.curBrowser != 'IE9' && jsnutsGlobals.curBrowser != 'IE10' && jsnutsGlobals.curBrowser != 'IE11')
                            this.width(this.width() - this.jsneCalButton.width());
                        else {
                            this.width(this.width() - this.jsneCalButton.width() -
                                (((this.jsneCalButton.getStyle('margin-left',{styleToInt:true}) != 0) ? (this.jsneCalButton.getStyle('margin-left',{styleToInt:true}))
                                : ((this.jsneCalButton.getStyle('padding-left',{styleToInt:true}) != 0) ? (this.jsneCalButton.getStyle('padding-left',{styleToInt:true})) : (0))) * 2) - 2);
                        }
			if(typeof this.removeUIE !== 'undefined') {
				this.removeUIE();
				this.polymorph(ftagInitUI).fn.apply(this);
				this.polymorph(ftagInitEvents).fn.apply(this);
				this.cal_button.reposition();
			}
			var clickDblClickEvent = function() {
				var winW = jsnutsGlobals.nwindow.width();
				var winH = jsnutsGlobals.nwindow.height();
				if(self.jsneCalendar.width() < 250)
					self.jsneCalendar.width(250);
				var calLeft = self.jsneCalButton.getLpos();
				var calTop = self.jsneCalButton.getTpos() + self.jsneCalButton.height();
                                if(jsnutsGlobals.curBrowser == 'IE9' || jsnutsGlobals.curBrowser == 'IE10') calTop += 4;
				self.jsneCalendar.setLTpos(calLeft,calTop);
				if((calLeft + self.jsneCalendar.width()) > winW) {
                                        if(jsnutsGlobals.curBrowser == 'IE9' || jsnutsGlobals.curBrowser == 'IE10' || jsnutsGlobals.curBrowser == 'IE11') {
                                            calLeft += (((self.jsneCalButton.getStyle('margin-left',{styleToInt:true}) != 0) ? (self.jsneCalButton.getStyle('margin-left',{styleToInt:true}))
                                            : ((self.jsneCalButton.getStyle('padding-left',{styleToInt:true}) != 0) ? (self.jsneCalButton.getStyle('padding-left',{styleToInt:true})) : (0))) * 2) + 2;
                                        }
					self.jsneCalendar.setLpos(calLeft - (self.jsneCalendar.width() - self.jsneCalButton.width()) - 1);
                                }
				if((calTop + self.jsneCalendar.height()) > winH) {
                                        if(jsnutsGlobals.curBrowser == 'IE9' || jsnutsGlobals.curBrowser == 'IE10' || jsnutsGlobals.curBrowser == 'IE11') calTop -= 2;
					self.jsneCalendar.setTpos(calTop - self.jsneCalendar.height() - self.jsneCalButton.height());
                                }

				self.jsneCalendar.switchVisibility();
			};

			this.cal_button.addEvent('click',function(e) {
				clickDblClickEvent(e);
			});

			if(
				jsnutsGlobals.curBrowser == 'IE6' ||
				jsnutsGlobals.curBrowser == 'IE7' ||
				jsnutsGlobals.curBrowser == 'IE8') {
					this.cal_button.addEvent('dblclick',function(e) {
						clickDblClickEvent(e);
					});
	
			}
		}
	};

	this.setDate = function(year,month,day) {
		this.setVal(this.utils.padLeft(day,2) + '/' + this.utils.padLeft((month + 1),2) + '/' + year);
	};

	this.calendarPrevious = function() {
		this.jsneCalendarMonthyear.setHtml('');
		this.jsneCalendarDaysofweek.setHtml('');
		for(var a = 0;a < this.adays.length;a++)
			this.adays[a].removeEvent('click').remove();
		this.adays = [];

		if(--this.curMonth < 0) { this.curMonth = 11; --this.curYear; }
		drawCalendar(this.curMonth,this.curYear,this.id_dom_calendar_monthyear,this.id_dom_calendar_daysofweek,this.id_dom_calendar_days);

		this.adays = this.jsneCalendarDays.findByIdTag('a');
		this.forEach(this.adays,function(aobj,index) {
			aobj.addEvent('click',function() {
				self.setStyle('color','black');
				self.setDate(self.curYear,self.curMonth,aobj.getHtml());
			});
		});

		if(this.jsneCalendar.getTpos() < this.jsneCalButton.getTpos())
			this.jsneCalendar.setTpos(this.jsneCalButton.getTpos() - this.jsneCalendar.height());
	};

	this.calendarNext = function() {
		this.jsneCalendarMonthyear.setHtml('');
		this.jsneCalendarDaysofweek.setHtml('');
		for(var a = 0;a < this.adays.length;a++)
			this.adays[a].removeEvent('click').remove();
		this.adays = [];

		if(++this.curMonth > 11) { this.curMonth = 0; ++this.curYear; }
		drawCalendar(this.curMonth,this.curYear,this.id_dom_calendar_monthyear,this.id_dom_calendar_daysofweek,this.id_dom_calendar_days);

		this.adays = this.jsneCalendarDays.findByIdTag('a');
		this.forEach(this.adays,function(aobj,index) {
			aobj.addEvent('click',function() {
				self.setStyle('color','black');
				self.setDate(self.curYear,self.curMonth,aobj.getHtml());
			});
		});

		if(this.jsneCalendar.getTpos() < this.jsneCalButton.getTpos())
			this.jsneCalendar.setTpos(this.jsneCalButton.getTpos() - this.jsneCalendar.height());
	};

	var ftagInitUI = (!jsnutsGlobals.stdHTML5) ? ('jsnutsInputtextInitUI') : ('jsnutsInputtextHtml5InitUI');
	this.polymorph(ftagInitUI,this.initUI);
	this.initUI = function() {
		this.polymorph(ftagInitUI).fn.apply(this);
		drawCalendar(this.curMonth,this.curYear,this.id_dom_calendar_monthyear,this.id_dom_calendar_daysofweek,this.id_dom_calendar_days);
		var inputtextH = this.height() + (((this.getStyle('margin-left',{styleToInt:true}) > 0) ?
			(this.getStyle('margin-left',{styleToInt:true})) : (this.getStyle('padding-left',{styleToInt:true}))) * 2) +
			((jsnutsGlobals.curBrowser.indexOf('IE') >= 0) ? (0) : (2));
		this.jsneCalButton.width(inputtextH + ((jsnutsGlobals.curBrowser.indexOf('IE') >= 0) ? (2) : (0)));
		this.jsneCalButton.height(inputtextH);
	};

	var ftagInitEvents = (!jsnutsGlobals.stdHTML5) ? ('jsnutsInputtextInitEvents') : ('jsnutsInputtextHtml5InitEvents');
	this.polymorph(ftagInitEvents,this.initEvents);
	this.initEvents = function() {
		this.polymorph(ftagInitEvents).fn.apply(this);

		this.addEvent('keydown',function(e) {
			var tab_pressed = (e.which == 9 || e.keyCode == 9);
			if(tab_pressed)
				self.jsneCalendar.setStyle('visibility','hidden');
		});

		this.addEvent('blur',function(e) {
			if(self.getVal() != '') formatDate();
		});

		this.jsneCalendarPrevious.addEvent('click',function() {
			self.calendarPrevious();
		});

		this.jsneCalendarNext.addEvent('click',function() {
			self.calendarNext();
		});

		this.adays = this.jsneCalendarDays.findByIdTag('a');
		this.forEach(this.adays,function(aobj,index) {
			aobj.addEvent('click',function() {
				self.setStyle('color','black');
				self.setDate(self.curYear,self.curMonth,aobj.getHtml());
			});
		});

		var mycalendar_elems = self.jsneCalendar.getChilds();
		new jsnutsDocument().addEvent('click',function(e) {
			var evtarget = ((typeof e.target !== 'undefined') ? (e.target) : (e.srcElement));
			var elemId = ((typeof evtarget.id !== 'undefined') ? (evtarget.id) : (''));

			if(self.jsneCalendar.isVisible()) {
				if(elemId != self.getId() && elemId != (self.getId() + '_button') &&
					!(self.utils.mouseXY(e).x >= self.jsneCalendar.getLpos() &&
					self.utils.mouseXY(e).y >= self.jsneCalendar.getTpos() &&
					self.utils.mouseXY(e).x <= (self.jsneCalendar.getLpos() + self.jsneCalendar.width()) &&
					self.utils.mouseXY(e).y <= (self.jsneCalendar.getTpos() + self.jsneCalendar.height()))) {

					self.jsneCalendar.setStyle('visibility','hidden');
				}
			}
		});
	};

}