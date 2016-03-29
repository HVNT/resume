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
                abstract: true,
                controller: 'ProjectsCtrl'
            })
            .state('app.projects.list', {
                url: '',
                templateUrl: '/app/projects/views/projects.list.html',
                controller: 'ProjectsListCtrl'
            })
            .state('app.projects.list.project', {
                url: '/:projectState',
                templateUrl: '/app/projects/views/projects.list.project.html',
                controller: 'ProjectsListProjectCtrl'
            });
    })
    .service('ProjectsStates', function (BaseState) {
        var root = BaseState + '.projects';

        return {
            root: root,
            list: root + '.list',
            project: root + '.list.project'
        }
    });