"use strict";

var path = require('path');
var fs = require('fs');

var thinkjsrc;

try {
	var content = fs.readFileSync('/Users/QuQu/Work/node/ququblog2/.thinkjsrc', 'utf-8');
	thinkjsrc = JSON.parse(content);
} catch(e) {
	thinkjsrc = false;
}

module.exports = {
	name: 'info',
	template: path.join(__dirname, 'template.jade'),

    process: function(app, settings) {
		var res = app.res;

		var common = {};
		var keys = ['version', 'env', 'mode', 'THINK_LIB_PATH', 'THINK_PATH', 'APP_PATH', 'RESOURCE_PATH', 'ROOT_PATH', 'autoCompile', 'lang', 'module', '.thinkjsrc'];

		keys.forEach(function(key) {
			common[key] = think[key] || {};
		});

		var modes = {
			0x0001 : 'mode_mini',
			0x0002 : 'mode_normal',
			0x0004 : 'mode_module',
		};

		common.mode += ' ('+ modes[common.mode] +')';

		if(thinkjsrc) {
			common['.thinkjsrc'] = thinkjsrc;
		} else {
			delete common['.thinkjsrc'];
		}

		var data = {
			'thinkjs info' : common,
		};

		return {
			locals : { data : data }
		};
	}
};