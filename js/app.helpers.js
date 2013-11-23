/*global $, tizen, app */
/**
 * @class Helpers
 */
function Helpers() {
	'use strict';
	return;
}

(function () { // strict mode wrapper
	'use strict';
	Helpers.prototype = {

		/**
		 * Checks the length of the string and returns true if its length is greater than 0
		 * @param {string} value The value of the string.
		 * @returns {boolean}
		 */
		checkStringLength: function Helpers_checkStringLength(value) {
			return value.length > 0 ? true : false;
		},

		objectLength: function (obj) {
			var result = 0, prop;
			for (prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					result += 1;
				}
			}
			return result;
		},

		/**
		 * Checks the length of the number and returns true if its length is greater than 0
		 * @param {string} value The value of the number.
		 * @returns {boolean}
		 */
		validateNumberLength: function Helpers_validateNumberLength(value) {
			return value.length > 0 ? true : false;
		},

		/**
		 * Checks the value of the number and returns true if its value is greater than 0
		 * @param {number} value The value of the number.
		 * @returns {boolean}
		 */
		isNumberGreaterThanZero: function Helpers_isNumberGreaterThanZero(value) {
			return value > 0 ? true : false;
		},

		/**
		 * Checks the value of the number and adds "0" before if its value is lower than 10
		 * @param {number} value The value of the number.
		 * @returns {string|number}
		 */
		addZeroBefore: function Helpers_addZeroBefore(value) {
			return value < 10 ? "0" + value : value;
		},

		/**
		 * Checks if the date passed as an argument is today's date
		 * @param {date} date The value of the date to compare.
		 * @returns {string} Empty string if it is not today's date or "(today)" if it is today's date.
		 */
		checkToday: function Helpers_checkToday(date) {
			var today = new Date(), todayString = '';
			if (today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()) {
				todayString = '(today)';
			}
			return todayString;
		},

		/**
		 * Extracts full name from contact object
		 * @param {contact} contact The contact object.
		 * @param {string} option The optional value for full name if the firstName and lastName are empty.
		 * @returns {string} Full contact name.
		 */
		getCallerName: function Helpers_getCallerName(contact, option) {
			var callerName = [],
				firstName = contact.name.firstName,
				lastName = contact.name.lastName;

			if (firstName !== '' && firstName !== null) {
				callerName.push(firstName);
			}
			if (lastName !== '' && lastName !== null) {
				callerName.push(lastName);
			}
			if (callerName.length === 0) {
				callerName.push(option);
			}
			return callerName.join(' ');
		}
	};
}());
