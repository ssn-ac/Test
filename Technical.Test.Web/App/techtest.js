TechnicalTest= (function (Backbone, Marionette, Cocktail) {

    Cocktail.patch(Backbone, Marionette);

    var app = new Marionette.Application();

    app.addRegions({
        mainRegion: '#main-region'
    });

    app.on('initialize:after', function () {
        if (Backbone.History.started) return;
        this.startHistory();
        var route = this.getCurrentRoute() || this.rootRoute;
        Backbone.history.loadUrl(route);
    });

    return app;

})(Backbone, Marionette, Cocktail);