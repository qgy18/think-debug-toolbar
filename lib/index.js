"use strict";

var path = require('path'),
	xtend = require('xtend'),
	panels = require('./panels'),
	response = require('./response');

var defaults = {
	panels: ['request', 'session', 'view', 'template', 'response', 'config', 'info'],
	depth: 4,
	extra_attrs: '',
	disabled: false,
	sort: false
};

/**
 * middleware
 */
module.exports = function(conf) {
	var settings = xtend(defaults, conf || {});

	panels.load(settings.panels, settings);

	return function(app, content) {
		//非开发环境，直接返回
		if(think.env !== 'development') {
			return;
		}

		//临时禁用，直接返回
		if(settings.disabled) {
			return;
		}

		//非HTML类请求，直接返回
		if((app.req.headers.accept || '').indexOf('html') === -1) {
			return;
		}

		//如果 content 来自于 fetch 方法，直接返回
		if(app._view && app._view.tVar._isFetch) {
			return;
		}
		
		//ajax 或者 jsonp，直接返回
		if(app.isAjax() || app.isJsonp()) {
			return;
		}

		//没有 content，直接返回
		if(typeof content !== 'string') {
			return;
		}

		//XML，直接返回
		var str = content.substr(0, 100).trim().toLowerCase();
		if(str[0] != '<' || str.indexOf('<?xml') === 0) {
			return;
		}

		//已经运行过，直接返回
		if(app._think_debug_toolbar_inited) {
			return;
		}

		app._think_debug_toolbar_inited = true;

		return panels.prepareData(app, settings).then(function() {
			var defer = think.defer();

			response.render(app, settings, content, function(err, str) {
				defer.resolve(str);
			});

			return defer.promise;
		});
	}
};