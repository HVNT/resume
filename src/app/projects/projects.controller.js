/**
 * Created with WebStorm.
 * User: hunt
 * Date: 3/25/16
 * Time: 1:26 PM
 * File:
 */
angular.module('hb.app')
    .controller('ProjectsCtrl',
        function ($scope, ProjectsStates) {

            $scope.setActiveNav('projects');

        });