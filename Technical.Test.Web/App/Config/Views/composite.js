TechnicalTest.module('Views', function (Views, App, Backbone, Marionette, $, _) {
    'use strict';

    Views.CompositeView = Marionette.CompositeView.extend({
        itemViewEventPrefix: "childview"
    });

});

