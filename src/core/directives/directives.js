/**
 * Created with WebStorm.
 * User: hunt
 * Date: 9/16/15
 * Time: 2:44 PM
 * File:
 */
angular.module('hb.directives', [])
    .factory('hbFillHeight', function ($position, $window) {
        return function (property, element, offset) {
            element.css(property, ($window.innerHeight - $position.offset(element).top - (offset || 0)) + 'px');
        }
    })
    .directive('fillHeight', function (hbFillHeight, $window, $rootScope, $timeout) {
        return {
            restrict: 'AC',
            priority: 0,
            link: function (scope, element, attrs) {
                var window = angular.element($window),
                    offset = scope.$eval(attrs.fillHeight) || 0,
                    property = attrs.fillHeightMax ? 'max-height' : 'height';

                function fillHeight () {
                    hbFillHeight(property, element, offset);
                }

                window.on('resize', _.debounce(fillHeight, 10));
                $rootScope.$on('$includeContentLoaded', fillHeight);
                $rootScope.$on('$stateEnterTransitionComplete', fillHeight);

                fillHeight();

                scope.$watch(function () {
                    return element[0].offsetTop;
                }, fillHeight);

                $timeout(fillHeight, 0)
            }
        }
    })
    .directive('fillBackground', function () {
        return {
            scope: {
                color: '=fillBackground'
            },
            link: function (scope, element, attrs) {
                var color = scope.color;

                function setBackgroundColor() {
                    if (color) element.css({background: color});
                }
                setBackgroundColor();
            }
        }
    })
    .directive('urlBackground', function () {
        return {
            link: function (scope, element, attrs) {
                var url = scope.$eval(attrs.urlBackground);

                function setBackgroundUrl(url) {
                    if (url) {
                        element.css({
                            'background-image': 'url(' + url +')',
                            'background-size' : '40px 40px'
                        });
                    }
                }
                setBackgroundUrl(url);

                scope.$watch(attrs.urlBackground, function (newBG) {
                    var url = scope.$eval(attrs.urlBackground);
                    setBackgroundUrl(url);
                });
            }
        }
    });