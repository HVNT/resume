/**
 * Created with WebStorm.
 * User: hunt
 * Date: 3/25/16
 * Time: 1:24 PM
 * File:
 */
angular.module('hb.app')
    .config(function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider
            .when('/app/bio/', '/app/bio');

        $stateProvider
            .state('app.bio', {
                url: '/bio',
                templateUrl: '/app/bio/views/bio.html',
                controller: 'BioCtrl'
            });
    });