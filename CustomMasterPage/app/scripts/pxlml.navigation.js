/**
 * Sharepoint navigation related methods, including top navigation parsing
 *
 */

var Pxlml = Pxlml || {};

Pxlml.navigation = (function($) {

	var TYPE_STRUCTURAL = 0;
	var TYPE_MANAGED = 1;
	var id = 0; // used to tag links

    var parseSharepointNav = function(options)
    {
		var $root, json = [];

		if(options === undefined)
		{
			throw Error("[options] undefined");
		}

		id = 0;

		if(!options.sourceDOM || options.sourceDOM.length === 0)
		{
			return false;
		}

		$root = getRoot(options.sourceDOM);
		
		
		json = getLinks($root, json, 1);
        return json;
    }

	var getRoot = function($DOM)
	{
		if(!$DOM || $DOM.length === 0)
		{
			return null;
		}
		
		return $DOM.find(".ms-core-listMenu-root");
	};

	var getLinks = function($DOM, json, depth)
	{
		if(!$DOM)
		{
			return false;
		}
		
		$DOM.find("> li").each(function()
		{
			var $a = $(this).find("> a");
			var $ul = $(this).find("> ul");

			id++;

			json.push({
				id: id,
				title: getSPLinkTitle($a),
				href: $a.attr("href"),
				subnav: getSubNav($ul, depth),
				selected: $(this).hasClass("selected") ? true : false,
				depth: depth
			});

		});

		return (json.length > 0) ? json : null;
	};

	var getSubNav = function($ul, depth)
	{
		var json = [];

		depth++;

		if($ul !== undefined)
		{
			$ul.each(function()
			{
				getLinks($ul, json, depth);
			});
		}

		return (json.length > 0) ? json : null;
	};

	var getSPLinkTitle = function($a)
	{
		return $a.find("SPAN.menu-item-text").html();
	}

    return {
        parseSharepointNav: parseSharepointNav,
		TYPE_STRUCTURAL: TYPE_STRUCTURAL,
		TYPE_MANAGED: TYPE_MANAGED
    };
})(jQuery);
