/**
 * Created with WebStorm.
 * User: hunt
 * Date: 3/25/16
 * Time: 1:02 PM
 * File:
 */
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () {
};

angular.module('hb.app', [
    'ngAnimate',
    'ngMessages',
    'cfp.hotkeys',
    'chieffancypants.loadingBar',
    'ui.router',
    'hb.core',
    'hb.config'
]);