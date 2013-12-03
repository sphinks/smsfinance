/*jslint devel: true*/
/*global $, tizen, app, Config, Helpers, Ui, Model */
var App = null;

(function () { // strict mode wrapper
	'use strict';

	/**
	 * Creates a new application object
	 *
	 * @class Application
	 */
	App = function App() {
		this.currentNumber = null;
		this.currentCaller = null;
		this.currentMessage = null;
	};

	App.prototype = {
		/**
		 * @type Array
		 */
		requires: [
			'js/app.config.js',
			'js/app.helpers.js',
			'js/app.model.rule.js',
			'js/app.model.js',
			'js/app.ui.js',
			'js/app.ui.templateManager.js',
			'js/app.ui.templateManager.modifiers.js',
			'js/app.ui.events.js'
		],

		/**
		 * @type Model
		 */
		model: null,

		/**
		 * @type Ui
		 */
		ui: null,

		/**
		 * @type Config
		 */
		config: null,

		/**
		 * @type Helpers
		 */
		helpers: null,
		
		/**
		 * @type Array
		 */
		rules: [],

		/**
		 * Initialisation function
		 */
		init: function App_init() {
			// instantiate the libs
			this.config = new Config();
			this.helpers = new Helpers();
			this.ui = new Ui();
			this.model = new Model();
			//this.rule = new Rule();
			return this;
		},

		setCurrentNumber: function App_setCurrentNumber(number) {
			this.currentNumber = number;
		},

		getCurrentNumber: function App_getCurrentNumber() {
			return this.currentNumber;
		},

		setCurrentCaller: function App_setCurrentCaller(caller) {
			this.currentCaller = caller;
		},

		getCurrentCaller: function App_getCurrentCaller() {
			return this.currentCaller;
		},
		
		setCurrentMessage: function App_setCurrentMessage(message) {
			this.currentMessage = message;
		},

		getCurrentMessage: function App_getCurrentMessage() {
			return this.currentMessage;
		},
		
		/**
		 * exit application action
		 */
		exit: function App_exit() {
			var application = tizen.application.getCurrentApplication();
			application.exit();
		},
		
		loadMessage: function App_loadMessage() {
			this.model.loadMessages();
		},
		
		splitMessage: function App_splitMessage() {
			this.ui.showSplitMessage();
		},
		
		saveRule: function App_saveRule() {
			var rule = this.ui.saveRule();
			var rulesJson = JSON.stringify(app.rules, null, 2);
			//console.log('Object to json saved: ' + rulesJson);
			window.localStorage.setItem('SmsFinance.rules', rulesJson);
			app.model.scanMessagesForRule(rule);
		},
		
		loadRules: function App_loadRules() {
			var rulesJson = JSON.parse(window.localStorage.getItem('SmsFinance.rules'));
			app.rules.length = 0;
			for (var i = 0; i < rulesJson.length; i++) {
				var rule = new Rule('');
				rule.deserialize(rulesJson[i]);
				app.rules.push(rule);
			}
			this.ui.loadRules();
		},
		
		deleteRule: function App_deleteRule(ruleName) {
			var indexToDelete = -1;
			for (var i = 0; i < app.rules.length; i++) {
				if (app.rules[i].getName() == ruleName) {
					indexToDelete = i;
					break;
				}
			}
			console.log(indexToDelete);
			if (indexToDelete >= 0) {
				app.rules.splice(indexToDelete, 1);
				var rulesJson = JSON.stringify(app.rules, null, 2);
				window.localStorage.setItem('SmsFinance.rules', rulesJson);
				this.loadRules();
			}
		},

		fillUpMessagePage: function () {
			/*if ($.mobile.activePage.attr('id') === 'main') {
				this.ui.loadCallerList();
			} else {
				this.ui.showMessageChat();
			}*/
			this.ui.showMessageChat();
		}
	};
}());
