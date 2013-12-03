/*jslint devel: true*/
/**
 * @class Stat
 */
function Stat() {
	'use strict';
	this.total = 0;
	this.lastScannedDate = null;
	this.lastScannedMessageId = null;
}

(function () { // strict mode wrapper
	'use strict';
	Stat.prototype = {

		/**
		 * Initialisation function
		 */
		init: function Stat_init() {
			//return this;
		},
		
		setTotal: function Stat_setTotal(total) {
			this.total = total;
		},

		getTotal: function Stat_getTotal() {
			return this.total;
		},

		setLastScannedDate: function Stat_setLastScannedDate(lastScannedDate) {
			this.lastScannedDate = lastScannedDate;
		},

		getLastScannedDate: function Stat_getLastScannedDate() {
			return this.lastScannedDate;
		},

		setLastScannedMessageId: function Stat_setLastScannedMessageId(lastScannedMessageId) {
			this.lastScannedMessageId = lastScannedMessageId;
		},

		getLastScannedMessageId: function Stat_getLastScannedMessageId() {
			return this.lastScannedMessageId;
		},
		
		deserialize: function Stat_deserialize(plainObject) {
			this.total = plainObject.total;
			this.lastScannedDate = plainObject.lastScannedDate;
			this.lastScannedMessageId = plainObject.lastScannedMessageId;
		}
		
	};
}());
