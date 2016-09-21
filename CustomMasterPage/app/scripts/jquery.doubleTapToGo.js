/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License

	Description: This plugins allows users on ipads an other tablets to tap a menu navigation link with a submenu and have that submenu open instead of going to its parent link. Tap again, and you will go to link
*/

;(function($, window, document, undefined) {
	$.fn.doubleTapToGo = function(params) {
		if (!('ontouchstart' in window) &&
			!navigator.msMaxTouchPoints &&
			!navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) return false;

		this.each(function() {
			var curItem = false;
			$(this).on('click', function(e) {
				var item = $(this);
				//if the current menu is hovered, then not only touch, so remove double click requirement
				if ($(this).hasClass('hover')) {
					return true;
				}

				if (item[0] != curItem[0]) {
					e.preventDefault();
					curItem = item;
				}
			});

			$(document).on('click touchstart MSPointerDown', function(e) {
				var resetItem = true,
					parents	  = $(e.target).parents();

				for (var i = 0; i < parents.length; i++) {
					if (parents[i] == curItem[0]) {
						resetItem = false;
					}
				}

				if (resetItem) {
					curItem = false;
				}
			});
		});
		return this;
	};
})(jQuery, window, document);
