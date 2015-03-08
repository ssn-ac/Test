TechnicalTest.module('Base', function (Base, App, Backbone, Marionette) {
    'use strict';

    Base.Model = Backbone.Model.extend({
        constructor: function (options) {
            Base.Model.__super__.constructor.call(this, options);
        },
        idAttribute: 'id'
    });

    Base.Model.prototype.destroy = function (options) {
        options = options || {};
        _.defaults(options, {
            wait: true,
            success: _.bind(this.destroySuccess, this, options),
            error: _.bind(this.destroyError, this, options)
        });
        if (options.view) options.view.toggleLoader(true);
        return Base.Model.__super__.destroy.call(this, options);
    };

    Base.Model.prototype.destroyError = function (model, options, a, b, c) {
        options = options || {}
        this.trigger("delete:error", this);
        if (options.view) options.view.toggleLoader(false);
    };

    Base.Model.prototype.destroySuccess = function (options, resp) {
        options = options || {};
        this.trigger("deleted", this);
        if (options.view) options.view.toggleLoader(false);
        return typeof callback === "function" ? callback() : void 0;
    };

    Base.Model.prototype.save = function(data, options) {
        options = options || {};
        var isNew = this.isNew();
        _.defaults(options, {
            wait: true,
            success: _.bind(this.saveSuccess, this, isNew, options.collection, options.callback),
            error: _.bind(this.saveError, this)
        });
        this.unset("_errors");
        var key, instance;
        for (key in this.attributes) {
            if(key.startsWith('_')) delete this.attributes[key];
        }
        return Base.Model.__super__.save.call(this, data, options);
    };

    Base.Model.prototype.saveSuccess = function(isNew, collection, callback) {
        if (isNew) {
            if (collection) collection.add(this);
            if (collection) collection.trigger("model:created", this);
            this.trigger("created", this);
        } else {
            if (collection === null) collection = this.collection;
            if (collection) collection.trigger("model:updated", this);
            this.trigger("updated", this);
        }
        return typeof callback === "function" ? callback() : void 0;
    };

    Base.Model.prototype.saveError = function (model, xhr, options) {
        this.trigger("save:error", this);
        this.callbackError(model, xhr, options);
    };

    Base.Model.prototype.callbackError = function (model, xhr, options) {
        var _ref;
        if (xhr.status === 403) {
            App.execute('toast:warning', 'You do not have the required permissions to perform the previous request.');
            return;
        }
        if (!/500|404|200/.test(xhr.status)) {
            this.set({
                _errors: (_ref = this.parseError(xhr.responseText)) !== null ? _ref : void 0
            });
            _.each(this.get('_errors'), function(item) {
                if(item.name === "") App.execute('toast:warning', item.message);
            });
        }
        if (this.loader) this.loader.remove();
    };

    Base.Model.prototype.parseError = function (responseText) {
        responseText = responseText || {};
        var response = $.parseJSON(responseText) || {};
        var errors = this.parseErrorModelState(response.modelState) || {};
        return errors;
    };

    Base.Model.prototype.parseErrorModelState = function (modelState) {
        modelState = modelState || {};
        var split, field, errors = [], keys = _.keys(modelState);
        for (var i = 0, len = keys.length; i < len; ++i) {
            split = keys[i].split('.');
            field = split.length > 1 ? split[1].toString().lowercaseFirstLetter() : split[0].toString().lowercaseFirstLetter();
            errors.push({ name: field, message: modelState[keys[i]][0] });
        }
        return errors;
    };

});


