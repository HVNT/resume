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

            //TODO add pipelined processor
            //TODO dateBegin dateEnd
            var projectsNav = {
                assetManager: {
                    key: 'assetManager',
                    title: 'Asset Manager'
                },
                fileAttacher: {
                    key: 'fileAttacher',
                    title: 'File Attacher'
                },
                visualizations: {
                    key: 'visualizations',
                    title: 'Visualizations'
                },
                analytics: {
                    key: 'analytics',
                    title: 'Analytics Reports'
                },
                reliableTransferSuite: {
                    key: 'reliableTransferSuite',
                    title: 'Reliable Transfer Suite'
                },
                jos: {
                    key: 'jos',
                    title: 'JOS'
                },
                geoNews: {
                    key: 'geoNews',
                    title: 'Geo News'
                },
                toma: {
                    key: 'toma',
                    title: 'TOMA' //Trackable Offline Marketing Automation
                },
                mentalDisorders: {
                    key: 'mentalDisorders',
                    title: 'mentaldisorders.com'
                },
                backpack: {
                    key: 'backpack',
                    title: 'Backpack'
                }
            };

            $scope.projects = [
                projectsNav.assetManager,
                projectsNav.visualizations,
                projectsNav.analytics,
                projectsNav.toma,
                projectsNav.fileAttacher,
                projectsNav.mentalDisorders
            ];

            $scope.schoolProjects = [
                projectsNav.jos,
                projectsNav.reliableTransferSuite,
                projectsNav.geoNews,
                projectsNav.backpack
            ];

            $scope.setActiveNav('projects');

        })
    .controller('ProjectsListCtrl',
        function () {

        })
    .controller('ProjectsListProjectCtrl',
        function () {

        });