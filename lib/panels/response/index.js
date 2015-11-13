"use strict";

var path = require('path');

module.exports = {
	name: 'response',
	template: path.join(__dirname, 'template.jade'),

	process: function(app, settings) {
		var res = app.res;

		var data = {
			sendCookie : app._sendCookie,
			headers : res._headers,
		};

		return {
			locals : { data : data }
		};
	}
};