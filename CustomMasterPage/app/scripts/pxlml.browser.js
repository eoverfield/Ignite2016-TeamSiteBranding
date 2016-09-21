/**
 * Pxlml 'config' object
 * Also an example of namespacing
 * 
 * Before declaring this, declare: var Pxlml = Pxlml || {};
 */

var Pxlml = Pxlml || {};

Pxlml.browser = (function($) {

	/**
	 * Adds last-child class to elements for pre IE 9 browsers
	 * If the DOM changes after document ready, this will break.
	 */
    var addLastChild = function()
	{
		if (/msie [1-8]{1}[^0-9]/.test(navigator.userAgent.toLowerCase())) {
			$('*:last-child').addClass('last-child');
		}
    };
    
    /*
    * Windows Phone 8 doesn't properly handle viewport meta
    * Must be called in the head
    */
    var windows8Viewport = function()
    {
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement("style");
            msViewportStyle.appendChild(
                    document.createTextNode(
                            "@-ms-viewport{width:auto!important}"
                            )
                    );
            document.getElementsByTagName("head")[0].
                    appendChild(msViewportStyle);
        }
    };
 
    var adjustFooter = function()
    {
        var $dialog = $('.ms-dialog');
        var $bodyContainer = $("#s4-bodyContainer");
        var $workSpace = $("#s4-workspace");
        var $contentPlaceHolderMain = $(".main-content");
        var difference = null;
        var minHeight = null;
        var padding = 0;

        if($dialog.length > 0) // this is a dialog window, so don't do anything
        {
            return;
        }

        var ribbonHeight = $("#ms-designer-ribbon").outerHeight();
        var workSpaceHeight = $workSpace.outerHeight();
        var bodyContainerHeight = $bodyContainer.outerHeight();
        var documentHeight = $(window).outerHeight();

        if(documentHeight > (workSpaceHeight + ribbonHeight))
        {
            workSpaceHeight = documentHeight - ribbonHeight;
            $workSpace.css("height", workSpaceHeight);
        }

        $contentPlaceHolderMain.css("min-height",""); // reset height before resize

        if(workSpaceHeight > bodyContainerHeight)
        {
            difference = workSpaceHeight - bodyContainerHeight;
            minHeight = $contentPlaceHolderMain.outerHeight() + difference + padding;
            $contentPlaceHolderMain.css("min-height",minHeight);
            $contentPlaceHolderMain.find(".container").css("min-height",minHeight);
        }
    };

    return {
		addLastChild: addLastChild,
        windows8Viewport: windows8Viewport,
        adjustFooter: adjustFooter
    };
})(jQuery);