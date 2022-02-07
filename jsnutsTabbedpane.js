function jsnutsTabbedpane(
	id_dom_tabs,
	id_dom_border_tab_top,
	id_dom_container_tabs,
	id_dom_container) {

	this.id_dom_tabs = id_dom_tabs;
	this.id_dom_border_tab_top = id_dom_border_tab_top;
	this.id_dom_container_tabs = id_dom_container_tabs;
	this.id_dom_container = id_dom_container;

	this.jsneTabs = new jsnutsElement();
	this.jsneBordertabtop = new jsnutsElement();
	this.jsneTabsContainer = new jsnutsElement();
	this.jsneTabsA = [];
	this.jsneNofocusBkgnd = [];
	this.jsneFocusBkgnd = [];
	this.jsne = new jsnutsElement();
	this.a_id_active = 'a_tab1';
	this.vml_on = false;
	this.radii = 0;
	this.blur = 0;
	this.vmlObj = null;

	this.utils = new jsnutsUtils();

	var self = this;

	(function init() {
		self.jsneTabs.findById(id_dom_tabs);
		self.jsneBordertabtop.findById(id_dom_border_tab_top);
		self.jsneTabsContainer.findById(id_dom_container_tabs);
		self.jsneTabs.detachOff();
		self.jsneBordertabtop.detachOff();
		self.jsneTabsContainer.detachOff();
		self.jsne.detachOff();
	}());

	function completeBorder() {
		var last_tab = null;
		self.jsne.findById(self.id_dom_tabs);
		self.jsne.forEach(self.jsne.findByIdTag('li'),function(liobj,index) {
			liobj.detachOff();
			if(liobj.getClassName() != 'li_tab_sep') last_tab = liobj;
		});
		var container_right = self.jsneTabsContainer.getLpos() + self.jsne.findById(self.id_dom_container).width();
		var last_tab_right = last_tab.getLpos() + last_tab.width();
		var border_tab_top_width = container_right - last_tab_right;
		self.jsneBordertabtop.width(border_tab_top_width - 2);
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

	this.hideTabs = function() {
		this.jsne.findById(this.id_dom_container_tabs);
		this.jsne.forEach(this.jsne.findByIdTag('div'),function(divobj,index) {
			divobj.detachOff();
			divobj.setStyle('display','none');
		});
	};

	this.resetTabLabels = function() {
		this.jsne.findById(this.id_dom_tabs);
		this.jsne.forEach(this.jsne.findByIdTag('li'),function(liobj,index1) {
			liobj.detachOff();
			liobj.forEach(liobj.findByTagel('a'),function(aobj,index2) {
				aobj.detachOff();
				var a_tab_id_dom = aobj.getId();
				if(!self.vml_on) {
					aobj.setStyle('background-color','#dedede');
				}else {
					var a_tab_idx = parseInt(a_tab_id_dom.substr(5)) - 1;
					self.jsneNofocusBkgnd[a_tab_idx].setStyle('visibility','visible');
					self.jsneFocusBkgnd[a_tab_idx].setStyle('visibility','hidden');
				}
			});
		});
	};

	this.initUI = function() {
		this.jsne.findById(this.id_dom_tabs);
		var a_cnt = 0;
		this.jsne.forEach(this.jsne.findByIdTag('li'),function(liobj,index1) {
			liobj.detachOff();
			liobj.forEach(liobj.findByTagel('a'),function(aobj,index2) {
				aobj.detachOff();
				var a_tabW = aobj.width() + 2;
				var a_tabH = aobj.height();
				var a_tab_id_dom = aobj.getId();

				// memorizzo le tabs
				var jsneTab = new jsnutsElement().detachOff();
				var tab_id_dom = a_tab_id_dom.substr(2);
				self.jsneTabsA.push(jsneTab.findById(tab_id_dom));

				if(self.vml_on) {
					var a_tab_rborders_path = self.vmlObj.getBorderSegmentsArc(a_tabW,a_tabH,2,self.radii);
					var a_tab_bkgnd_path = self.vmlObj.getBoxPathArcClosed(a_tabW,a_tabH,null,2,self.radii);
					self.vmlObj.createTabNoFocus(a_tab_id_dom,a_tabW,a_tabH,a_tab_rborders_path);
					self.vmlObj.createTabNoFocusbkgnd(a_tab_id_dom,a_tabW,a_tabH,a_tab_bkgnd_path);
					self.vmlObj.createTabFocusbkgnd(a_tab_id_dom,a_tabW,a_tabH,a_tab_bkgnd_path);
	
					var a_tab_left = aobj.getLpos();
					var a_tab_top = aobj.getTpos();
					self.jsne.findById(a_tab_id_dom + '_nofocus').setLTpos((a_tab_left - 1),a_tab_top);
					self.jsne.findById(a_tab_id_dom + '_nofocus').setStyle('visibility','visible');
					self.jsne.findById(a_tab_id_dom + '_nofocus_bkgnd').setLTpos((a_tab_left - 1),a_tab_top);
					self.jsne.findById(a_tab_id_dom + '_focus_bkgnd').setLTpos((a_tab_left - 1),a_tab_top);
	
					// memorizza gli oggetti vml
					var jsneNofocusBkgndObj = new jsnutsElement().detachOff();
					var jsneFocusBkgndObj = new jsnutsElement().detachOff();
					self.jsneNofocusBkgnd.push(jsneNofocusBkgndObj.findById(a_tab_id_dom + '_nofocus_bkgnd'));
					self.jsneFocusBkgnd.push(jsneFocusBkgndObj.findById(a_tab_id_dom + '_focus_bkgnd'));
	
					if(a_cnt == 0) {
						self.jsne.findById(a_tab_id_dom + '_nofocus_bkgnd').setStyle('visibility','hidden');
						self.jsne.findById(a_tab_id_dom + '_focus_bkgnd').setStyle('visibility','visible');
					}
	
					++a_cnt;
				}
			});
		});

		completeBorder();
	};

	this.initEvents = function() {
		this.jsne.findById(this.id_dom_tabs);
		this.jsne.forEach(this.jsne.findByIdTag('li'),function(liobj,index1) {
			liobj.detachOff();
			liobj.forEach(liobj.findByTagel('a'),function(aobj,index2) {
				aobj.detachOff();
				var a_tab_id_dom = aobj.getId();
				aobj.addEvent('mousemove',function(e) {
					if(!self.vml_on) {
						aobj.setStyle('background-color','#efefef');
					}else {
						var a_tab_idx = parseInt(a_tab_id_dom.substr(5)) - 1;
						self.jsneNofocusBkgnd[a_tab_idx].setStyle('visibility','hidden');
						self.jsneFocusBkgnd[a_tab_idx].setStyle('visibility','visible');
					}
				});
				aobj.addEvent('mouseout',function(e) {
					if(a_tab_id_dom != self.a_id_active) {
						if(!self.vml_on) {
							aobj.setStyle('background-color','#dedede');
						}else {
							var a_tab_idx = parseInt(a_tab_id_dom.substr(5)) - 1;
							self.jsneNofocusBkgnd[a_tab_idx].setStyle('visibility','visible');
							self.jsneFocusBkgnd[a_tab_idx].setStyle('visibility','hidden');
						}
					}
				});
				aobj.addEvent('click',function(e) {
					self.resetTabLabels();
					if(!self.vml_on) {
						aobj.setStyle('background-color','#efefef');
					}else {
						var a_tab_idx = parseInt(a_tab_id_dom.substr(5)) - 1;
						self.jsneNofocusBkgnd[a_tab_idx].setStyle('visibility','hidden');
						self.jsneFocusBkgnd[a_tab_idx].setStyle('visibility','visible');
					}
					self.hideTabs();
					var a_tab_idx = parseInt(a_tab_id_dom.substr(5)) - 1;
					self.jsneTabsA[a_tab_idx].setStyle('display','');
					self.a_id_active = a_tab_id_dom;
				});
			});
		});
	};
}