TechnicalTest.module('Base', function (Base, App, Backbone, Marionette) {
    'use strict';

    Base.Collection = Backbone.Collection.extend({
        constructor: function (options) {
            this.cid = _.uniqueId('c');
            Base.Collection.__super__.constructor.call(this, options);
        }
    });

});

