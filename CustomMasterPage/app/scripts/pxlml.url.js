/**
 * Pxlml 'string' object
 * 
 */

var Pxlml = Pxlml || {};

Pxlml.url = (function($) {

	/**
	 * Turn query strings into an object.
	 * 
	 * @returns an object, e.g. {page:1, keyword:sam}
	 */
	var convertQueryStringToObject = function()
	{
		var query, strings, result;
		
		query = window.location.search.substring(1); // substring gets rid of the "?"
		strings = query.split("&");
		result = {};
		
		jQuery.each(strings, function(i, item)
		{
			var pair = item.split("=");
			
			if(pair[1])
			{
				result[pair[0]] = pair[1];
			}
		});
		
		if(glb_debug) { console.log(result); }
		
		return result;
	};

	var getHash = function()
	{
	    var hashParams = new (function Params() {})();

	    if (window.location.hash.length === 0) {
	        return hashParams;
	    };

	    var hashArray = location.hash.substring(1).split('&');

	    for(var i in hashArray)
	    {
	        var keyValPair = hashArray[i].split('=');
	        hashParams[keyValPair[0]] = keyValPair[1];
	    }
	    return hashParams;
	};

	/**
	* Sets window.location.hash using an object
	**/
	var setHash = function(o)
	{
		var hashString = "#";
		var first = true;

		jQuery.each(o, function(key, value)
		{
			if(!first) {
				hashString += "&";
			}

			hashString += key + "=" + value;
			first = false;
		});

		window.location.hash = hashString;
	};

    return {
        convertQueryStringToObject:convertQueryStringToObject,
        getHash:getHash,
        setHash:setHash
    };
})(jQuery);