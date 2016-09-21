var Pxlml = Pxlml || {};

Pxlml.wiki = (function($) 
{
	var init = function() {
		// adds class to each row of wiki layout table
		var $table_rows = $('.ms-wikicontent #layoutsTable > tbody > tr');

		if ($table_rows.length == 1) {
			$table_rows.addClass("pm-layouttable-row").addClass("pm-layouttable-row-single");
		}
		else {
			$table_rows.each( function(i) { 
				$(this).addClass("pm-layouttable-row").addClass("pm-layouttable-row-"+ (i+1));
			});
		}
	};

	return {
        init: init
    };

})(jQuery);
