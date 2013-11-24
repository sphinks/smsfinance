/*jslint devel: true*/
/*global $, tizen, app */
/**
 * @class Model
 */
function Model() {
	'use strict';

	this.smsService = null;
	this.messagesList = {};
	this.contactsLoaded = null;
	this.init();
}

(function () { // strict mode wrapper
	'use strict';
	Model.prototype = {

		init: function () {
			this.initSmsService();
		},

		initSmsService: function () {
			var self = this;
			try {
				tizen.messaging.getMessageServices("messaging.sms",
					function (s) {
						self.smsService = s[0];
						self.loadMessages(app.fillUpMessagePage.bind(self));
						self.messagesChangeListener();
					}
				);
			} catch (error) {
				console.error(error.message);
			}
		},

		messagesChangeListener: function () {
			var self = this, config,
				messageChangeCallback = {
					messagesupdated: function (messages) {
						if (messages[0].messageStatus !== 'SENDING') {
							app.ui.changeMessageStatus(messages[0]);
						}
					},
					messagesadded: function (messages) {
						self.prepareMessages(app.ui.showMessageChat);
					},
					messagesremoved: function () {
						self.prepareMessages(app.ui.showMessageChat);
					}
				};
			this.smsService.messageStorage.addMessagesChangeListener(messageChangeCallback);
		},

		loadMessages: function (callback) {
			var self = this;
			try {
				this.smsService.messageStorage.findMessages(
					new tizen.AttributeFilter("type", "EXACTLY", "messaging.sms"),
					function (messages) {
						function compare(a, b) {
							if (a.timestamp > b.timestamp) {
								return -1;
							} else if (a.timestamp < b.timestamp) {
								return 1;
							} else {
								return 0;
							}
						}
						messages.sort(compare);
						self.messagesList = self.groupMessages(messages);
						app.ui.loadCallerList();
						//callback();
					},
					function () {
						console.error('prepareMessage: error');
					}
				);
			} catch (err) {
				console.error(err);
			}
		},

		groupMessages: function (messages) {
			var i, obj = {};
			for (i in messages) {
				if (messages.hasOwnProperty(i)) {
					obj = this.groupMessagesSingle(messages[i], obj);
				}
			}
			return obj;
		},

		groupMessagesSingle: function (message, obj) {
			var key, j;
			if (message.from) {
				key = message.from;
				obj[key] = this.pushData(message, obj[key]);
			} else {
				for (j in message.to) {
					if (message.to.hasOwnProperty(j)) {
						key = message.to[j];
						obj[key] = this.pushData(message, obj[key]);
					}
				}
			}
			return obj;
		},

		pushData: function (message, obj) {
			obj = obj || this.getGroupObject();
			obj.messages.push(message);
			if (app.helpers.objectLength(obj.lastMessage) === 0) {
				obj.lastMessage = message;
			}
			return obj;
		},

		getGroupObject: function () {
			return {
				messages: [],
				lastMessage: {},
				last: {
					body: {
						plainBody: null
					},
					timestamp: new Date()
				}
			};
		},

		getMessages: function () {
			return this.messagesList;
		},

		getNameByNumber: function (number) {
			var i, j, contact, name;
			for (i in this.contactsLoaded) {
				if (this.contactsLoaded.hasOwnProperty(i)) {
					contact = this.contactsLoaded[i];
					for (j in contact.phoneNumbers) {
						if (contact.phoneNumbers.hasOwnProperty(j)) {
							if (contact.phoneNumbers[j].number === number) {
								name = contact.name.displayName;
								break;
							}
						}
					}
				}
			}
			return name || number;
		},
	};
}());