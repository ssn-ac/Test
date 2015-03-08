TechnicalTest.module('Mixin.View', function (View, App, Backbone, Marionette, $, _) {
    'use strict';

    var defaultFormOptions = function (options) {
        var view = this;
        options = options || {};
        var result = _.defaults(options, {
            focusFirstInput: true,
            validation: {}
        });
        options.validation.errorClass = 'invalid';
        options.validation.highlight = function (element) {
            view.trigger('add:model:errors');
            var $element = $(element);
            if ($element.parent().hasClass('form-group') === false) return;
            $element.parent().addClass('has-error');
        };
        options.validation.unhighlight = function (element) {
            var $element = $(element);
            if ($element.parent().hasClass('has-error')) {
                view.trigger('remove:model:errors', $element.attr('name'));
            }
            if ($element.parent().hasClass('form-group') === false) return;
            $element.parent().removeClass('has-error');
        };
        if (this.validation && this.validation.errorPlacement)
            options.validation.errorPlacement = this.validation.errorPlacement;
        return result;
    };

    View.Form = {
        initialize: function () {
            var form = this.form || {};
            form.validation = this.model.validation || {};
            this.config = defaultFormOptions.call(this, form);
        },
        events: {
            'submit form': 'submitForm'
        },
        onShow: function () {
            var self = this;
            _.defer(function () {
                if (self.config.focusFirstInput) self.focusFirstInput();
                self.setupValidation();
            });
        },
        submitForm: function (e) {
            e.preventDefault();
            if (!this.ui.form.valid()) return;

            var data = Backbone.Syphon.serialize(this);
            var result = this.triggerMethod('form:submit', data);
            if (result !== false) {
                this.processForm(_.isObject(result) ? result : data, this.model);
            }
        },
        processForm: function (data, model) {
            model.save(data);
        },
        getLoadingImage: function () {
            if (!this.ui) return;
            if (!this.ui.loadingImage) return;
            return this.ui.loadingImage;
        },
        setupValidation: function () {
            this.validator = this.ui.form.validate(this.config.validation);
        },
        focusFirstInput: function () {
            $(':input:visible:enabled:first', this.$el).focus();
        }
    };

});

