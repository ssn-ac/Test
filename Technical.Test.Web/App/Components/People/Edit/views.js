TechnicalTest.module('People.Common', function (Common, App, Backbone, Marionette, $, _) {
    'use strict';

    Common.PersonView = Marionette.ItemView.extend({
        template: 'components/people/edit/templates/person',
        ui: {
            form:'form'
        },
        triggers: {
            'click #btn-cancel': 'cancel:btn:clicked',
        },
        events: {
            'click [data-toggle]': 'toggleClicked'
        },
        toggleClicked: function(e) {
            var selector = e.currentTarget.dataset.toggle;
            $('#' + selector).toggle();
        },
        onFormSubmit: function(data) {
            this.model.mapColours(data);
            return data;
        },
        mixins: [App.Mixin.View.Form]
    });

    App.reqres.setHandler('person:view', function (person) {
        return new Common.PersonView({ model: person });
    });

});


