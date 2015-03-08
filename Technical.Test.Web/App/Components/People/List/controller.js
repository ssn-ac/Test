TechnicalTest.module('People.List', function (List, App, Backbone, Marionette, $, _) {
    'use strict';

    List.Controller = App.Base.Controller.extend({
        initialize: function () {
            var collection = new List.PeopleCollection();
            var view = new List.PeopleView({ collection: collection });
            this.listenTo(view, 'itemview:clicked', _.bind(this.personClicked, this));
            this.show(view, { region: this.region, loading: [collection] });
        }
    });

    List.Controller.prototype.personClicked = function (childView, data) {
        App.vent.trigger('edit:person', data.model.get('id'));
    };

});