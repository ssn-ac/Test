TechnicalTest.module('People.List', function (List, App, Backbone, Marionette, $, _) {
    'use strict';

    List.PersonView = Marionette.ItemView.extend({
        template: 'components/people/list/templates/_person',
        tagName: 'tr',
        triggers: {
            'click a': 'clicked'
        }
    });

    List.PeopleView = Marionette.CompositeView.extend({
        template: 'components/people/list/templates/people',
        itemView: List.PersonView,
        tagName: 'table',
        className: 'table'
    });

});