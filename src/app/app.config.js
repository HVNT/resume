/**
 * Created with WebStorm.
 * User: hunt
 * Date: 3/25/16
 * Time: 1:03 PM
 * File:
 */
angular.module('hb.app')
    .value('BaseState', 'app')
    .config(function ($locationProvider, $stateProvider, $urlRouterProvider,
                      cfpLoadingBarProvider, $httpProvider, hotkeysProvider) {

        //$locationProvider.html5Mode(true);
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $httpProvider.useApplyAsync(true);

        hotkeysProvider.includeCheatSheet = true;
        hotkeysProvider.template = '<div class="cheatsheet fade" ng-class="{in: helpVisible}" style="display: none;">\n    <div class="cheatsheet__close close" ng-click="toggleCheatSheet()" rv-s-pxy="md">\n        <i class="fa fa-times fa-lg" rv-t-font="h2"></i>\n    </div>\n    <div class="cheatsheet__cell">\n        <h4 rv-t-font="h2 small-caps bold center" rv-c-text="i1" rv-s-mb="8">{{ title }}</h4>\n        <table rv-s-col="12">\n            <tbody>\n            <tr ng-repeat="hotkey in hotkeys | filter:{ description: \'!$$undefined$$\' }">\n                <td rv-s-pxy="2" rv-s-col="6" rv-t-font="right" rv-s-mb="4">\n                    <span ng-repeat="key in hotkey.format() track by $index" rv-s-pxy="3" class="cheatsheet__key">\n                        <span rv-c-text="1" rv-t-font="h4 small-caps">{{ key }}</span>\n                    </span>\n                </td>\n                <td rv-t-font="p" rv-c-text="i1" rv-s-pxy="2" rv-s-col="6" rv-s-mb="4">{{ hotkey.description }}</td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n</div>'

        $urlRouterProvider
            .when('/', '/app')
            .when('', '/app')
            .otherwise('/app');

        $stateProvider
            .state('app', {
                url: '/app',
                controller: 'AppCtrl as app',
                templateUrl: '/app/app.html',
                resolve: {
                    Projects: function ($http, $q, Project) {
                        var defer = $q.defer();
                        var projects = {};

                        $http.get('/assets/json/projects.json')
                            .then(function (response) {
                                var data = response ? response.data : [];
                                if (data.length) {
                                    for (var i = 0; i < data.length; i++) {
                                        projects[data[i].key] = new Project(data[i]);
                                    }
                                }

                                defer.resolve(projects);
                            }, function (err) {     // TODO handle
                                defer.reject(err);
                            });

                        return defer.promise;
                    }
                }
            });

        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 200;
    })
    .run(function ($rootScope, $state, $log, $window, $timeout, $sce, $filter) {

        $rootScope.$sce = $sce;

        $rootScope.translatePx = function (val) {
            return val + 'px';
        };

        $rootScope.translatePercentage = function (value) {
            return value + '%';
        };

        $rootScope.translateRelativePercentage = function (value) {
            return value > 0 ? '+' + value + '%' : value + '%';
        };

        $rootScope.translateSecondsToDate = function (value) {
            return $filter('date')(value, 'shortDate')
        };

        $rootScope.translateDuration = function (value) {
            return $filter('date')($filter('secondsToDateTime')(value), 'HH:mm:ss')
        };

        $rootScope.delayedHover = function (item, delay) {
            delay = angular.isNumber(delay) ? delay : 1000;

            $timeout.cancel(item.$$hoverPromise);
            $timeout.cancel(item.$$cancelPromise);
            item.$$hoverPromise = $timeout(function () {
                item.$$isHovering = true;
                delete item.$$cancelPromise;
                delete item.$$hoverPromise;
            }, delay);
        };

        $rootScope.cancelHover = function (item, delay) {
            delay = angular.isNumber(delay) ? delay : 0;

            $timeout.cancel(item.$$hoverPromise);
            $timeout.cancel(item.$$cancelPromise);
            item.$$cancelPromise = $timeout(function () {
                item.$$isHovering = false;
                delete item.$$cancelPromise;
                delete item.$$hoverPromise;
            }, delay);
        };

        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                //restore all query string parameters back to $location.search
                $log.error("$stateChangeError", error, event, toState, toParams, fromState, fromParams);
            });
    });