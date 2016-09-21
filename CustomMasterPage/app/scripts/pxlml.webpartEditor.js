/**
 * Remove webpart UI from DOM and make it draggable
 */

var Pxlml = Pxlml || {};

Pxlml.webpartEditor = (function($)
{
	var bindWPMenu = function() {
		var t = $('#MSOTlPn_Tbl');
		if (t.length > 0) {
			var d = t.detach();

			$('#s4-bodyContainer').prepend('<div id="MSOTlPn_MainTD_Div"></div>');
			d.appendTo('#MSOTlPn_MainTD_Div');
			if ($('.edit-mode-panel').length > 0) {
				//t.css('top', (jQuery('.edit-mode-panel').offset().top  + 70) + 'px');
				//t.css('top', (-100) + 'px');
			}

			d.css('display', 'block');
			$('#MSOTlPn_ToolPaneCaption').dragdrop({ root: '#MSOTlPn_Tbl', SwapHorz: false });
			positionMenu(t);
		}
	}

	/**
	* Position webpart Menu based on screen width
	* This ensures that on load, menu is visible regardless of screen width.
	*/
	var positionMenu = function(uiDOM)
	{
		var workspace = $('#s4-workspace'), leftPos, rightPadding = 20;
		
		if (workspace.length === 0 || uiDOM.length === 0)
		{
			return;
		}

		leftPos = (workspace.width() - uiDOM.outerWidth(true)) < 0 ? 0 : workspace.width() - uiDOM.outerWidth(true);
		
		uiDOM.css("left",(leftPos-rightPadding)+"px");
		uiDOM.css("top",$("HEADER").height()+"px");
	}
	
	return {
        bindWPMenu: bindWPMenu
    };
})(jQuery);





