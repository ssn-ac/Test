TechnicalTest.module('Utilities', function (Utilities, App, Backbone, Marionette, $, _) {
    'use strict';

    _.extend(Marionette.Renderer, {
        render: function (template, data) {
            if (template === false) return null;
            if (_.isFunction(template)) template = template();
            var compiled = Marionette.TemplateCache.get(template);
            return compiled.render(data);
        }
    });

    Backbone.Marionette.TemplateCache.prototype.compileTemplate = function (html) {
        return Hogan.compile(html);
    };

    Backbone.Marionette.TemplateCache.prototype.loadTemplate = function (path) {
        var postfix = new Date().getTime();
        var result = $.ajax({ url: '/app/' + path + '.html?v=' + postfix, async: false, dataType: 'html' });
        if (responseIsValid(result.responseText)) return result.responseText;
        throw new Error('Template does not exist: ' + path);
    };

    var responseIsValid = function (text) {
        var responseText = text || "";
        var errorText = responseText.substring(0, 20).trim();
        return errorText.indexOf('<!DOCTYPE html>') === 0 ? false : true;
    };

});

