/**
 * Created with JetBrains WebStorm.
 * User: hbrennick
 * Date: 4/24/13
 * Time: 8:32 PM
 * File: /core/config/prod.js
 */

'use strict';

angular.module('hb.config', [])
    .config(function ($logProvider) {
        $logProvider.debugEnabled(false);
    })
    .factory('Environment', function () {
        var url = {
            prod: '',
            dev: '',
            remote: '',
            test: ''
        };

        return {
            name: 'prod',
            path: url.prod,
            config: {}
        };
    });