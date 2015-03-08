TechnicalTest.module('Utilities', function (Utilities, App, Backbone, Marionette, $, _) {

    'use strict';

    var api = (function () {

        var toasts = [],
            success = function (text, options) {
                options = getOptions(options);
                toastr.success(text, 'Success', getOptions(options));
            },
            info = function (text, options) {
                options = getOptions(options);
                toastr.info(text, 'Info', getOptions(options));
            },
            warning = function (text, options) {
                options = getOptions(options);
                toastr.warning(text, 'Warning', getOptions(options));
            },
            error = function (text, options) {
                options = getErrorOptions(options);
                toastr.error(text, null, getOptions(options));
            },
            getOptions = function (options) {
                options = options || {};
                return _.defaults(options, {
                    timeOut: 8000,
                    positionClass: options.position ? 'toast-' + options.position : 'toast-bottom-right',
                    newestOnTop: false
                });
            },
            getErrorOptions = function (options) {
                options = options || {};
                return _.defaults(options, {
                    timeOut: 0,
                    extendedTimeOut: 0,
                    tapToDismiss: false,
                    closeButton: true
                });
            };

        return {
            success: success,
            info: info,
            warning: warning,
            error: error
        };

    })();

    App.commands.setHandler('notify:success', function (text, options) {
        api.success(text, options);
    });

    App.commands.setHandler('notify:info', function (text, options) {
        api.info(text, options);
    });

    App.commands.setHandler('notify:warning', function (text, options) {
        api.warning(text, options);
    });

    App.commands.setHandler('notify:error', function (text, options) {
        api.error(text, options);
    });

});


