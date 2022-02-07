var jsnutsGlobals = {
	curBrowser : '',
        browserMobile : false,
	stdHTML5 : false,
	nwindow : null,
	ndocument : null,
	createWindow : function() {
		this.nwindow = new jsnutsWindow();
	},
	createDocument : function() {
		this.ndocument = new jsnutsDocument();
	}
};
