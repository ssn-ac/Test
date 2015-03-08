TechnicalTest.module('Utilities', function (Utilities, App, Backbone, Marionette, $, _) {
    'use strict';

    _.extend(App, {
        navigate: function (route, options) {
            options = options || {};
            Backbone.history.navigate(route, options);
        }
    });

});