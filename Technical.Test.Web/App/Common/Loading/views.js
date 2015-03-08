TechnicalTest.module('Common.Loading', function(Loading, App, Backbone, Marionette, $, _) {
    'use strict';

    Loading.LoadingView = App.Views.ItemView.extend({
        template: false,
        className: 'loading-container full-height'
    });

});