function jsnutsVML() {

	jsnutsObject.call(this);

	this.getBoxPath = function( wbox, hbox, shrink, mult, radii ) {
		var mult = mult || 1;
		
		var r, str,
			w = wbox * mult,
			h = hbox * mult,
			floor = Math.floor, ceil = Math.ceil,
			shrinkT = shrink ? shrink.t * mult : 0,
			shrinkR = shrink ? shrink.r * mult : 0,
			shrinkB = shrink ? shrink.b * mult : 0,
			shrinkL = shrink ? shrink.l * mult : 0,
			tlX, tlY, trX, trY, brX, brY, blX, blY;
		
		if( radii ) {
			r = this.getRadiiPixels( wbox, hbox, radii );
			
			tlX = r.x['tl'] * mult;
			tlY = r.y['tl'] * mult;
			trX = r.x['tr'] * mult;
			trY = r.y['tr'] * mult;
			brX = r.x['br'] * mult;
			brY = r.y['br'] * mult;
			blX = r.x['bl'] * mult;
			blY = r.y['bl'] * mult;
			
			str = 'm' + floor( shrinkL ) + ',' + floor( tlY ) +
			'qy' + floor( tlX ) + ',' + floor( shrinkT ) +
			'l' + ceil( w - trX ) + ',' + floor( shrinkT ) +
			'qx' + ceil( w - shrinkR ) + ',' + floor( trY ) +
			'l' + ceil( w - shrinkR ) + ',' + ceil( h - brY ) +
			'qy' + ceil( w - brX ) + ',' + ceil( h - shrinkB ) +
			'l' + floor( blX ) + ',' + ceil( h - shrinkB ) +
			'qx' + floor( shrinkL ) + ',' + ceil( h - blY ) + ' x e';
		} else {
		// simplified path for non-rounded box
		str = 'm' + floor( shrinkL ) + ',' + floor( shrinkT ) +
			'l' + ceil( w - shrinkR ) + ',' + floor( shrinkT ) +
			'l' + ceil( w - shrinkR ) + ',' + ceil( h - shrinkB ) +
			'l' + floor( shrinkL ) + ',' + ceil( h - shrinkB ) +
			'xe';
		}

		return str;

	};

	this.getBoxPathArc = function( wbox, hbox, shrink, mult, radii ) {
		var mult = mult || 1;
		
		var r, str,
			w = wbox * mult,
			h = hbox * mult,
			floor = Math.floor, ceil = Math.ceil,
			shrinkT = shrink ? shrink.t * mult : 0,
			shrinkR = shrink ? shrink.r * mult : 0,
			shrinkB = shrink ? shrink.b * mult : 0,
			shrinkL = shrink ? shrink.l * mult : 0,
			tlX, tlY, trX, trY, brX, brY, blX, blY;
		
		if( radii ) {
			r = this.getRadiiPixels( wbox, hbox, radii );
			
			tlX = r.x['tl'] * mult;
			tlY = r.y['tl'] * mult;
			trX = r.x['tr'] * mult;
			trY = r.y['tr'] * mult;
			brX = r.x['br'] * mult;
			brY = r.y['br'] * mult;
			blX = r.x['bl'] * mult;
			blY = r.y['bl'] * mult;
			
			str = 'm' + floor( shrinkL ) + ',' + floor( tlY ) +
			'qy' + floor( tlX ) + ',' + floor( shrinkT ) +
			'l' + ceil( w - trX ) + ',' + floor( shrinkT ) +
			'qx' + ceil( w - shrinkR ) + ',' + floor( trY ) +
			'l' + ceil( w - shrinkR ) + ',' + ceil( h - shrinkB ) +
			'm' + floor( shrinkL ) + ',' + ceil( h - shrinkB ) +
			'l' + floor( shrinkL ) + ',' + floor( tlY );
		} else {
		// simplified path for non-rounded box
		str = 'm' + floor( shrinkL ) + ',' + floor( shrinkT ) +
			'l' + ceil( w - shrinkR ) + ',' + floor( shrinkT ) +
			'l' + ceil( w - shrinkR ) + ',' + ceil( h - shrinkB ) +
			'l' + floor( shrinkL ) + ',' + ceil( h - shrinkB ) +
			'xe';
		}

		return str;

	};

	this.getBoxPathArcClosed = function( wbox, hbox, shrink, mult, radii ) {
		var mult = mult || 1;
		
		var r, str,
			w = wbox * mult,
			h = hbox * mult,
			floor = Math.floor, ceil = Math.ceil,
			shrinkT = shrink ? shrink.t * mult : 0,
			shrinkR = shrink ? shrink.r * mult : 0,
			shrinkB = shrink ? shrink.b * mult : 0,
			shrinkL = shrink ? shrink.l * mult : 0,
			tlX, tlY, trX, trY, brX, brY, blX, blY;
		
		if( radii ) {
			r = this.getRadiiPixels( wbox, hbox, radii );
			
			tlX = r.x['tl'] * mult;
			tlY = r.y['tl'] * mult;
			trX = r.x['tr'] * mult;
			trY = r.y['tr'] * mult;
			brX = r.x['br'] * mult;
			brY = r.y['br'] * mult;
			blX = r.x['bl'] * mult;
			blY = r.y['bl'] * mult;
			
			str = 'm' + floor( shrinkL ) + ',' + floor( tlY ) +
			'qy' + floor( tlX ) + ',' + floor( shrinkT ) +
			'l' + ceil( w - trX ) + ',' + floor( shrinkT ) +
			'qx' + ceil( w - shrinkR ) + ',' + floor( trY ) +
			'l' + ceil( w - shrinkR ) + ',' + ceil( h - shrinkB ) +
			'l' + floor( shrinkL ) + ',' + ceil( h - shrinkB ) +
			'l' + floor( shrinkL ) + ',' + floor( tlY );
		} else {
		// simplified path for non-rounded box
		str = 'm' + floor( shrinkL ) + ',' + floor( shrinkT ) +
			'l' + ceil( w - shrinkR ) + ',' + floor( shrinkT ) +
			'l' + ceil( w - shrinkR ) + ',' + ceil( h - shrinkB ) +
			'l' + floor( shrinkL ) + ',' + ceil( h - shrinkB ) +
			'xe';
		}

		return str;

	};

	this.getRadiiPixels = function( wbox, hbox, radii ) {
		var w = wbox,
		    h = hbox,
		    tlX, tlY, trX, trY, brX, brY, blX, blY, f;
		
		// qui ci vorrebbe un fattore moltiplicativo, adesso usa tutti i bordi
		tlX = radii;
		tlY = radii;
		trX = radii;
		trY = radii;
		brX = radii;
		brY = radii;
		blX = radii;
		blY = radii;
		
		// If any corner ellipses overlap, reduce them all by the appropriate factor. This formula
		// is taken straight from the CSS3 Backgrounds and Borders spec.
		f = Math.min(
		    w / ( tlX + trX ),
		    h / ( trY + brY ),
		    w / ( blX + brX ),
		    h / ( tlY + blY )
		);
		if( f < 1 ) {
		    tlX *= f;
		    tlY *= f;
		    trX *= f;
		    trY *= f;
		    brX *= f;
		    brY *= f;
		    blX *= f;
		    blY *= f;
		}
		
		return {
		    x: {
		        'tl': tlX,
		        'tr': trX,
		        'br': brX,
		        'bl': blX
		    },
		    y: {
		        'tl': tlY,
		        'tr': trY,
		        'br': brY,
		        'bl': blY
		    }
		}

	};

	this.getBorderSegments = function(w,h,mult,radii) {
	        var path, wT, wR;
		wT = 1; //thickness
		wR = wT / 2; //shrink
		path = this.getBoxPath( w,h,{ t: wR, r: wR, b: wR, l: wR }, 2, radii );

		return path;
	};

	this.getBorderSegmentsArc = function(w,h,mult,radii) {
	        var path, wT, wR;
		wT = 1; //thickness
		wR = wT / 2; //shrink
		path = this.getBoxPathArc( w,h,{ t: wR, r: wR, b: wR, l: wR }, 2, radii );

		return path;
	};

	this.getFillFocus = function(wbox,hbox,blurdist) {

		var w = wbox, h = hbox;
		var spread = 0, blur = blurdist; // box shadow

                var totalW = ( spread + blur ) * 2 + w;
                var totalH = ( spread + blur ) * 2 + h;
                var focusX = totalW ? blur * 2 / totalW : 0;
                var focusY = totalH ? blur * 2 / totalH : 0;

                var focusposition = focusX + ',' + focusY;
                var focussize = ( 1 - focusX * 2 ) + ',' + ( 1 - focusY * 2 );

		return { focusposition:focusposition, focussize:focussize };

	};

	this.createInputtextNoFocus = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="' + elem_id_dom + '_nofocus" style="z-index:2; position:absolute; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px;" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" filled = "false" stroked = "true" strokecolor = "#999" strokeweight = ".75pt" path = "' + path + '"></v:shape>');
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	// TEMPDEV
	/*this.createInputtextFocusgradient = function(elem_id_dom,w,h,path,focus) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="'+ elem_id_dom + '_focus_gradient" coordsize="' + (w * 2) + ',' + (h * 2) + '" coordorigin="1,1" width="' + w + '" height="' + h + '" fillcolor="#9ECAED" stroked="false" filled="true" path="' + path + '" style="visibility:hidden; z-index:-1; left:0px; top:0px; position:absolute; width:' + w + 'px; height:' + h + 'px;"></v:shape>');
		var fill = vmlCreatorDoc.createElement('<v:fill type="gradienttitle" color2="#9ECAED" opacity="0" focusposition="' + focus.focusposition + '" focussize="' + focus.focussize + '" />');
		shape.appendChild(fill);
		document.getElementsByTagName('body')[0].appendChild(shape);
	}*/

	this.createInputtextFocusgradient = function(elem_id_dom,w,h,path,focus,color) {
		var vmlCreatorDoc = document.createDocumentFragment();
		var gradientColor = (typeof color !== 'undefined') ? (color) : ('#9ECAED');
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' ); 
		var shape = vmlCreatorDoc.createElement('<v:shape id="'+ elem_id_dom + '_focus_gradient" coordsize="' + (w * 2) + ',' + (h * 2) + '" coordorigin="1,1" width="' + w + '" height="' + h + '" fillcolor="#9ECAED" stroked="false" filled="true" path="' + path + '" style="visibility:hidden; z-index:-1; left:0px; top:0px; position:absolute; width:' + w + 'px; height:' + h + 'px;"></v:shape>');
		var fill = vmlCreatorDoc.createElement('<v:fill type="gradienttitle" color2="' + gradientColor + '" opacity="0" focusposition="' + focus.focusposition + '" focussize="' + focus.focussize + '" />');
		shape.appendChild(fill);
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	this.createInputtextFocusbkgnd = function(elem_id_dom,w,h,path,fillcolor) {
		var vmlCreatorDoc = document.createDocumentFragment();
		var fcolor = (typeof fillcolor !== 'undefined') ? (fillcolor) : ('white');
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="'+ elem_id_dom + '_focus_bkgnd" style="z-index:1; position:absolute; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" fillcolor = "' + fcolor + '" stroked = "false" path = "' + path + '"></v:shape>');
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	this.createInputtextFocusborder = function(elem_id_dom,w,h,path,color) {
		var vmlCreatorDoc = document.createDocumentFragment();
		var borderColor = (typeof color !== 'undefined') ? (color) : ('#9ECAED');
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="'+ elem_id_dom + '_focus_border" style="z-index:1; position:absolute; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" filled = "false" stroked = "true" strokecolor = "' + borderColor + '" strokeweight = ".75pt" path = "' + path + '"></v:shape>');
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	this.createDropbtnNoFocus = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="' + elem_id_dom + '_nofocus" style="cursor:pointer; z-index:1; position:absolute; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px;" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" filled = "false" stroked = "true" strokecolor = "#999" strokeweight = ".75pt" path = "' + path + '"></v:shape>');
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	this.createDropbtnNoFocusbkgnd = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="'+ elem_id_dom + '_nofocus_bkgnd" style="z-index:-1; position:absolute; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" fillcolor = "#9ECAED" stroked = "false" path = "' + path + '"></v:shape>');
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	this.createDropbtnFocusbkgnd = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="'+ elem_id_dom + '_focus_bkgnd" style="z-index:-1; position:absolute; visibility:hidden; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px;" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" fillcolor = "#1E90FF" stroked = "false" path = "' + path + '"></v:shape>');
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	this.createTabNoFocus = function(elem_id_dom,w,h,path,id) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="' + elem_id_dom + '_nofocus" style="z-index:1; position:absolute; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px;" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" filled = "false" stroked = "true" strokecolor = "#999" strokeweight = ".75pt" path = "' + path + '"></v:shape>');
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	this.createTabNoFocusbkgnd = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="'+ elem_id_dom + '_nofocus_bkgnd" style="z-index:-1; position:absolute; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" fillcolor = "#dedede" stroked = "false" path = "' + path + '"></v:shape>');
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	this.createTabFocusbkgnd = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="'+ elem_id_dom + '_focus_bkgnd" style="z-index:-1; position:absolute; visibility:hidden; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" fillcolor = "#efefef" stroked = "false" path = "' + path + '"></v:shape>');
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	this.createButtonborder = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="' + elem_id_dom + '_border" style="z-index:1; position:absolute; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px;" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" filled = "false" stroked = "true" strokecolor = "#999" strokeweight = ".75pt" path = "' + path + '"></v:shape>');
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	// DEVMOD
	/*this.createButtonNoFocusbkgnd = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="'+ elem_id_dom + '_nofocus_bkgnd" style="z-index:-1; position:absolute; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" fillcolor = "#CCCCCC" stroked = "false" path = "' + path + '"></v:shape>');
		document.getElementsByTagName('body')[0].appendChild(shape);
	}*/

	// DEVMOD
	this.createButtonNoFocusbkgnd = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="'+ elem_id_dom + '_nofocus_bkgnd" style="z-index:-1; position:absolute; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" fillcolor = "#CCCCCC" stroked = "false" path = "' + path + '"></v:shape>');
		var fill = vmlCreatorDoc.createElement('<v:fill type="gradient" />');
		shape.appendChild(fill);
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	// DEVMOD
	/*this.createButtonFocusbkgnd = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="'+ elem_id_dom + '_focus_bkgnd" style="z-index:-1; position:absolute; visibility:hidden; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" fillcolor = "#9ECAED" stroked = "false" path = "' + path + '"></v:shape>');
		document.getElementsByTagName('body')[0].appendChild(shape);
	}*/

	// DEVMOD
	this.createButtonFocusbkgnd = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="'+ elem_id_dom + '_focus_bkgnd" style="z-index:-1; position:absolute; visibility:hidden; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" fillcolor = "#9ECAED" stroked = "false" path = "' + path + '"></v:shape>');
		var fill = vmlCreatorDoc.createElement('<v:fill type="gradient" />');
		shape.appendChild(fill);
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	this.createPopupRoundedBorder = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="' + elem_id_dom + '_border" style="z-index:2; position:absolute; visibility:hidden; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px;" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" filled = "false" stroked = "true" strokecolor = "#999" strokeweight = ".75pt" path = "' + path + '"></v:shape>');
		document.getElementById(elem_id_dom).appendChild(shape);
	};

	this.createPopupRoundedBkgnd = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="' + elem_id_dom + '_bkgnd" style="z-index:1; position:absolute; visibility:hidden; width:' + w + 'px; height:' + h + 'px; top:0px; left:0px;" coordsize = "' + (w * 2) + ',' + (h * 2) + '" coordorigin = "1,1" filled = "true" fillcolor = "white" stroked = "false" path = "' + path + '"></v:shape>');
		document.getElementById(elem_id_dom).appendChild(shape);
	};

	this.createImageRoundedCorners = function(elem_id_dom,w,h,path,imgsrc) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="' + elem_id_dom + '_rcorners" coordsize="' + (w * 2) + ',' + (h * 2) + '" coordorigin="1,1" width="' + w + '" height="' + h + '" path="' + path + '" style="left:5px; top:5px; z-index:-1; position:absolute; width:' + w + 'px; height:' + h + 'px;"></v:shape>');
		var fill = vmlCreatorDoc.createElement('<v:fill type="frame" src="' + imgsrc + '" />');
		shape.appendChild(fill);
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	this.createImageRoundedBorder = function(elem_id_dom,w,h,path) {
		var vmlCreatorDoc = document.createDocumentFragment();
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' );
		var shape = vmlCreatorDoc.createElement('<v:shape id="' + elem_id_dom + '_border" coordsize="' + (w * 2) + ',' + (h * 2) + '" coordorigin="1,1" width="' + w + '" height="' + h + '" path="' + path + '" style="left:5px; top:5px; z-index:-2; position:absolute; width:' + w + 'px; height:' + h + 'px;"></v:shape>');
		var fill = vmlCreatorDoc.createElement('<v:fill type="solid" color="#CCCCCC" opacity="100%" />');
		shape.appendChild(fill);
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

	this.createImageRoundedBorderBlurred = function(elem_id_dom,w,h,path,focus,color) {
		var vmlCreatorDoc = document.createDocumentFragment();
		var gradientColor = (typeof color !== 'undefined') ? (color) : ('#9ECAED');
		vmlCreatorDoc.namespaces.add( 'v', 'urn:schemas-microsoft-com:vml' ); 
		var shape = vmlCreatorDoc.createElement('<v:shape id="'+ elem_id_dom + '_border_blurred" coordsize="' + (w * 2) + ',' + (h * 2) + '" coordorigin="1,1" width="' + w + '" height="' + h + '" fillcolor="#9ECAED" stroked="false" filled="true" path="' + path + '" style="z-index:-2; left:0px; top:0px; position:absolute; width:' + w + 'px; height:' + h + 'px;"></v:shape>');
		var fill = vmlCreatorDoc.createElement('<v:fill type="gradienttitle" color2="' + gradientColor + '" opacity="0" focusposition="' + focus.focusposition + '" focussize="' + focus.focussize + '" />');
		shape.appendChild(fill);
		document.getElementsByTagName('body')[0].appendChild(shape);
	};

}