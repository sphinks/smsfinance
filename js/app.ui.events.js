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
//				console.log('Try to read: test');
//				var item = window.localStorage.getItem( 'item_name');
//				console.log('Read: ' + item);
		    	app.loadMessage();
		    });
			
			$('#chat').on('pageshow', function () {
				app.fillUpMessagePage();
			});
			
			$('#messageList').on('tap', 'li.ui-li-has-multiline', function (event) {
				self.ui.onCallerListElementTap(event, $(this));
//				console.log('clicked');
//				console.log('Try to save: test');
//				window.localStorage.setItem( 'item_name', 'test12');
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
