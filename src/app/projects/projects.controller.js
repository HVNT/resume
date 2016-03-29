/**
 * Created with WebStorm.
 * User: hunt
 * Date: 3/25/16
 * Time: 1:26 PM
 * File:
 */
angular.module('hb.app')
    .controller('ProjectsCtrl',
        function ($scope) {

            $scope.setActiveNav('projects');

        })
    .controller('ProjectsListCtrl',
        function ($scope, $state, ProjectsStates) {

            //TODO add pipelined processor
            //TODO dateBegin dateEnd
            var projectsNav = {
                'asset-manager': {
                    key: 'assetManager',
                    state: 'asset-manager',
                    title: 'Asset Manager'
                },
                'file-attacher': {
                    key: 'fileAttacher',
                    state: 'file-attacher',
                    title: 'File Attacher'
                },
                visualizations: {
                    key: 'visualizations',
                    state: 'visualizations',
                    title: 'Visualizations'
                },
                analytics: {
                    key: 'analytics',
                    state: 'analytics',
                    title: 'Analytics Reports'
                },
                'reliable-transfer-suite': {
                    key: 'reliableTransferSuite',
                    state: 'reliable-transfer-suite',
                    title: 'Reliable Transfer Suite'
                },
                jos: {
                    key: 'jos',
                    state: 'jos',
                    title: 'JOS'
                },
                'geo-news': {
                    key: 'geoNews',
                    state: 'geo-news',
                    title: 'Geo News'
                },
                toma: {
                    key: 'toma',
                    state: 'toma',
                    title: 'TOMA' //Trackable Offline Marketing Automation
                },
                'mental-disorders': {
                    key: 'mentalDisorders',
                    state: 'mental-disorders',
                    title: 'mentaldisorders.com'
                },
                backpack: {
                    key: 'backpack',
                    state: 'backpack',
                    title: 'Backpack'
                }
            };

            $scope.projects = [
                projectsNav['analytics'],
                projectsNav['visualizations'],
                projectsNav['asset-manager'],
                projectsNav['toma'],
                projectsNav['file-attacher'],
                projectsNav['mental-disorders']
            ];

            $scope.schoolProjects = [
                projectsNav['jos'],
                projectsNav['reliable-transfer-suite'],
                projectsNav['geo-news'],
                projectsNav['backpack']
            ];

            $scope.goProject = function (project) {
                if (project) {
                    $scope.activeProject = project;
                    $state.go(ProjectsStates.project, {projectKey: project.state});
                }
            };

            $scope.setActiveProject = function (project) {
                $scope.activeProject = project && projectsNav[project.state]
                    ? project : $scope.activeProject;
            };

        })
    .controller('ProjectsListProjectCtrl',
        function ($scope, $stateParams) {

            $scope.setActiveProject($stateParams.projectKey)

        });