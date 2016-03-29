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
            this.title = data.title || 'Untitle Project';
            this.body = data.body || '';
            this.for = data.for || '';
            this.forLogoUrl = data.forLogoUrl || '';
            this.involved = data.involved || '';
            this.dateBegin = data.dateBegin || '';
            this.dateEnd = data.dateEnd || '';

            this.$$projects = {};

            var self = this;
            var _prototype = prototype();
            angular.extend(this, {
                query: _prototype.query
            });


            function prototype () {
                return {
                    query: function () {
                        var defer = $q.defer();

                        $http.get('/assets/json/projects.json')
                            .then(function (response) {
                                var projects = response ? response.data : [];
                                if (projects.length) {
                                    for (var i = 0; i < projects.length; i++) {
                                        self.$$projects[projects[i].key] = new this.constructor(projects[i]);
                                    }
                                }
                                defer.resolve(response)
                            }, function (err) {     // TODO handle
                                defer.reject(err);
                            });

                        return defer.promise;
                    }
                }
            }
        }
    });