/*jslint devel: true*/
/**
 * @class Rule
 */
function Rule(name) {
	'use strict';
	this.name = name;
	this.outcomePrevWord = null;
	this.datePrevWord = null;
	this.tcodePrevWord = null;
	this.smsMatchExp = null;
}

(function () { // strict mode wrapper
	'use strict';
	Rule.prototype = {

		/**
		 * @type string
		 */
		//name: null,	
			
		/**
		 * @type string
		 */
		//outcomePrevWord: null,

		/**
		 * @type string
		 */
		//datePrevWord: null,

		/**
		 * @type string
		 */
		//tcodePrevWord: null,
		
		/**
		 * @type string
		 */
		//smsMatchExp: null,

		/**
		 * Initialisation function
		 */
		init: function Rule_init(name) {
			//return this;
		},
		
		setName: function Rule_setName(name) {
			this.name = name;
		},

		getName: function Rule_getName() {
			return this.name;
		},

		setOutcomePrevWord: function Rule_setOutcomePrevWord(outcomePrevWord) {
			this.outcomePrevWord = outcomePrevWord;
		},

		getOutcomePrevWord: function Rule_getOutcomePrevWord() {
			return this.outcomePrevWord;
		},

		setDatePrevWord: function Rule_setDatePrevWord(datePrevWord) {
			this.datePrevWord = datePrevWord;
		},

		getDatePrevWord: function Rule_getDatePrevWord() {
			return this.datePrevWord;
		},
		
		setTcodePrevWord: function Rule_setTcodePrevWord(tcodePrevWord) {
			this.tcodePrevWord = tcodePrevWord;
		},

		getTcodePrevWord: function Rule_getTcodePrevWord() {
			return this.tcodePrevWord;
		},
		
		setSmsMatchExp: function Rule_setSmsMatchExp(smsMatchExp) {
			this.smsMatchExp = smsMatchExp;
		},

		getSmsMatchExp: function Rule_getSmsMatchExp() {
			return this.smsMatchExp;
		},
		
	};
}());
