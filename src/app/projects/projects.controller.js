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
                    $scope.setActiveProject(project.state);
                    $state.go(ProjectsStates.project, {projectState: project.state});
                }
            };

            $scope.setActiveProject = function (projectState) {
                $scope.activeProjectNav = projectState && projectsNav[projectState]
                    ? projectsNav[projectState]
                    : $scope.activeProjectNav;

                $scope.activeProject = $scope.activeProjectNav
                    ? $scope.Projects[$scope.activeProjectNav.key]
                    : $scope.activeProject;
            };

        })
    .controller('ProjectsListProjectCtrl',
        function ($scope, $window, $stateParams) {
            if (!$scope.activeProject) {
                $scope.setActiveProject($stateParams.projectState);
            }


            $scope.goForUrl = function () {
                if ($scope.activeProject) {
                    $window.open($scope.activeProject.forUrl, '_blank')
                }
            }
        });