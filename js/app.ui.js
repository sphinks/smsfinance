/*global $, document, console, tizen, app, TemplateManager, UiEvents */
/**
 * @class Ui
 */

function Ui() {
	'use strict';
	this.init();
}

(function () { // strict mode wrapper
	'use strict';
	Ui.prototype = {

		templateManager: null,

		/**
		 * UI object for UI events
		 */
		uiEvents: null,

		/**
		 * UI module initialisation
		 */
		init: function Ui_init() {
			this.templateManager = new TemplateManager();
			this.uiEvents = new UiEvents(this);
			$(document).ready(this.domInit.bind(this));
			// Disable selection event on document;
			//$.mobile.tizen.disableSelection(document);
		},

		/**
		 * When DOM is ready, initialise it (bind events)
		 */
		domInit: function Ui_domInit() {
			var templates = ['main_page',
							'chat',
							'callerRow',
							'contactSelect',
							'contactRow',
							'normalBubble'];
			this.templateManager.loadToCache(templates, this.initPages.bind(this));
		},

		initPages: function Ui_initPages() {
			var pages = [];

			app.model.init();

			//$('#main').append($(this.templateManager.get('main_page')).children()).trigger('pagecreate');

			//pages.push(this.templateManager.get('contactSelect'));
			//pages.push(this.templateManager.get('chat'));
			//$('body').append(pages.join(''));

			this.uiEvents.init();

			//this.setChatCounterValue();
			//this.checkChatSendButtonState();
		},

		scrollToBottom: function (noCorrection) {
			var talk = $("#chat-content .ui-scrollview-view"),
				heightDiff = talk.height() - talk.parent().height();
			noCorrection = noCorrection || false;
			if (heightDiff > 0) {
				setTimeout(function () {
					$('#chat-content').scrollview('scrollTo', 100, -99999, 500);
				}, 300);
			}
			if (!noCorrection) {
				setTimeout(function () {
					app.ui.scrollToBottom(true);
				}, 200);
			}
			$('.ui-overflow-indicator-bottom').css('opacity', 0);
		},

		setChatTitle: function Ui_setChatTitle(title) {
			$('#chat-title').html(title);
		},

		resetTextAreas: function Ui_resetTextAreas() {
			$('#text').val('');
			$("input[name='number']").val('');
			$("#enterNumberCreate").addClass('ui-disabled');
		},

		setChatCounterValue: function Ui_setChatCounterValue() {
			this.setCounterValue($('#text'));
		},

		setCounterValue: function (obj) {
			var current = obj.val().length, message = app.maxMessageLength,
				numberOfMessages, charLeft;

			if (current <= message) {
				charLeft = message - current;
				numberOfMessages = 1;
			} else {
				message -= app.multiMessageHeaderLength;
				charLeft = current % message;
				if (charLeft !== 0) {
					charLeft = message - charLeft;
				}
				numberOfMessages = Math.ceil(current / message);
			}
			obj.parent().next().find('.counter p')
				.text(charLeft + '/' + numberOfMessages);
		},

		checkChatSendButtonState: function Ui_checkChatSendButtonState() {
			if (app.helpers.checkStringLength($('#text').val())) {
				$('#send')
					.css({
						'pointer-events': 'auto',
						'color': '#000'
					})
					.removeClass('ui-disabled');
			} else {
				$('#send').css({'pointer-events': 'none', 'color': '#bbb'}).addClass('ui-disabled');
			}
		},

		clearSendButton: function () {
			$(".ui-btn-down-s").removeClass('ui-btn-down-s');
		},

		resetPages: function () {
			this.resetTextAreas();
			this.setChatCounterValue();
			this.checkChatSendButtonState();
		},

		clearChatList: function () {
			$('#chat-title').html('');
			$('#message-chat').empty();
		},

		clearCallerList: function () {
			return $('#messageList').empty();
		},

		onCallerListElementTap: function (event, element) {
			event.preventDefault();
			event.stopPropagation();
			app.setCurrentNumber(element.attr('phone'));
			app.setCurrentCaller(element.attr('caller'));
			$.mobile.changePage('#chat');
		},

		fillContactList: function Ui_fillContactList(sortedContactList) {
			var i, ul = $("#contactSelect-list").empty(),
				len, listElement, self = this;

			len = sortedContactList.length;

			for (i = 0; i < len; i += 1) {
				listElement = this.templateManager.get('contactRow', {
					'number': sortedContactList[i].number,
					'callerName': sortedContactList[i].caller
				});

				if (app.helpers.validateNumberLength(sortedContactList[i].number)) {
					ul.append(listElement);
				}
			}

			$('li.ui-li-has-multiline', ul).on('tap', function (event) {
				app.ui.onCallerListElementTap(event, $(this));
			});

			ul.trigger('create');
			ul.listview('refresh');
		},

		loadCallerList: function () {
			var ul, i, date, caller, message;
			ul = this.clearCallerList();
			for (i in app.model.messagesList) {
				if (app.model.messagesList.hasOwnProperty(i)) {
					caller = '';
					message = app.model.messagesList[i];
					date = new Date(message.lastMessage.timestamp);

					caller = app.model.getNameByNumber(i);
					try {
						ul.append(
							this.templateManager.get('callerRow', {
								'number': i,
								'callerName': caller,
								'plainBody': message.lastMessage.body.plainBody
									.substring(0, 50),
								'hour': date.getHours(),
								'minutes': app.helpers.addZeroBefore(date.getMinutes())
							})
						);
					} catch (err) {
						console.log(err);
					}
				}
			}
			console.log(ul.html());
			ul.listview('refresh');
		},

		createChatByNumber: function () {
			var phone = $("input[name='number']");
			app.setCurrentNumber(phone.val());
			app.setCurrentCaller(app.model.getNameByNumber(phone.val()));
			$.mobile.changePage('#chat');
		},

		showMessageChat: function () {
			var listedDay = null, ul, i, date, data,
				key = app.getCurrentNumber(), messages;

			app.ui.resetPages();
			$('#chat-title').html(app.getCurrentCaller());
			ul = $('#message-chat').empty();

			if (app.model.messagesList[key] !== undefined) {
				messages = app.model.messagesList[key].messages;
				i = messages.length;
				while ((i -= 1) >= 0) {
					date = new Date(messages[i].timestamp);
					data = {
						'bubbleType': messages[i].to.length === 0 ? 'left' : 'right',
						'label': app.model.getNameByNumber(messages[i].from),
						'caller': messages[i].caller,
						'id': messages[i].id,
						'plainBody': messages[i].body.plainBody,
						'hour': date.getHours(),
						'status': messages[i].messageStatus,
						'minutes': app.helpers.addZeroBefore(date.getMinutes())
					};

					if (!messages[i].isRead) {
						app.model.setRead(messages[i]);
					}

					ul.append(app.ui.templateManager.get('normalBubble', data));
				}
				ul.listview('refresh');
				app.ui.scrollToBottom();
			}
		},

		changeMessageStatus: function (message, loop) {
			var warning = $('#' + message.id + ' .warning'),
				classes, i, self = this;
			loop = loop + 1 || 0;
			if (warning.length === 1) {
				classes = warning.attr('class').split(' ');
				for(var i in classes) {
					if (classes.hasOwnProperty(i)) {
						if (/status([A-Z]*)/.test(classes[i])) {
							warning.removeClass(classes[i]);
						}
					}
				}
				warning.addClass('status' + message.messageStatus);
			} else if (loop < 3) {
				setTimeout(function () {
					self.changeMessageStatus(message, loop)
				}, 1000);
			}
		},

		showChatPage: function Ui_showChatPage() {
			this.setChatTitle(app.getCurrentCaller());
			$.mobile.changePage('#chat');
		},

		showMainPage: function Ui_showMainPage() {
			$.mobile.changePage('#main');
		}
	};

}());
