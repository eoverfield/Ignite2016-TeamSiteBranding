/**
 * Pxlml 'paths' object
 * 
 */

var Pxlml = Pxlml || {};

Pxlml.webpart = (function($) {
	
	/**
	 * Get a list of DOMs containing webparts
	 * 
	 * @param {jQuery DOM} $parentDom - if $parentDom isn't empty, we look for
	 *	a section of the page instead of the entire s4-workspace
	 * @param {type} isJSON if isJSON is true, the function returns a list in JSON,
	 *  containing id/title pairs
	 * @returns {unresolved}
	 */
    var getList = function($parentDom, isJSON)
	{
		var $list, json = [];
		
		if($parentDom)
		{
			$list = $parentDom.find('.ms-webpartzone-cell');
		}
		else {
			$list = $("s4-workspace").find('.ms-webpartzone-cell');
		}
		
		if(isJSON === undefined || isJSON === false)
		{
			return $list;
		}
		else
		{
			$list.each(function(index) 
			{
				json[index] = {
					id: Pxlml.webparts.getID($(this)),
					title: Pxlml.webparts.getTitle($(this))
				};
			});
			
			return json;
		}
	};
	
	/**
	 * Given a $DOM containing a webpart, returns the 'webpartid'
	 * 
	 * @param {type} $webpartDOM
	 * @returns {@exp;$webpartDOM@pro;find@call;@call;attr|@exp;@exp;$webpartDOM@pro;find@call;@call;attr}
	 */
	var getID = function($webpartDOM)
	{
		return $webpartDOM.find("DIV[webpartid]").attr("webpartid");
	}
	
	/**
	 * Once we clone a webpart, we remove IDs from it - if there are multiple
	 * clones on a page, it will prevent new content from being saved.
	 * 
	 * @param {type} $webpartDOM
	 * @returns {undefined}
	 */
	var deactivateClone = function($webpartDOM)
	{
		$webpartDOM.find("DIV[webpartid]").attr("webpartid", '');
		$webpartDOM.find("[id]").attr("id",'');
	}
	
	/**
	 * Returns webpart title
	 * 
	 * @param {type} $webpartDOM
	 * @returns {@exp;$webpartDOM@pro;find@call;@call;text|@exp;@exp;$webpartDOM@pro;find@call;@call;text}
	 */
	var getTitle = function($webpartDOM)
	{
		return $webpartDOM.find('.ms-webpart-titleText').text()
	}
	
	    /**
     * Given a unique webpart ID, return the div ID we can use to manipulate
     * the webpart DOM
     * 
     * @param {type} webpartId
     * @returns {String}
     */
    var getWebpartZoneCellID = function(webpartId) // TODO: This is not named correctly.
    {
		var id = $("div[webpartid='" + webpartId + "']").attr("id");
		
		if(id === undefined) {
			return false;
		}
		else {
			return "#MSOZoneCell_" + id;
		}
    };

    return {
        getList: getList,
		getID: getID,
		getTitle: getTitle,
		deactivateClone:deactivateClone,
		getWebpartZoneCellID:getWebpartZoneCellID
    };
})(jQuery);