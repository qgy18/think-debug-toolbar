"use strict";

var path = require('path');
var xtend = require('xtend');

module.exports = {
	name: 'view',
	template: path.join(__dirname, 'template.jade'),

	process: function(app, settings) {
		var viewData = {};
		var excludeKey = ['controller', 'http', 'view', 'config'];

		for(var key in app._view.tVar) {
			if(excludeKey.indexOf(key) === -1) {
				viewData[key] = app._view.tVar[key];
			}
		}

		return {
			locals: {
				data: viewData
			}
		};
	}
};