/**
 * Created with WebStorm.
 * User: hunt
 * Date: 3/25/16
 * Time: 1:06 PM
 * File:
 */
angular.module('hb.app')
    .controller('AppCtrl',
        function ($scope, $state, $window, $document, $timeout, $rootScope, $filter, $location, hotkeys,
                  BioStates, ProjectsStates, Projects) {

            $scope.modelDebounce = {
                debounce: 250,
                updateOn: 'blur default'
            };

            $scope.Projects = Projects;
            $scope.isIphone =
                navigator.platform.indexOf("iPhone") != -1 ||
                navigator.platform.indexOf("iPod") != -1;

            $scope.hello = {
                me: 'Hi, I\'m Hunter.',
                img: 'assets/img/bucket-prof.png',
                msg: 'I am a Software Engineer that specializes in designing and building products for the web.'
            };

            $scope.isGlitching = false;
            $scope.doneGlitchFirst = false;
            $scope.doneHelloMe = false;
            $scope.doneHelloMsg = false;
            $scope.doneNav = false;

            var DELAY_TRANS_BASE = 500;
            $scope.delayHelloMe = ($scope.hello.me.length * 60) + DELAY_TRANS_BASE;
            $scope.delayHelloMsg = (2000 + $scope.hello.msg.length * 30) + DELAY_TRANS_BASE * 3;
            $scope.delayGlitchFirst = $scope.delayHelloMsg + 200;

            var navStates = {
                bio: {
                    title: 'Bio',
                    state: BioStates.root,
                    navigate: function () {
                        $state.go(this.state);
                    },
                    initialDelay: $scope.delayHelloMsg + 550
                },
                projects: {
                    title: 'Projects',
                    state: ProjectsStates.list,
                    navigate: function () {
                        $state.go(this.state);
                    },
                    initialDelay: $scope.delayHelloMsg + 700
                },
                resume: {
                    title: 'Resume',
                    state: null,
                    href: 'assets/resume.pdf',
                    download: 'resume_hunterbrennick.pdf',
                    initialDelay: $scope.delayHelloMsg + 1100
                },
                contact: {
                    title: 'Contact',
                    state: null,
                    href: 'mailto:hunterbrennick@gmail.com'
                }
            };

            var DELAY_FINAL = $scope.delayHelloMsg + 2000;
            $scope.delayMainBottom = DELAY_FINAL + 150;


            $scope.navs = [
                navStates.bio,
                navStates.projects,
                navStates.resume
            ];

            $scope.navContact = navStates.contact;

            $timeout(function () {
                $scope.doneHelloMe = true;
            }, $scope.delayHelloMe);

            $timeout(function () {
                $scope.doneHelloMsg = true;
                $scope.isGlitching = true;
            }, $scope.delayHelloMsg);

            $timeout(function () {
                $scope.isGlitching = false;
                $scope.doneGlitchFirst = true;
            }, $scope.delayGlitchFirst);

            $timeout(function () {
                $scope.doneNav = true;
            }, $scope.delayMainBottom);

            $scope.$state = $state;

            $scope.stopContext = function (evt) {
                evt.preventDefault();
            };

            $scope.setActiveNav = function (navKey) {
                $scope.activeNav = (navKey && navStates[navKey])
                    ? navStates[navKey]
                    : $scope.activeNav;
            };

            $scope.goUrl = function (url) {
                if (url && url.length) {
                    $window.open(url, '_blank')
                }
            };

            /* Canvas */
            //TODO beafin up directive version then gut this shit
            var mouse_e = {
                pageX: 0,
                pageY: 0
            };

            var canvas = document.getElementById('nodes');
            var ctx = canvas.getContext('2d');

            var fps = $scope.isIphone ? 10 : 30;
            var total_nodes = $scope.isIphone ? 25 : 80;
            var min_speed = 10;
            var nodes_speed = 7;
            var nodes = [];
            var min_dist = 100;
            var move = true;
            var draw_to_mouse = false;
            var circle_radius = 100;
            var line_opacity = 1;

            //$scope.$watch(function () {
            //    return $(canvas).parent().width()
            //}, function () {
            //    ctx.canvas.width = $(canvas).parent().width();
            //});


            $timeout(function () {
                $scope.canvasPrepped = true;
            }, DELAY_FINAL);


            /* Init nodes */
            for (var i = 0; i < total_nodes; i++) {
                nodes.push({
                    cx: Math.round(Math.random() * ctx.canvas.width),
                    cy: Math.round(Math.random() * ctx.canvas.height),
                    dx: Math.round(Math.random() * ctx.canvas.width),
                    dy: Math.round(Math.random() * ctx.canvas.height),
                    speed: Math.round(min_speed + Math.random() * nodes_speed * 10),
                    gather: false
                });
            }

            frame = function () {
                var c_width = ctx.canvas.width;
                var c_height = ctx.canvas.height;

                if (move) {
                    // Redraw
                    ctx.clearRect(0, 0, c_width, c_height);

                    for (var i = 0; i < total_nodes; i++) {
                        var node = nodes[i];

                        node.cx += (node.dx - node.cx) / node.speed;
                        node.cy += (node.dy - node.cy) / node.speed;

                        ctx.fillStyle = 'rgba(0, 0, 0, ' + ((1 - line_opacity) * 0.5) + ')';
                        ctx.beginPath();
                        ctx.arc(node.cx, node.cy, 1, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fill();

                        if ((node.cx >= node.dx - 1) &&
                            (node.cx <= node.dx + 1) &&
                            (node.cy >= node.dy - 1) &&
                            (node.cy <= node.dy + 1)) {

                            if (!node.gather) {
                                node.dx = Math.round(Math.random() * c_width);
                                node.dy = Math.round(Math.random() * c_height);
                            } else {
                                var radian = ((Math.random() * 360) / 180) * Math.PI;
                                node.dx = (c_width / 2) + (Math.cos(radian) * circle_radius);
                                node.dy = (c_height / 2) - (Math.sin(radian) * circle_radius);
                            }
                        }
                    }

                    webNodes();
                }

                // Keep playing
                setTimeout(function () {
                    frame();
                }, 1000 / fps);
            };

            frame();

            function webNodes () {
                for (a = 0; a < total_nodes; a++) {

                    if (draw_to_mouse && !nodes[a].gather) {
                        mouse_x = mouse_e.pageX - $('#nodes').offset().left;
                        mouse_y = mouse_e.pageY - $('#nodes').offset().top;
                        x_dist = nodes[a].cx - mouse_x;
                        y_dist = nodes[a].cy - mouse_y;
                        dist = Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2));
                        drawLine(nodes[a].cx + 1, nodes[a].cy + 1, mouse_x, mouse_y, (min_dist - dist) / 100);
                    }

                    for (b = a + 1; b < total_nodes; b++) {

                        x_dist = nodes[a].cx - nodes[b].cx;
                        y_dist = nodes[a].cy - nodes[b].cy;
                        dist = Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2));

                        if (dist <= min_dist) {
                            drawLine(nodes[a].cx + 1, nodes[a].cy + 1, nodes[b].cx + 1, nodes[b].cy + 1, (min_dist - dist) / 100);
                        }
                    }
                }
            }

            function drawLine (x1, y1, x2, y2, alpha) {
                ctx.strokeStyle = 'rgba(0, 0, 0, ' + (alpha * line_opacity) + ')';
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

        });