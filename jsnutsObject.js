function jsnutsObject() {

	this.pmorphArray = [];

	this.polymorph = function(idstr,fn) {
		if(typeof fn !== 'undefined') {

			/*var argss = '';
			if(arguments.length > 1) {
				for(var a = 1;a < arguments.length;a++)
					argss += arguments[a] + ',';
				argss = argss.substring(0,argss.length - 1);
			}*/

			//alert('push');

			//this.pmorphArray.push({fn:fn,args:argss});
			this.pmorphArray.push({idstr:idstr,fn:fn});
		}
		else {
			if(this.pmorphArray.length > 0) {
				for(var i = 0;i < this.pmorphArray.length;i++) {
					if(this.pmorphArray[i].idstr == idstr)
						return this.pmorphArray[i];
				}
				return null;
				//return this.pmorphArray.pop();
			}else
				return null;
		}
	};

	this.forEach = function(arr, fn, scope) {
		for(var i = 0, len = arr.length; i < len; i++) {
		    fn.call(scope, arr[i], i, arr);
		}
	};

	this.trim = function(str) {
		return str.replace(/^\s+|\s+$/g,'');
	};

}