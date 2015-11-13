"use strict";

var panels = module.exports,
	path = require('path'),
	jade = require('jade'),
	fs = require('fs'),
	loaded_panels = [],

	// compiled jade templates
	cached_panels = {};

panels.load = function(_panels, settings) {
	loaded_panels = [];
	cached_panels = {};

	settings.mixin_path = path.resolve(path.join(__dirname, '..', 'templates', 'mixins.jade'));

	_panels.forEach(function (panel) {
		try {
			var tmp = require('./' + panel);
			loaded_panels.push(tmp)
		} catch (e) {
			console.error('TDT: Error loading builtin panel ' + panel, e);
		}
	});

	loaded_panels.forEach(function (panel) {
		var tmpl = fs.readFileSync(panel.template, 'utf-8');
		tmpl = 'include ' + path.relative(path.dirname(panel.template), settings.mixin_path) + '\n\n' + tmpl;
		cached_panels[panel.template] = jade.compile(tmpl, {filename: panel.template});
	});
};

panels.prepareData = function(app, settings) {
	var defer = think.defer();
	var promises = [];

	loaded_panels.forEach(function (panel) {
		if(panel.prepareData) {
			promises.push(panel.prepareData(app, settings));
		}
	});

	if(promises.length) {
		Promise.all(promises).then(function() {
			defer.resolve();
		});
	} else {
		defer.resolve();
	}

	return defer.promise;
}

panels.render = function(locals, settings) {
	var rendered = [];

	for (var i = 0; i < loaded_panels.length; i++) {
		var panel = loaded_panels[i];
		var result = panel.process(locals);
		result.locals._settings = settings;

		rendered.push({
			html: cached_panels[panel.template](result.locals),
			name: panel.name
		});
	}

	return rendered;
};