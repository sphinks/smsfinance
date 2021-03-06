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
	this.fromFilter = null;
	this.matchIndexes = new Array();
	this.stat = new Stat();
}

(function () { // strict mode wrapper
	'use strict';
	Rule.prototype = {

		/**
		 * @type app.model.stat
		 */
		//stat: null,	
			
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
		init: function Rule_init() {
			
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
		
		setMatchIndexes: function Rule_setMatchIndexes(matchIndexes) {
			this.matchIndexes = matchIndexes;
		},

		getMatchIndexes: function Rule_getMatchIndexes() {
			return this.matchIndexes;
		},
		
		getFromFilter: function Rule_getFromFilter() {
			return this.fromFilter;
		},
		
		setFromFilter: function Rule_setFromFilter(fromFilter) {
			this.fromFilter = fromFilter;
		},
		
		getStat: function Rule_getStat() {
			return this.stat;
		},
		
		setStat: function Rule_setStat(stat) {
			this.stat = stat;
		},
		
		deserialize: function Rule_deserialize(plainObject) {
			this.name = plainObject.name;
			this.outcomePrevWord = plainObject.outcomePrevWord;
			this.datePrevWord = plainObject.datePrevWord;
			this.tcodePrevWord = plainObject.tcodePrevWord;
			this.smsMatchExp = plainObject.smsMatchExp;
			this.fromFilter = plainObject.fromFilter;
			this.matchIndexes = plainObject.matchIndexes;
			this.stat = plainObject.stat;
		}
		
	};
}());
