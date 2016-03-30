/**
 * Created with WebStorm.
 * User: hunt
 * Date: 3/29/16
 * Time: 12:06 PM
 * File:
 */
angular.module('hb.core')
    .factory('Project', function ($http, $q) {
        return function (data) {
            data = data || {};

            this.key = data.key || null;
            this.title = data.title || 'Untitled Project';
            this.subtitle = data.subtitle || '';
            this.body = data.body || '';
            this.for = data.for || '';
            this.forUrl = data.forUrl || '';
            this.forLogoUrl = data.forLogoUrl || '';
            this.involved = data.involved || '';
            this.dateBegin = data.dateBegin || '';
            this.dateEnd = data.dateEnd || '';

            var self = this;
            var _prototype = prototype();
            angular.extend(this, {

            });


            function prototype () {
                return {

                }
            }
        }
    });