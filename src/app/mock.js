/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 4:27 PM
 * File: /app/mock.js
 */

angular.module('hb.mock', ['hb.app', 'ngMockE2E'])
    .run(['$httpBackend', '$timeout', '$log', function ($httpBackend, $timeout, $log) {

        $httpBackend.whenGET(/\.json/).respond(
            function (method, url, data, headers) {
                var projects = [];

                function success (response) {
                    projects = response;
                }

                // Need to do synchronous ajax call for json data to be available during resolve
                $.ajax({
                    url: '/assets/json/projects.json',
                    async: false,
                    success: success
                });



                return [200, projects, {}];
            });

        $httpBackend.whenGET(/views\//).passThrough();
        $httpBackend.whenGET(/\.html/).passThrough();
        //$httpBackend.whenGET(/\.json/).passThrough();

    }]);

angular.bootstrap(document, ['hb.mock']);
