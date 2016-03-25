/**
 * Created with WebStorm.
 * User: hunt
 * Date: 3/25/16
 * Time: 1:06 PM
 * File:
 */
angular.module('hb.app')
    .controller('AppCtrl',
        function ($scope, $state, $timeout, $rootScope, $filter, $location, hotkeys) {
            var app = this;

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
                dashboard: {
                    title: 'Home',
                    //state: DashboardStates.root,
                    //includes: DashboardStates.root,
                    icon: 'fa fa-home fa-lg',
                    savedState: null
                }
            };

            //
            //$scope.openMainSidebar = function () {
            //    $scope.isMainSidebarActive = true;
            //};
            //
            //$scope.closeMainSidebar = function () {
            //    $scope.isMainSidebarActive = false;
            //};

            $scope.mainLogo = {};

            $scope.activeNav = null;

            $scope.navBlocks = [
                [navStates.dashboard]
            ];

            $scope.navigateTo = function (nav) {
                $scope.closeMainSidebar();

                $timeout(function () {
                    if (nav == $scope.activeNav) {
                        $state.go(nav.state);
                    } else if (nav.savedState) {
                        $state.go(nav.savedState, nav.savedStateParams);
                    } else {
                        $state.go(nav.state);
                    }
                }, 400);
            };

            $scope.setActiveNav = function (key) {
                $scope.activeNav = navStates[key];
            };

            $scope.setSavedState = function (navSection, state, stateParams) {
                $scope.activeNav = navStates[navSection];

                if ($scope.activeNav) {
                    $scope.activeNav.savedState = state;
                    $scope.activeNav.savedStateParams = stateParams;
                }
            };

            $scope.$on('$stateChangeSuccess', function (e, toState, toStateParams, fromState, fromStateParams) {
                var navSection = toState.name.split('.')[1];
                $scope.setSavedState(navSection, toState.name, toStateParams);
            });

            //$scope.goTemplates = function (stateName, stateParams) {
            //    $state.go(TemplatesStates[stateName] || TemplatesStates.root, stateParams);
            //};
            //
            //$scope.goCampaigns = function (state, params) {
            //    $state.go(CampaignsStates[state] || CampaignsStates.list, params);
            //};

            hotkeys.bindTo($scope)
                .add({
                    combo: ['esc'],
                    description: 'Close main sidebar',
                    callback: function (event) {
                        event.preventDefault();
                        $scope.closeMainSidebar();
                    }
                })
        });