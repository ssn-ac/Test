TechnicalTest.module('People.Edit', function (Edit, App, Backbone, Marionette, $, _) {
    'use strict';

    Edit.Controller = App.Base.Controller.extend({
        initialize: function (options) {
            this.person = App.request('person:model', options.id);
            this.view = App.request('person:view', this.person);
            this.listenTo(this.person, 'updated', _.bind(this.personSaved, this));
            this.listenTo(this.view, 'cancel:btn:clicked', this.showListPeople);
            this.show(this.view, { region: this.region, loading: [this.person,this.person.colours] });
        }
    });

    Edit.Controller.prototype.personSaved = function(model) {
        var msg = model.fullName() + ' record saved.';
        App.execute('notify:success', msg);

        this.showListPeople();
    }

    Edit.Controller.prototype.showListPeople = function () {
        App.vent.trigger('list:people');
    }
});