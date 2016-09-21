var Pxlml = Pxlml || {};

Pxlml.mobileUI = (function($) {
	
	var init = function() {
		var $breadcrumbDropdown = $("#titleAreaRow .ms-breadcrumb-dropdownBox");

		hideOnDesktop();
		
		//add our responsive top navigation mobile buttom
		$breadcrumbDropdown.after("<button class=\"navbar-toggle  o365cs-base\" type=\"button\"><span class=\"ms-Icon--menu ms-Icon\"></span></button>");

		$(".navbar-toggle").click(function() {
			showItem($('#DeltaTopNavigation'));
			setMenuHeight();
		});
	};

	var showItem = function(element) {
		if($(element).hasClass("mobile") && $(element).hasClass("pm-active")) {
	        $(element).toggleClass("mobile");
	        $(element).toggleClass("pm-active");
	        return;
	    }

	    hideItems();

		$(element).toggleClass("mobile");
        $(element).toggleClass("pm-active");
	};

	var hideItems = function() {
		$("#s4-titlerow *").removeClass("mobile");
    	$("#s4-titlerow *").removeClass("pm-active");
	};

	var setMenuHeight = function() {
		$("#pm-topnav.mobile").css({
    		height: $(window).outerHeight() - $("HEADER").outerHeight(),
    		"overflow-y": "auto"
    	});
	};

	var hideOnDesktop = function() {
		$(window).smartresize(function() {
			var $workspace = $("#s4-workspace");

			//if mobile, ignore
			if ($workspace.outerWidth(true) < 768)
				return;

        	hideItems();

        	$("#DeltaTopNavigation").css({
                height: "auto",
                "overflow-y": "inherit"
            });
        });
	};

	return {
        init: init
    };

})(jQuery);
