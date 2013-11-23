/*jslint devel: true*/
/*global $, tizen, app, window */
/**
 * @class UiEvents
 */
function UiEvents(parent) {
	'use strict';

	this.ui = parent;
}

(function () { // strict mode wrapper
	'use strict';
	UiEvents.prototype = {

		/**
		 * Initialization
		 */
		init: function UiEvents_init() {
			this.addPageEvents();
			//this.enableFooterOnSoftKeyboard();
		},

		/**
		 * Bind events to pages
		 */
		addPageEvents: function UiEvents_addPageEvents() {
			var self = this;
			
			$('#createRuleButton').click(function() {
		    	
		    	app.loadMessage();
		    	console.log('clicked');
		    });

			document.addEventListener('tizenhwkey', function (e) {
				if (e.keyName === 'back') {
					tizen.application.getCurrentApplication().exit();
					/*if ($.mobile.activePage.attr('id') === 'main') {
						tizen.application.getCurrentApplication().exit();
					} else if ($.mobile.activePage.attr('id') === 'chat') {
						$.mobile.changePage('#main');
					} else {
						history.back();
					}*/
				}
			});

			$(window).on('resize', function () {
				$.mobile.activePage.page('refresh');
			});

			/* workaround for UIFW & webkit scroll*/
			//$('.ui-page').css('min-height', 0);
		},

		/* WORKAROUND for the footer show when the soft keyboard is displayed */
		/*enableFooterOnSoftKeyboard: function enableFooterOnSoftKeyboard() {
			window.addEventListener('softkeyboardchange', function (event) {
				event.stopPropagation();
				app.ui.scrollToBottom();
				app.ui.clearSendButton();
			});
		}*/
	};
}());
