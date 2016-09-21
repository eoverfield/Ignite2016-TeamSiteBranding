/*
 * spNav - SharePOint Navigation
 * Version 1.0
 * @requires jQuery v1.8.1 or greater
 *
 * Copyright (c) 2013 PixelMill Inc
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 */
/**
 * @description SharePoint Navigation
 * @type jQuery
 * @name spNav
 * @category Plugins/spNav
 * @author PixelMill - Eric Overfield - ericoverfield.com
 */

;(function($){
	var spNav = {
		init : function( options ) {
			var settings = $.extend({'renderType'    : '','renderOptions' : {},'responsive'    : true}, options);
		    return this.each(function(){if (!$(this).data('spMenu')) {$(this).data('spMenu', {'nav': {},'settings': settings});}$(this).data('spMenu', {'nav': parseNav($(this).find('ul.root')),'settings': settings});data = $(this).data('spMenu');if (data.settings.renderType) {if (data.settings.renderType == 'calguard') {$(this).spNav('renderCalGuard', options);}}function parseNav(u, sd) {var r = {};if (u.length < 1)return r;var l;if (u.hasClass('root'))l = u.eq(0).find('li.static:not(".ms-listMenu-editLink")');else l = u.eq(0).children('li.dynamic:not(".ms-listMenu-editLink")');if (l) {l.each(function(i) {var itemInfo = parseNavItem($(this).children('.menu-item').eq(0));var children = parseNav($(this).children('ul'));r[i] = {text: itemInfo.text, title: itemInfo.title, url: itemInfo.url, opennew: itemInfo.opennew, selected: itemInfo.selected, subnav: children};});}return r;}function parseNavItem(item) {var r = {};if (r.length < 1)return r;r = {text: '', title: '', url: '', opennew: false, selected: false};if (item.is('a')) {r.text = item.find('.menu-item-text').html();if (item.attr('title')) r.title = item.attr('title');r.url = item.attr('href');if (item.attr('target')) {if (item.attr('target').toLowerCase() == '_blank')r.opennew = true;}if (item.hasClass('selected'))r.selected = true;}else if (item.is('span')) {r.text = item.find('.menu-item-text').html();if (item.hasClass('selected'))r.selected = true;}return r;}});
		},

		renderCalGuard : function(options) {
			return this.each(function(){
				if (!$(this).data('spMenu')) {
					var settings = $.extend({
				      'renderType' : 'calguard'
				    }, options);
					$(this).spNav(settings);
				}
				else {
					var data = $(this).data('spMenu');
					if (!data.nav)
						return false;
					var responsive = (data.settings.responsive === true) ? true:false;
					var h = '';
					
					h += '<div class="cg-menu-container clearfix"><ul class="cg-menu">' + renderNavItems(data.nav) + '</ul></div>';
					var v = $(h);
					$(this).after(v);
					$(this).hide();
					
					/*dev override*/
					//$('html').addClass('touch');
					
					/*handle menu different if touch or no touch*/
					if ($('html').hasClass('touch')) {
						var m = $(this).siblings('.cg-menu-container').children('.cg-menu');
						m.find('a').each(function() {
							if ($(this).siblings('ul').length > 0) {
								$(this).nodoubletapzoom();
								$(this).bind('click', function() {
									if (!$(this).parent().hasClass('hover')) {
										$(this).parent().addClass('hover');
										var d = new Date();
										$(this).data('ct', {'t':d.getTime()});
									}
									else { /*already shown so decide*/
										/*check for double click*/
										if ($(this).data('ct')) {
											var t = $(this).data('ct').t;
											var d = new Date();
											if ((d.getTime() - t) < 1250) {
												return true;
											}
										}
										$(this).parent().removeClass('hover');
										return false;
									}
									return false;
								});
							}
						});
					} 
					else { /*no touch, i.e. desktop with mouse*/
						var m = $(this).siblings('.cg-menu-container').children('.cg-menu');
						m.find('li').each(function() {
							if ($(this).children('ul').length > 0) {
								$(this).hoverIntent({
									timeout: 750,
									interval: 100,
									over: function() {
										$(this).addClass('hover');
									},
									out: function () {
										$(this).removeClass('hover');
									},
								});
							}
						});
					}
				}
				
				function renderNavItems(items) {
					var r = '';
					if (!items) return r;
					if (Object.spNavObjectSize(items) < 1) return r;
						
					for(var item in items) {
						var sub = renderNavItems(items[item].subnav);

						r += '<li';
						if (items[item].selected === true)
							r += ' class="current"';
						r += '>';
						if (items[item].url !== '') {
							r += '<a href="' + items[item].url + '"'
							if (items[item].title && (items[item].title !== ''))
								r += ' title="' + items[item].title + '"';
							if (items[item].opennew === true)
								r += ' target="_blank"';
							r += '>';
							r += items[item].text;
							if (items[item].text.toLowerCase() == 'organization')
								r += '<span>&gt;&gt;</span>';
							r += '</a>';
						}
						else {
							r += '<span>' + items[item].text + '</span>';
						}

						if (sub.length > 0) {
							r += '<ul>';
							r += sub;
							r += '</ul>';
						}

						r += '</li>';
					}
					
					return r;
				}
			});
		}
	};

	$.fn.spNav = function(m) {if (spNav[m]) { return spNav[m].apply(this, Array.prototype.slice.call(arguments, 1));}else if (typeof m === 'object' || ! m) {return spNav.init.apply(this, arguments);}else {$.error( 'Method ' +  m + ' does not exist on jQuery.spNav');}};
})( jQuery );
Object.spNavObjectSize = function(obj) {var key,len=0;for(key in obj){len += Number( obj.hasOwnProperty(key) );}return len;};

// jQuery no-double-tap-zoom plugin
 
// Triple-licensed: Public Domain, MIT and WTFPL license - share and enjoy!
 
(function($) {
	var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
	$.fn.nodoubletapzoom = function() {
		if (IS_IOS) {
			$(this).bind('touchstart', function preventZoom(e) {
				var t2 = e.timeStamp, t1 = $(this).data('lastTouch') || t2, dt = t2 - t1, fingers = e.originalEvent.touches.length;
				$(this).data('lastTouch', t2);
				if (!dt || dt > 500 || fingers > 1) return; // not double-tap
	 
				e.preventDefault(); // double tap - prevent the zoom
				// also synthesize click events we just swallowed up
				$(this).trigger('click').delay(100).trigger('click');
			});
		}
	};
})(jQuery);