/**
 * Usage:
 * Run IE8Resize() on load
 * Attach function call to window resize event
 * 
 * In Sharepoint:
 * ExecuteOrDelayUntilScriptLoaded(function () { SP.UI.Workspace.add_resized(cvie8ResizeJS); }, "init.js");
 */

/**
 * resize based on window width
 * 
 * Issue: Breakpoints should not be hard coded.
 * Issue: Rewrite code to loop over an array instead of a chain of if/else statements
 **/


var Pxlml = Pxlml || {};

Pxlml.responsive = (function($) {
	
	var isIpad = function()
	{
		return navigator.userAgent.match(/iPad/i) !== null;
	};
	
	var tagIpad = function()
	{
		if(Pxlml.responsive.isIpad())
		{
			var html = document.getElementsByTagName("html")[0];
			addClass(html, 'pm-ipad');
		}
	};
	
	var init = function()
	{
		IE8Resize();
		
		$(window).resize(function()
		{
			IE8Resize();
		});	
	};

	var IE8Resize = function()
	{
		var html = document.getElementsByTagName("html")[0];
		addClass(html, 'ie8');

		workspaceWidth = getWindowWidth();

		var widths = [480, 768, 992, 1200];

		for (i = 0; i < widths.length; i++)
		{
			if (workspaceWidth >= widths[i])
			{
				addClass(html, 'ie8-' + widths[i]);
			}
			else {
				removeClass(html, 'ie8-' + widths[i]);
			}
		}
	};

	/**
	 * check if class exists in element
	 * 
	 * @param {type} dom
	 * @param {type} className
	 * @returns {Boolean}
	 */
	var classExists = function(dom, className)
	{
		var hasClassName = new RegExp('(\\s|^)' + className + '(\\s|$)');

		if (hasClassName.test(dom.className) === true)
		{
			return true;
		}
		else {
			return false;
		}
	};

	/**
	 * remove class from DOM
	 * @param {type} dom
	 * @param {type} className
	 * @returns {undefined}
	 */
	var removeClass = function(dom, className)
	{
		var pattern = new RegExp('(\\s|^)' + className + '(\\s|$)');
		dom.className = dom.className.replace(pattern, ' ');
	};

	/**
	 * add class to a DOM
	 * @param {type} dom
	 * @param {type} className
	 * @returns {unresolved}
	 */
	var addClass = function(dom, className)
	{
		if (classExists(dom, className))
		{
			return;
		}
		else {
			dom.className = dom.className + " " + className;
		}
	};

	/**
	 * Get DOM width
	 * @param {type} div
	 * @returns {unresolved}
	 */
	var getWidth = function(div)
	{
		return parseInt(div.style.width); // removes the "px" at the end
	};

	/**
	 * Get window width
	 **/
	var getWindowWidth = function()
	{
		var w = 0;
		//IE
		if (!window.innerWidth) {
			if (!(document.documentElement.clientWidth === 0)) {
				//strict mode
				w = document.documentElement.clientWidth;
			} else {
				//quirks mode
				w = document.body.clientWidth;
			}
		} else {
			//w3c
			w = window.innerWidth;
		}
		return w;
	};
    
    var breakpoint_current = null;
	var breakpoint_last = null;
	var _this = this;
	
	var getBreakPoint = function() {
		return breakpoint_current;
	};
	
	var getBreakPointLast = function() {
		return breakpoint_last;
	};
	
    /**
     * Detect if breakpoint changed or not
     * @returns {Boolean}
     */
	var breakPointChanged = function(options) 
	{
		var breakpoints = (options && options.breakpoints) ? options.breakpoints : [0, 320, 768, 992, 1200, 10000];
		var currentWidth = $(window).width();
		var currentBreakpoint;

		for(var i in breakpoints)
		{
			if(currentWidth < breakpoints[i])
			{
				currentBreakpoint = breakpoints[i-1];
				break;
			}
		}
        
		if(breakpoint_current === null)
		{
			// initialize breakpoint
			breakpoint_current = currentBreakpoint;
			return true;
		}

		if(breakpoint_current !== currentBreakpoint)
		{
			breakpoint_last = breakpoint_current;
			breakpoint_current = currentBreakpoint;
			return true;
		}
		else {
			return false;
		}
	};

	return {
		init: init,
		IE8Resize: IE8Resize,
        breakPointChanged: breakPointChanged,
		getBreakPoint: getBreakPoint,
		getBreakPointLast: getBreakPointLast,
		tagIpad: tagIpad,
		isIpad: isIpad
	};
})(jQuery);