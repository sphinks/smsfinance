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
						self.messagesChangeListener();
					}
				);
			} catch (error) {
				console.error(error.message);
			}
		},

		messagesChangeListener: function () {
			var self = this,
				messageChangeCallback = {
					messagesupdated: function (updateMessages) {
						//console.log('Message updated');
						/*if (messages[0].messageStatus !== 'SENDING') {
							app.ui.changeMessageStatus(messages[0]);
						}*/
					},
					messagesadded: function (addedMessage) {
						//console.log('Message added: ');
						self.outputlog(messages);
						//self.prepareMessages(app.ui.showMessageChat);
					},
					messagesremoved: function (removedMessages) {
						//console.log('Message removed');
						//self.prepareMessages(app.ui.showMessageChat);
					}
				};
			this.smsService.messageStorage.addMessagesChangeListener(messageChangeCallback);
		},
		
		outputlog: function(messages) {
			console.log("Messages changed");
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
						app.ui.loadSmsThreadList();
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
		
		scanMessagesForRule: function (rule) {
			console.log('Start scan with ' + rule.getFromFilter());
			var i, messages = app.model.messagesList[rule.getFromFilter()].messages;
			var stat = new Stat();
			console.log('Message list: ' + messages.length);
			for (i = 0; i < messages.length; i++) {
				
				this.compareMessageAgainstRule(messages[i],rule, stat);
				//console.log('This is our message');
			}
			rule.setStat(stat);
			console.log("Total: " + rule.stat.total);
		},
		
		compareMessageAgainstRule: function (message, rule, stat) {
			
			var messageBody = app.helpers.clearSmsForSplitting(message.body.plainBody);
			var words = messageBody.split(" ");
			
			var i, smsMatch = '';
			for (i = 0; i < rule.matchIndexes.length; i++) {
				if (rule.matchIndexes[i] < words.length) {
					smsMatch += words[rule.matchIndexes[i]]; 
				}
			}
			console.log("Sms match: " + smsMatch + " against " + rule.getSmsMatchExp());
			if (smsMatch == rule.getSmsMatchExp()) {
				console.log('This is our message');
			}
			for (i = 1; i < words.length; i++) {
				if (words[i-1] == rule.getOutcomePrevWord()) {
					console.log('Start work with word: ' + words[i]);
					//words[i] = words[i].replace(/([$A-Za-z_])+/g,'');
					stat.total += parseFloat(words[i]);
					console.log('End work with word: ' + stat.total);
				}
			}
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
		
		getMessageById: function(messageId) {
			var messages,i;
			messages = this.messagesList[app.getCurrentCaller()].messages;
			i = messages.length;
			while ((i -= 1) >= 0) {
				if (messages[i].id === messageId) {
					return messages[i];
				}
			}
		},
		
		getSplitMessage: function() {
			var message = getMessageById(app.getCurrentMessage());
			return message;
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