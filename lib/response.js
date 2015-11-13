"use strict";

var fs = require('fs');
var path = require('path');
var jade = require('jade');

var utils = require('./utils');
var panels = require('./panels');

var response = module.exports = {};
var template = path.join(__dirname, 'templates', 'toolbar.jade');

response.render = function (app, settings, str, callback) {
	var opts = {
		req			: app.req,
		settings    : settings,
		extra_attrs : settings.extra_attrs,
		panels      : panels.render(app, settings)
	};

	jade.renderFile(template, opts, function (err, toolbar) {
		callback(err, err ? undefined : utils.inject_toolbar(str, toolbar));
	});
};