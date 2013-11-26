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
		 * Initialisation function
		 */
		init: function App_init() {
			// instantiate the libs
			this.config = new Config();
			this.helpers = new Helpers();
			this.ui = new Ui();
			this.model = new Model();
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
