(function (root, factory, undef) {
    'use strict';

    root.returnExportsGlobal = factory(root._, root.Backbone);

}(this, function (_, Backbone, root, undef) {
    'use strict';

    Backbone = Backbone === undef ? root.Backbone : Backbone;
    _ = _ === undef ? root._ : _;

    var Computed = function () { },
        oldGet = Backbone.Model.prototype.get,
        oldToJson = Backbone.Model.prototype.toJSON;

    Computed.prototype.computed = {};

    Computed.prototype.get = function (attr) {
        var isComputed = this.computed !== undef;

        if (isComputed === true && _.isFunction(this.computed[attr]) === true) {
            return this.computed[attr].call(this);
        }

        if (isComputed === true && _.isObject(this.computed[attr]) === true && _.isFunction(this.computed[attr].get) === true) {
            return this.computed[attr].get.call(this);
        }

        return oldGet.call(this, attr);
    };

    Computed.prototype.toJSON = function (options) {
        var attr = oldToJson.call(this),
            isSaving = _.has(options || {}, 'emulateHTTP');

        if (isSaving) return attr;

        _.each(this.computed, _.bind(function (mutator, name) {
            if (_.isObject(this.computed[name]) === true && _.isFunction(this.computed[name].get)) {
                if (!isSaving) {
                    attr[name] = _.bind(this.computed[name].get, this)();
                }
            } else {
                attr[name] = _.bind(this.computed[name], this)();
            }
        }, this));

        return attr;
    };

    Computed.prototype.escape = function (attr) {
        var val = this.get(attr);
        return _.escape(val == null ? '' : '' + val);
    };

    _.extend(Backbone.Model.prototype, Computed.prototype);

    Backbone.Computed = Computed;
    return Computed;
}));