jQuery(document).ready(function($)
{
	consoleStub(); // prevent console.log() from breaking IE

	Pxlml.config.removeTopNavEditLink();
	Pxlml.config.markEditMode();
	//Pxlml.config.markRibbonExists(); // mark if sharepoint ribbon exists or not
	//Pxlml.config.markSearchPage(); // mark if sharepoint search results page
	//Pxlml.config.markSideNavigation(); // mark if there is a left navigation
	//Pxlml.config.adjustContainerWidth(); // optional Sharepoint behavior, to adjust bootstrap 3 container width
	Pxlml.browser.addLastChild();
	//Pxlml.config.hideFirstNode({navType:"structured"}); // (optional) Hide Sharepoint navigation first node

	Pxlml.config.adjustSystemColumn({
		system:".pm-system-master",
		aside:".pm-column-sidebar",
		main:".pm-column-article",
		checkFullScreen:true
	});

	//bind web part toolpane menu if exists to allow for drag/drop
	Pxlml.webpartEditor.bindWPMenu();

	/*
	ExecuteOrDelayUntilScriptLoaded(// Sharepoint function that runs after the page is loaded - useful when we want to wait
		function() {
			//Pxlml.browser.adjustFooter();
			//SP.UI.Workspace.add_resized(Pxlml.browser.adjustFooter);
			Pxlml.fixedHeader.init();
			SP.UI.Workspace.add_resized(Pxlml.fixedHeader.init);
		},
		"init.js"
	);
	*/

	Pxlml.mobileUI.init(); //set up mobile ui including mobile nav
	//Pxlml.accordian.init(); // create content in accordian windows
	//Pxlml.scrollList.init({delay: 5000}); // create scrollable lists of content

	//Pxlml.alert.init(); //initialize alert notification

	Pxlml.responsiveContent.init(); 


	//for touch screens, require double tap on top menu items to allow for dropdown menus
	$("UL.ms-core-listMenu-root > LI.dynamic-children").doubleTapToGo();



});
