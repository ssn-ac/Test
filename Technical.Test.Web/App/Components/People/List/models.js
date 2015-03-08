TechnicalTest.module('People.List', function (List, App, Backbone, Marionette, $, _) {
    'use strict';

    List.PersonModel = App.Base.Model.extend({
        computed: {
            colourList: function () {
                var list = _.map(this.get("colours"), function (item) {
                    return item.name;
                });

                if (list.length === 0) return 'No colours selected!!!';

                return list.join(', ');
            },
            palindrome: function() {
                var name = this.get('firstName') + this.get('lastName');
                var value = name.isPalindrome();
                return computedBool(value);
            },
            authorised: function() {
                var value = this.get('isAuthorised');
                return computedBool(value);
            },
            enabled: function() {
                var value = this.get('isEnabled');
                return computedBool(value);
            }
        }
    });

    List.PeopleCollection = App.Base.Collection.extend({
        url: '/api/people',
        model: List.PersonModel
    });

});

function computedBool(input) {
    return {
        text: input ? 'Yes' : 'No',
        className: input ? 'text-success' : 'text-danger'
    }
}

