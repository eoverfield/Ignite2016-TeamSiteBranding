/* PnP SharePoint - Responsiveness */

var PnPResponsiveApp = PnPResponsiveApp || {};

PnPResponsiveApp.responsivizeSettings = function () {
	// return if no longer on Settings page
	if (window.location.href.indexOf('/settings.aspx') < 0) return;
	
	// find the Settings root element, or wait if not available yet
	var settingsRoot = $(".ms-siteSettings-root");
	if (!settingsRoot.length) {
		setTimeout(PnPResponsiveApp.responsivizeSettings, 100);
        return;
	}
	
	$(".ms-siteSettings-root .ms-linksection-level1").each(function () {
		var self = $(this);
		var settingsDiv = $('<div>');
		settingsDiv.addClass("pnp-settingsdiv");
		self.find(".ms-linksection-iconCell img").appendTo(settingsDiv);
		self.find(".ms-linksection-textCell").children().appendTo(settingsDiv);
		settingsDiv.appendTo(settingsRoot);
	});
	settingsRoot.find("table").remove();
}


PnPResponsiveApp.setUpToggling = function () {
	// if it is already responsivized, return
    if ($("#navbar-toggle").length)
        return;

    // Set up sidenav toggling
    var topNav = $('#DeltaTopNavigation');
    var topNavClone = topNav.clone()
    topNavClone.addClass('mobile-only');
    topNavClone.attr('id', topNavClone.attr('id') + "_mobileClone");
    topNav.addClass('no-mobile');
    $('#sideNavBox').append(topNavClone);
    var sideNavToggle = $('<button>');
    sideNavToggle.attr('id', 'navbar-toggle')
    sideNavToggle.addClass('mobile-only');
    sideNavToggle.addClass('burger'); //based on PnP Responsive Pull request from jquintozamora
    sideNavToggle.attr('type', 'button');
    sideNavToggle.html("<span></span>");
    sideNavToggle.click(function() { 
        $("body").toggleClass('shownav');
        sideNavToggle.toggleClass('selected');
    });
    $("#pageTitle").before(sideNavToggle);
}

PnPResponsiveApp.InsertGlobalNavigation = function () {
	var $bodyContainer = $("#s4-bodyContainer");
	var $globalNav = $("<div id=\"pnp-global-nav\"></div>");


	//the following snippet is originally from https://github.com/OfficeDev/PnP/blob/master/Samples/OD4B.NavLinksInjection/OD4B.NavLinksInjectionWeb/Scripts/injectnavigation.js
	var insertDiv1 =
	 "<div class='ms-dialogHidden ms-fullWidth noindex' id='injectionBar' style='border-top-color: rgb(42, 141, 212); border-top-width: 1px; border-top-style: solid; background-color: rgb(0, 114, 198);'>" +
	    "<div class='ms-fullWidth removeFocusOutline' id='injectionBarTop' style='height: 30px; position: relative;'>" +
	        "<div class='o365cs-nav-header16 o365cs-base o365cst o365spo o365cs-topnavBGImage' id='O365_InjectionNavHeader' style='height: 30px;max-width: 1920px;' autoid='__Microsoft_O365_Shell_Core_templates_cs_b'>" +
	            "<div class='o365cs-nav-leftAlign o365cs-topnavBGColor'></div>" +
	            "<div class='o365cs-nav-rightAlign' id='O365_TopInjectionMenu'>" +
	                "<div class='o365cs-nav-headerRegion o365cs-topnavBGColor'>" +
	                    "<div class='o365cs-nav-O365LinksContainer o365cs-topnavLinkBackground'>" +
	                        "<div class='o365cs-nav-O365Links'><div>" +
	                            "<div style='display: none;'></div>" +
	                            "<div style='float: left;'>" +
	                            "<div class='o365cs-nav-topItem' style='height: 30px;'>" +
	                                "<div>" +
	                                "<a tabindex='0' style='padding-right: 20px;padding-left: 20px;height: 30px;line-height: 20px' title='Go to some site' class='o365button ms-font-m o365cs-nav-item o365cs-nav-link o365cs-topnavText ms-bgc-td-h' id='O365_MainLink_Link1' " +
	                                "role='menuitem' aria-disabled='false' aria-haspopup='false' aria-selected='false' aria-label='Go to some site' " +
	                                "href='http://msdn.microsoft.com'>" +
	                                "<span style='font-size: 12px;line-height:30px;'>Intranet</span>" +
	                                "<span style='display: none;'>" +
	                                    "<span class='wf wf-o365-x18 wf-family-o365 header-downcarat' role='presentation></span>" +
	                                "</span>" +
	                                "<div class='o365cs-activeLinkIndicator ms-bcl-w' style='display: none;'></div>" +
	                                "</a>" +
	                                "</div>" +
	                                "<div style='display: none;'></div>" +
	                            "</div>" +
	                            "</div>" +
	                            "<div style='display: none'></div>" +
	                            "<div style='float: left;'>" +
	                            "<div class='o365cs-nav-topItem' style='height: 30px;'>" +
	                                "<div>" +
	                                "<a tabindex='1' style='padding-right: 20px;padding-left: 20px;height: 30px;;line-height: 20px' title='Go to some site' class='o365button ms-font-m o365cs-nav-item o365cs-nav-link o365cs-topnavText ms-bgc-td-h' id='O365_MainLink_Link2' " +
	                                "role='menuitem' aria-disabled='false' aria-haspopup='false' aria-selected='false' aria-label='Go to some site' " +
	                                "href='http://technet.microsoft.com'>" +
	                                "<span style='font-size: 12px;line-height:30px;'>Tools</span>" +
	                                "<span style='display: none;'>" +
	                                    "<span class='wf wf-o365-x18 wf-family-o365 header-downcarat' role='presentation></span>" +
	                                "</span>" +
	                                "<div class='o365cs-activeLinkIndicator ms-bcl-w' style='display: none;'></div>" +
	                                "</a>" +
	                                "</div>" +
	                                "<div style='display: none;'></div>" +
	                            "</div>" +
	                            "</div>" +
	                        "</div>" +
	                    "</div>" +
	                "</div>" +
	            "</div>" +
	        "</div>" +
	    "</div>" +
	"</div>";

	$globalNav.html(insertDiv1);
	$bodyContainer.prepend($globalNav);
}


PnPResponsiveApp.init = function () {
    if (!window.jQuery) {
        // jQuery is needed for PnP Responsive UI to run, and is not fully loaded yet, try later
        setTimeout(PnPResponsiveApp.init, 100);
    } else {
        $(function() { // only execute when DOM is fully loaded

            // embedding and loading of all necessary CSS files and JS libraries
            var currentScriptUrl = $('#PnPResponsiveUI').attr('src');
            if (currentScriptUrl != undefined) {
                var currentScriptBaseUrl = currentScriptUrl.substring(0, currentScriptUrl.lastIndexOf("/") + 1);

                addViewport();
            }

            PnPResponsiveApp.setUpToggling();
			PnPResponsiveApp.responsivizeSettings();
			
			//PnPResponsiveApp.InsertGlobalNavigation();

			// also listen for dynamic page change to Settings page
			window.onhashchange = function () { PnPResponsiveApp.responsivizeSettings(); };
			
			// extend/override some SP native functions to fix resizing quirks
			var originalResizeFunction = FixRibbonAndWorkspaceDimensions;
			FixRibbonAndWorkspaceDimensions = function() {
				// let sharepoint do its thing
				originalResizeFunction();
				// fix the body container width
				$("#s4-bodyContainer").width($("#s4-workspace").width() );
			}
        });
    }
}

/* Dynamic JS embedding and loading */
function loadScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}
function addViewport() {
    var head = document.getElementsByTagName('head')[0];
    var viewport = document.createElement('meta');
    viewport.name= "viewport";
    viewport.content= "width=device-width, initial-scale=1"; 
    head.appendChild(viewport);
}


// embedding of jQuery, and initialization of responsiveness when ready
loadScript("//code.jquery.com/jquery-1.12.0.min.js", function() {
    PnPResponsiveApp.init();
});