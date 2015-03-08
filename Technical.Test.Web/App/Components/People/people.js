TechnicalTest.module('People', function (People, App, Backbone, Marionette, $, _) {
    'use strict';

    var router = Marionette.AppRouter.extend({
        appRoutes: {
            'people/:id': 'edit',
            'people'    : 'list'
        }
    });

    var api = (function () {

        var
            edit = function (id) {
                return new People.Edit.Controller({ region: App.mainRegion, id: id });
            },
            list = function () {
                return new People.List.Controller({ region: App.mainRegion });
            };

        return {
            edit: edit,
            list: list
        };
    })();

    App.vent.on('edit:person', function (id) {
        App.navigate('/people/' + id);
        return api.edit(id);
    });

    App.vent.on('list:people', function () {
        App.navigate('/people');
        return api.list();
    });

    App.addInitializer(function () {
        return new router({ controller: api });
    });

});

