TechnicalTest.module('Utilities', function (Utilities, App, Backbone, Marionette, $, _) {
    'use strict';
    App.commands.setHandler('when:fetched', function (entities, callback, options) {

        var xhrs = _.chain(_.isArray(entities) ? entities : [entities])
                    .compact()
                    .uniq(function (item) { return item.cid; })
                    .invoke('fetch')
                    .value();

        return $.when.apply($, xhrs).done(function () {
            return callback();
        });
    });

});

