"use strict";

var path = require('path');

module.exports = {
	name: 'request',
	template: path.join(__dirname, 'template.jade'),

	process: function(app, settings) {
		var req = app.req;

		if(req.rawHeaders) {
			var rawHeaders = req.rawHeaders;
			req.rawHeaders = [];
			for(var i = 0; i < rawHeaders.length; i+=2) {
				req.rawHeaders.push(rawHeaders[i] + ': ' + rawHeaders[i+1]);
			}
		}

		var data = {
			common : {
				url : app.url,
				pathname : app.pathname,
				'method / version' : app.method + ' / ' + app.version,
				'host / hostname' : app.host + ' / ' + app.hostname,
			},
			router : {
				module : app.module,
				controller : app.controller,
				action : app.action,
			},
			query : app.query,
			get : app._get,
			post : app._post,
			cookie : app._cookie,
			file : app._file,
			headers : req.headers,
			rawHeaders : req.rawHeaders,
		};

		return {
			locals : { data : data }
		};
	}
};