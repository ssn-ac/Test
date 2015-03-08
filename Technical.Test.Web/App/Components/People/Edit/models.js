TechnicalTest.module('People.Edit', function (Edit, App, Backbone, Marionette, $, _) {
    'use strict';

    Edit.PersonModel = App.Base.Model.extend({
        initialize: function (id) {
            if (id) this.id = id;
        },
        url: function () {
            if (this.id) return '/api/people/' + this.id;
            return '/api/people/';
        },
        computed: {
            selectedColours: function () {
                var self = this;
                var colours = _.map(self.colours.toJSON(), function (item) {
                    item.selected = _.findWhere(self.get('colours'), { 'id': item.id }) ? true : false;
                    return item;
                });
                return colours;
            },
            palindrome: function () {
                var name = (this.get('firstName') + this.get('lastName'));
                return name.isPalindrome();
            },
            title: function() {
                return 'Edit ' + this.fullName();
            },
        },
        fullName: function() {
            return this.get('firstName') + ' ' + this.get('lastName');
        },
        mapColours: function(data) {
            var colours = [], self = this;
            _.each(data.colours, function (id) {
                if (!_.isString(id)) return;
                var colour = _.findWhere(self.colours.models, { id: Number(id) });
                if(colour)
                    colours.push({ id: colour.get('id'), name: colour.get('name') });
            });
            data.colours = colours;
        }
    });

    Edit.PeopleCollection = App.Base.Collection.extend({
        url: '/api/people',
        model: Edit.PersonModel
    });

    Edit.ColourCollection = App.Base.Collection.extend({
        url: '/api/colours'
    });

    App.reqres.setHandler('person:model', function (id) {
        var person = new Edit.PersonModel(id);
        person.colours = new Edit.ColourCollection();
        return person;
    });

    App.reqres.setHandler('person:collection', function () {
        return new Edit.PeopleCollection();
    });


});


