/**
 * Created with WebStorm.
 * User: hunt
 * Date: 3/25/16
 * Time: 1:06 PM
 * File:
 */
angular.module('hb.app')
    .controller('AppCtrl',
        function ($scope, $state, $timeout, $rootScope, $filter, $location, hotkeys,
                  BioStates, ProjectsStates) {
            var app = this;

            $scope.hello = 'hello';

            $scope.$state = $state;
            $scope.initialized = true;

            $timeout(function () {
                $scope.isLoaded = true;
            }, 500);

            $scope.stopContext = function (evt) {
                evt.preventDefault();
            };

            $scope.modelDebounce = {
                debounce: 250,
                updateOn: 'blur default'
            };

            var navStates = {
                bio: {
                    title: 'Bio',
                    state: BioStates.root
                },
                resume: {
                    title: 'Resume',
                    state: null
                },
                projects: {
                    title: 'Projects',
                    state: ProjectsStates.root
                }
            };

            $scope.mainLogo = {};

            $scope.navs = [
                navStates.bio,
                navStates.resume,
                navStates.projects
            ];

            //hotkeys.bindTo($scope)
            //    .add({
            //        combo: ['esc'],
            //        description: 'Close main sidebar',
            //        callback: function (event) {
            //            event.preventDefault();
            //            $scope.closeMainSidebar();
            //        }
            //    })
        });