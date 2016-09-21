var Pxlml = Pxlml || {};

Pxlml.mobileUI = (function($) 
{
	var init = function() {
		hideOnDesktop();
		
		$(".navbar-toggle").click(function() {
			showItem($('#pm-topnav'));
			setMenuHeight();
		});

		$(".searchbar-toggle").click(function() {
			showItem($('.ms-mpSearchBox'));
			setInputFocus($('.ms-mpSearchBox'), ".ms-srch-sb-prompt");

			/*
			if ($(".ms-mpSearchBox").hasClass("pm-active")) {
				$(".ms-mpSearchBox").find(".ms-srch-sb-prompt").focus();
			}
			*/
		});

		setSubMenu();
	};

	var setInputFocus = function(element, child, requiredClass) {
		requiredClass = (typeof requiredClass === "undefined" || !requiredClass) ? "pm-active" : requiredClass;

		if (element.hasClass(requiredClass)) {
			element.find(child).focus();
		}
	}

	var setSubMenu = function() {
		$('LI.dynamic-children').each(function() {
			var span = $("<span class='mobileNavExpand'></span>");
			var _this = $(this);

			span.click(function() {
				setMenuHeight();
				_this.toggleClass("mobileExpanded");
				$(this).toggleClass("active");
			});

			$(this).children(".ms-core-listMenu-item").after(span);
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
			if(Pxlml.responsive.breakPointChanged() && Pxlml.responsive.getBreakPoint() < 768) {
				return;
			}
        	hideItems();
        	$("#pm-topnav").css({
                height: "auto",
                "overflow-y": "inherit"
            });
        });
	};

	return {
        init: init
    };

})(jQuery);
