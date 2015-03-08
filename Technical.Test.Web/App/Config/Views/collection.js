TechnicalTest.module('Views', function (Views, App, Backbone, Marionette, $, _) {
    'use strict';

    Views.CollectionView = Marionette.CollectionView.extend({
        itemViewEventPrefix: "childview"
    });

});

