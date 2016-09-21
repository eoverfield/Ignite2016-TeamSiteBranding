var Pxlml = Pxlml || {};


Pxlml.console = (function($) {

	/* 
	 * Make sure console.log works with IE
	 */
	var init = function() {
    	if (!window.console) {window.console = {};}
		var console = window.console; //moar opera errors around this - console wasn't defined below, yes it wasn't resolving to window.console for some reason.
    	var noop = function noop() {};
    	var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml','error', 
	        'exception', 'group', 'groupCollapsed','groupEnd', 'info', 'log', 
	        'markTimeline', 'profile','profileEnd', 'markTimeline', 'table', 'time',
	        'timeEnd', 'timeStamp', 'trace', 'warn'];
    	var length = methods.length;
	    while (length--) {
	        /*only add method if it's not already defined.*/
	        if (!console[methods[length]]) 
	        {
	            console[methods[length]] = noop;
	        }
	    }
	};

	return {
        init: init
    };
})(jQuery);