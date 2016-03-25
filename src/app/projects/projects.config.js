/**
 * Created with WebStorm.
 * User: hunt
 * Date: 3/25/16
 * Time: 1:26 PM
 * File:
 */
angular.module('hb.app')
    .config(function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider
            .when('/app/projects/', '/app/projects');

        $stateProvider
            .state('app.projects', {
                url: '/projects',
                templateUrl: '/app/projects/views/projects.html',
                controller: 'ProjectsCtrl'
            });
    })
    .service('ProjectsStates', function (BaseState) {

        return {
            root: BaseState + '.projects'
        }
    });