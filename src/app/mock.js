/**
 * Created with JetBrains WebStorm.
 * User: apledger
 * Date: 4/24/13
 * Time: 4:27 PM
 * File: /app/mock.js
 */

angular.module('hb.mock', ['hb.app', 'ngMockE2E'])
    .run(['$httpBackend', '$timeout', '$log', function ($httpBackend, $timeout, $log) {

        $httpBackend.whenGET(/views\//).passThrough();
        $httpBackend.whenGET(/\.html/).passThrough();

    }]);

angular.bootstrap(document, ['hb.mock']);
