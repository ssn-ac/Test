TechnicalTest.module('Common.Loading', function (Loading, App, Backbone, Marionette, $, _) {
    'use strict';
    Loading.Controller = App.Base.Controller.extend({
        initialize: function (options) {
            var view = options.view;
            this.loadingView = new Loading.LoadingView();
            this.show(this.loadingView, { region: this.region });
            this.showRealView(view, this.loadingView, options);
        }
    });

    Loading.Controller.prototype.showRealView = function (realView, loadingView, options) {
        var root = this;
        App.execute('when:fetched', options.loading, function () {
            if (!loadingView) return root.show(realView, { region: root.region });
            if (root.region.currentView !== loadingView) return realView.close();
            return root.show(realView, { region: root.region });
        });
    };

    Loading.Controller.prototype.getEntities = function (view, config) {
        config = (_.isArray(config)) ? config : [config.model, config.collection];
        var entities = _.chain([config, view.model, view.collection]).flatten().reject(_.isUndefined).reject(_.isNull).value();
        for (var key in view.entities) {
            var item = view.entities[key];
            if (!_.isFunction(item)) entities.push(item);
        }
        return entities;
    };

    App.commands.setHandler('show:loading', function (view, options) {
        return new Loading.Controller({
            view: view,
            region: options.region,
            loading: options.loading
        });
    });

    App.reqres.setHandler('loading:view', function () {
        return new Loading.LoadingView();
    });

});