// prevent console.log() from breaking IE
Pxlml.console.init();

jQuery(document).ready(function($) {
	//set up mobile ui including mobile nav
	Pxlml.mobileUI.init();

	//set up wiki layout help classes
	Pxlml.wiki.init(); 
});
