var Pxlml = Pxlml || {};

Pxlml.responsiveContent = (function($) 
{
	var init = function() {
		// console.log( $('#layoutsTable td').text() );
		 
		// adds class to each row of wiki layout table
		var $table_rows = $('.ms-wikicontent #layoutsTable > tbody > tr');

		if ($table_rows.length == 1){
			console.log("here");
			$table_rows.addClass("pm-layouttable-row-single");
		} else {

			$table_rows.each( function(i) { 
				$(this).addClass("pm-layouttable-row-"+ (i+1));
			});
		}
	};



	return {
        init: init
    };

})(jQuery);
