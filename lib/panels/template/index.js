"use strict";
var path = require('path'),
    fs = require('fs');


module.exports = {
    name: 'template',
    template: path.join(__dirname, 'template.jade'),

    process: function(app, settings) {
        var templateName = app.tpl_file || '';
        var templateContent = '';

        if(templateName) {
            try {
                templateContent = fs.readFileSync(templateName, 'utf-8');
            } catch (e) {
                templateContent = 'Could not load template.' + e;
            }
        }

        var data = {
            'view config' : think.config('view'),
        };

        return {
            locals: {
                data : data,
                template_name: templateName,
                template: templateContent
            }
        };
    }
};