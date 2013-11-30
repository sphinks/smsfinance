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
							'normalBubble',
							'splitInWords',
							'ruleRow'];
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

		setChatTitle: function Ui_setChatTitle(title) {
			$('#chat-title').html(title);
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
		
		clearSmsThreadList: function () {
			return $('#smsThreadList').empty();
		},
		
		clearWordsList: function () {
			return $('#splitSms').empty();
		},

		onSmsThreadListElementTap: function (event, element) {
			event.preventDefault();
			event.stopPropagation();
			app.setCurrentNumber(element.attr('phone'));
			app.setCurrentCaller(element.attr('caller'));
			$.mobile.changePage('#chat');
		},
		
		onMessageListElementTap: function (event, element) {
			event.preventDefault();
			event.stopPropagation();
			app.setCurrentMessage(element.attr('id'));
			$.mobile.changePage('#splitMessageInWords');
		},

		loadSmsThreadList: function () {
			var ul, i, date, caller, message;
			ul = this.clearSmsThreadList();
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
			ul.listview('refresh');
		},

		showMessageChat: function () {
			var listedDay = null, ul, i, date, data,
				key = app.getCurrentNumber(), messages;

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

					ul.append(app.ui.templateManager.get('normalBubble', data));
				}
				ul.listview('refresh');
				app.ui.scrollToBottom();
			}
		},
		
		showSplitMessage: function () {
			
			var message, i, data, words, htmlCode, parentElement = this.clearWordsList();
			htmlCode = '';
			message = app.model.getMessageById(app.getCurrentMessage());
			message = app.helpers.clearSmsForSplitting(message.body.plainBody);
			words = message.split(" ");
			for (i = 0; i < words.length; i++) {
				data = {
					'number': i,
					'word': words[i]
				};
				htmlCode += app.ui.templateManager.get('splitInWords', data);
			}
			
			parentElement.html(htmlCode);
		},
		
		saveRule: function () {
			var lastUnsedWord = '';
			var rule = new Rule('Rule 1');
			$('#splitSms > select').each(function () {
				/*console.log($(this).attr('name'));
				console.log($(this).attr('word'));*/
				console.log($(this).find(":selected").val());
				var typeOfSelect = $(this).find(":selected").val();
				if (typeOfSelect == 0) { //Nothing
					lastUnsedWord = $(this).attr('word');
				}else{
					if (typeOfSelect == 1) { //Outcome
						console.log('Set outcome: ' + lastUnsedWord);
						rule.setOutcomePrevWord(lastUnsedWord);
					}
					if (typeOfSelect == 2) { //Transaction code
						console.log('Set tcode: ' + lastUnsedWord);
						rule.setTcodePrevWord(lastUnsedWord);
					}
					if (typeOfSelect == 3) { //Date
						console.log('Set date: ' + lastUnsedWord);
						rule.setDatePrevWord(lastUnsedWord);
					}
				}
				
			});
			app.rules.push(rule);
			this.showMainPage();
		},
		
		loadRules: function() {
			console.log('Try to load rules');
			var ul, i, rules, data;

			ul = $('#rulesList').empty();
	
			if (app.rules.length != 0) {
				rules = app.rules;
				i = rules.length;
				while ((i -= 1) >= 0) {
					data = {
						'ruleName': rules[i].getName(),
						'dateWord': rules[i].getDatePrevWord(),
						'outcomeWord': rules[i].getOutcomePrevWord(),
						'tcodeWord': rules[i].getTcodePrevWord(),
						'smsMatch': rules[i].getSmsMatchExp()
					};
	
					ul.append(app.ui.templateManager.get('ruleRow', data));
				}
				ul.listview('refresh');
				app.ui.scrollToBottom();
			}
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

		showChatPage: function Ui_showChatPage() {
			this.setChatTitle(app.getCurrentCaller());
			$.mobile.changePage('#chat');
		},

		showMainPage: function Ui_showMainPage() {
			$.mobile.changePage('#main');
		}
	};

}());
