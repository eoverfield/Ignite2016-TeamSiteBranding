/**
 * Pxlml 'config' object
 * Also an example of namespacing
 * 
 * Before declaring this, declare: var Pxlml = Pxlml || {};
 */

var Pxlml = Pxlml || {};

Pxlml.config = (function($) {
    
    var adjustWidthDelay = 0;

    var getPageType = function() {
        if ($("html").hasClass("pmFullWidth"))
        {
            return "publishing";
        }
        else {
            return "system";
        }
    };
    
    /**
     * Add a class to HTML element depending on whether Sharepoint ribbon
     * exists or not
     * 
     * @returns {undefined}
     */
    var markRibbonExists = function()
    {
        if ($("#ms-designer-ribbon").length === 0)
        {
            $("html").addClass("pm-no-ribbon");
        }
        else {
            $("html").addClass("pm-ribbon-exists");
        }
    };
    
    var markSystemPage = function() {
        if (getPageType() === 'system')
        {
            $("html").addClass("pmSystemPage");
        }
    };

    var markSideNavigation = function() {
        if ($("#sideNavBox").length > 0)
        {
            $("HTML").addClass("pm-sidenav-exists");
        }
    };
	
	var adjustSystemColumn = function(options)
	{
		if ($(options['system']).find(options['aside']).height() <= 1 || isEmpty($("#DeltaPlaceHolderLeftNavBar")))
		{
			//only hide side bar is checkFullScreen not provided, or if .fullscreenmode not already enabled
			if (!("checkFullScreen" in options) || !(options["checkFullScreen"]) || (options["checkFullScreen"] && ($("BODY.ms-fullscreenmode").length < 1)))
				hideSideBar(options);
		}
	};
	
	var hideSideBar = function(options)
	{
		$(options['system']).find(options['aside']).hide();
		$(options['system']).find(options['main']).css("width","100%");
	};
	
	
	
	/**
	 * Determines if an HTML DOM is empty or not
	 * 
	 * @param {type} el
	 * @returns {@exp;$@call;trim}
	 */
	var isEmpty = function(el)
	{
		return !$.trim(el.html());
	};
	
	/**
	 * Remove empty paragraphs from Sharepoint ms-rtestate-fields and mark the parent
	 * 
	 * @param  parentContainer - Jquery DOM object, e.g. $(".className")
	 * @returns returns nothing
	 */
	var markEmptyRtestateField = function(parentContainer)
	{
		if(parentContainer.length === 0)
		{
			return;
		}
		
		if($(".pm-edit-mode").length) // don't modify in edit mode
		{
			return;
		}
		
		var rtestateField = parentContainer.find(".ms-rtestate-field"); // assume there's only one
		var emptyParagraphReplacement = rtestateField.html().replace(/<p>(\u200B)*<\/p>/g,'');
		
		rtestateField.html(emptyParagraphReplacement); // remove empty paragraphs from Bureau page layouts

		if(isEmpty(rtestateField) === true) 
		{
			parentContainer.addClass("pm-empty");
		}
	};
	
	var adjustContainerWidth = function(delay)
	{
		var tableWidth = null;
        
        if(delay === undefined)
        {
            delay = this.adjustWidthDelay;
        }
		
		if($(".pm-system-master").length === 0)
		{
			return; // only do this for system pages
		}
		
		if($(".ms-dialog").length)
		{
			return; // don't bother with dialogs
		}
		
		if($("#DeltaPlaceHolderMain > .ms-webpart-zone").length)
		{
			tableWidth = $(".pm-column-article .ms-webpart-zone").find("TABLE").first().outerWidth(); // regular system page table
		}
		else if($(".TmtContentTable").length)
		{
			tableWidth = $(".pm-column-article .TmtContentTable").width(); // term store resizable table
		}
        else { // ms-webpart-zone is missing on some pages
            tableWidth = $(".pm-column-article #DeltaPlaceHolderMain").find("TABLE").first().outerWidth();
        }
        
		var	columnArticleWidth = $(".pm-column-article").width();
		var columnSidebarWidth = $(".pm-column-sidebar").outerWidth();
		var margin = 15;
        
		if(columnArticleWidth < tableWidth)
		{
			columnArticleWidth = tableWidth + (margin * 2);
            
            setTimeout(function() {
                $(".pm-column-article").width(columnArticleWidth);
                $(".container").width(columnArticleWidth + columnSidebarWidth);
            }, delay);
		}
	};
    
    /**
     * similar to adjustContainerWidth, except it will set some Bootstrap 3 columns
     * to 100% if the table inside a column is wider than the column.
     * 
     * @returns {undefined}
     */
    function adjustContainerWidthPublic(isWrappable)
	{	
        if($(".pm-public-master").length === 0)
		{
			return; // only do this for system pages
		}
        
		if($(".ms-dialog").length)
		{
			return; // don't bother with dialogs
		}
        
        var isWrappable = isWrappable ? isWrappable : false; // default isWrappable to false
        
        var maxRowWidth = 0;
        var maxColWidth = 0;
        var rowWidth = 0;
        var tableWidth = 0;
        
        $(".main-content .row").each(function()
        {
            rowWidth = 0;
            
            $(this).find("[class^='col-']").each(function()
            {
                tableWidth = 0; // reset table width
                maxColWidth = $(this).outerWidth(); // reset colwidth
                
                $(this).find("TABLE").each(function()
                {
                    tableWidth = $(this).outerWidth();
                    if(maxColWidth < tableWidth)
                    {
                        maxColWidth = tableWidth;
                    }
                    //console.log("maxColWidth..." +maxColWidth);
                });
                
                //console.log("returned max col width:" +maxColWidth);
                
                if(isWrappable === true)
                {
                    if($(this).outerWidth() < maxColWidth)
                    {
                        $(this).css("width","100%"); // force things to wrap
                        //console.log("[[expanding this]]");
                    }
                }
                else {
                    $(this).css("width",maxColWidth);
                    rowWidth += maxColWidth;
                }
                
                //console.log("classname:" + $(this).attr("class")+ " width:" +$(this).outerWidth() + " maxColWidth: " + maxColWidth +" rowWidth:"+rowWidth);
                
            });
            if(rowWidth > maxRowWidth)
            {
                maxRowWidth = rowWidth;
                //console.log("max row width:" +maxRowWidth);
            }
        });
        
        //console.log("max row width:"+maxRowWidth);
		
        //var	columnSidebarWidth = $(".pm-column-sidebar").width();
		//var	columnArticleWidth = $(".pm-column-article").width();
		var margin = 15;
		
		if($(".container").outerWidth() < maxRowWidth)
		{
			$(".container").width(maxRowWidth - (margin * 2));
		}
	};
	
	/**
	 * In Sharepoint, detect if the page is in edit Mode, and if so, mark the
	 * HTML element with 'pm-edit-mode' class
	 * 
	 * @returns {undefined}
	 */
	var markEditMode = function()
	{
        var IsEditMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
        // Detect edit mode on system pages
        // g_disableCheckoutInEditMode is only useful on publishing pages
        
		if((typeof g_disableCheckoutInEditMode !== "undefined" && g_disableCheckoutInEditMode === true) || IsEditMode == "1")
		{
			$("HTML").addClass("pm-edit-mode");
		}
		else {
			$("HTML").addClass("pm-display-mode");
		}
	};
    
    var isEditMode = function()
    {
        return  $("HTML").hasClass("pm-edit-mode");
    }

    var isSearchPage = function()
    {
    	return $('#DeltaPlaceHolderMain > div').hasClass('ms-searchCenter-result-main') || ($('div.ms-srch-siteSearchResults').length > 0);
    };

    var markSearchPage = function()
    {
    	if(isSearchPage())
    	{
    		$("HTML").addClass("pm-search-page");
    	}
    }

	/**
	 * Hide first top nav menu item list.
	 * We can usually do this with CSS, but if we are using both structured and
	 * managed navigation, CSS doesn't work.
	 * 
	 * @param {type} options navType = 'structured' | 'managed'
	 * @returns {undefined}
	 */
	var hideFirstNode = function(options)
	{
		var $navigationRoot = $("#DeltaTopNavigation .ms-core-listMenu-horizontalBox .ms-core-listMenu-root");
		
		if(options['navType'] === 'managed')
		{
			if($navigationRoot.find("> li").length > 1 || $navigationRoot.find("li:first-child > UL").length === 0)
			{
				$navigationRoot.find("> li:first-child > a").hide();
			}
		}
		else if(options['navType'] === 'structured')
		{
			if($navigationRoot.find("> li").length === 1 && $navigationRoot.find("> li:first-child > UL").length > 0)
			{
				$navigationRoot.find("> li > a").hide();
			}
		}
	};
    
    /**
     * Remove Sharepoint EDIT link in top nav which shows up for users with
     * certain permissions.
     * 
     * @returns {undefined}
     */
    var removeTopNavEditLink = function()
    {
        //$(".ms-navedit-editArea").remove();
    }


    return {
		adjustContainerWidth: adjustContainerWidth,
        adjustContainerWidthPublic: adjustContainerWidthPublic,
		isEmpty: isEmpty,
        getPageType: getPageType,
        markSystemPage: markSystemPage,
		markEditMode: markEditMode,
        markRibbonExists: markRibbonExists,
        markSideNavigation: markSideNavigation,
        isEditMode: isEditMode,
		adjustSystemColumn: adjustSystemColumn,
		markEmptyRtestateField: markEmptyRtestateField,
		hideFirstNode: hideFirstNode,
		isSearchPage: isSearchPage,
		markSearchPage: markSearchPage,
        removeTopNavEditLink:removeTopNavEditLink,
        
    };
})(jQuery);