/*global $, tizen, app */
/**
 * @class Config
 */
function Config() {
	'use strict';
}

(function () { // strict mode wrapper
	'use strict';
	Config.prototype = {

		properties: {
			'templateDir': 'templates',
			'templateExtension': '.tpl'
		},

		/**
		 * Returns config value
		 */
		get: function (value, defaultValue) {

			if (this.properties.hasOwnProperty(value)) {
				return this.properties[value];
			}
			return defaultValue;
		}
	};
}());
