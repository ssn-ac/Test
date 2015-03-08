TechnicalTest.module('Base', function (Base, App, Backbone, Marionette) {
    'use strict';

    Base.Controller = Marionette.Controller.extend({
        constructor: function (options) {
            options = options || {};
            this._closed = false;
            this.region = options.region;
            Base.Controller.__super__.constructor.call(this, options);
        }
    });

    Base.Controller.prototype.show = function (view, options) {
        options = _.defaults(options || {}, { loading: false });
        if (this._closed === true || !options.region) {
            return;
        }
        this.setMainView(view);
        this.manageView(view, options);
    };

    Base.Controller.prototype.setMainView = function (mainView) {
        if (this.mainView) return;
        this.mainView = mainView;
        this.listenTo(mainView, 'close', this.close);
    };

    Base.Controller.prototype.manageView = function (view, options) {
        if (options.loading) {
            App.execute('show:loading', view, options);
        } else {
            options.region.show(view);
        }
    };

    App.commands.setHandler('show:loading', function (view, options) {
        return new Base.Controller({
            view: view,
            region: options.region,
            config: options.loading
        });
    });

});

