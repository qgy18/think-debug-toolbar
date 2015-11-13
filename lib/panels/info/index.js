"use strict";

var path = require('path');

module.exports = {
	name: 'info',
	template: path.join(__dirname, 'template.jade'),

    process: function(app, settings) {
		var res = app.res;

		var common = {};
		var keys = ['version', 'env', 'mode', 'module', 'THINK_LIB_PATH', 'THINK_PATH', 'APP_PATH', 'RESOURCE_PATH', 'ROOT_PATH', 'autoCompile', 'lang'];

		keys.forEach(function(key) {
			common[key] = think[key];
		});

		var modes = {
			0x0001 : 'mode_mini',
			0x0002 : 'mode_normal',
			0x0004 : 'mode_module',
		};

		common.mode += ' ('+ modes[common.mode] +')';

		var data = {
			'thinkjs info' : common,
		};

		return {
			locals : { data : data }
		};
	}
};