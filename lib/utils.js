"use strict";

var utils = module.exports = {
	// inject toolbar into html output in the semantically proper place
	inject_toolbar: function(str, toolbar) {
		var location = str.lastIndexOf('</body');

		if (location === -1) {
			location = str.lastIndexOf('</html');
		}

		if (location === -1) {
			str += toolbar;
		} else {
			str = str.substring(0, location) + toolbar + str.substring(location);
		}
		return str;
	}
};