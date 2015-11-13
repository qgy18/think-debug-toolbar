"use strict";
var path = require('path'),
	xtend = require('xtend');

module.exports = {
	name: 'config',
	template: path.join(__dirname, 'template.jade'),

	process: function(app, settings) {
		return {
			locals: {
				data: app._config
			}
		};
	}
};