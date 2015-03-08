TechnicalTest.module('Views', function (Views, App, Backbone, Marionette, $, _) {
    'use strict';

    var _remove = Marionette.View.prototype.remove;

    _.extend(Marionette.View.prototype, {
        remove: function () {
            var args = arguments.length > 0 ? [].slice.call(arguments, 0) : [];
            return _remove.apply(this, args);
        },
        toggleLoader: function (show) {
            if (show) return this.$el.toggleWrapper(true, { backgroundColor: 'rgba(255, 255, 255, 0.5)' });
            return this.$el.toggleWrapper(false);
        }
    });

    Backbone.Marionette.View.prototype.mixinTemplateHelpers = function (target) {
        var self = this;
        var templateHelpers = Marionette.getOption(self, "templateHelpers");
        var result = {};

        target = target || {};

        if (_.isFunction(templateHelpers)) {
            templateHelpers = templateHelpers.call(self);
        }

        _.each(templateHelpers, function (helper, index) {
            if (_.isFunction(helper)) {
                result[index] = helper.call(self);
            } else {
                result[index] = helper;
            }
        });

        return _.extend(target, result);
    };

});

