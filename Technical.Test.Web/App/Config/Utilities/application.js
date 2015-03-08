TechnicalTest.module('Utilities', function (Utilities, App, Backbone, Marionette, $, _) {
        'use strict';
        _.extend(App, {
            startApp: function () {
                var route = this.getCurrentRoute() || this.rootRoute;
                this.startHistory();
                this.navigate(route, {
                    trigger: true
                });
            },
            getCurrentRoute: function () {
                var frag = Backbone.history.fragment;
                if (_.isEmpty(frag)) return null;
                else return frag;
            },
            startHistory: function () {
                if (Backbone.history) Backbone.history.start({ pushState: true, silent: true });
            },
            rootRoute: '#people'
        });
    });

