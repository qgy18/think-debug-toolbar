"use strict";

var path = require('path');

module.exports = {
	name: 'session',
	template: path.join(__dirname, 'template.jade'),

	prepareData: function(app, settings) {
		var instance = this;

		think.session(app);
		var session = app._session;
		var defer = think.defer();

		session.getData().then(function(data) {
			instance.sessionData = data;
			instance.session = session;
			defer.resolve();
		});

		return defer.promise;
	},

	process: function(app, settings) {
		var res = app.res;

		var data = {
			'session data' : this.sessionData,
			'session info' : this.session,
		};

		return {
			locals : { data : data }
		};
	}
};