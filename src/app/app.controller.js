/**
 * Created with WebStorm.
 * User: hunt
 * Date: 3/25/16
 * Time: 1:06 PM
 * File:
 */
angular.module('hb.app')
    .controller('AppCtrl',
        function ($scope, $state, $document, $timeout, $rootScope, $filter, $location, hotkeys,
                  BioStates, ProjectsStates, BaseViews) {

            $scope.isIphone = (navigator.platform.indexOf("iPhone") != -1) ||
                (navigator.platform.indexOf("iPod") != -1);

            $scope.hello = {
                me: 'Hi, I\'m Hunter.',
                img: 'assets/img/bucket-prof.png',
                msg: 'I like designing and building things for the internet.'
            };

            $scope.BaseViews = BaseViews;

            $scope.glitching = false;
            var helloMeDelay = $scope.hello.me.length * 75 + 150;
            var helloMsgDelay = 2000 + $scope.hello.msg.length * 50;

            $timeout(function () {
                $scope.helloMeDone = true;
                $scope.glitching = true;
            }, helloMsgDelay);

            var navStates = {
                bio: {
                    title: 'Bio',
                    state: BioStates.root,
                    initialDelay: helloMsgDelay + 400
                },
                projects: {
                    title: 'Projects',
                    state: ProjectsStates.root,
                    initialDelay: helloMsgDelay + 550
                },
                resume: {
                    title: 'Resume',
                    state: null,
                    initialDelay: helloMsgDelay + 950
                },
                contact: {
                    title: 'Contact',
                    state: null,
                    initialDelay: helloMsgDelay + 1350,
                    href: 'href="mailto:hunterbrennick@gmail.com"'
                }
            };


            $scope.$state = $state;
            $scope.initialized = true;

            $timeout(function () {
                $scope.isLoaded = true;
            }, 500);

            $scope.stopContext = function (evt) {
                evt.preventDefault();
            };

            $scope.modelDebounce = {
                debounce: 250,
                updateOn: 'blur default'
            };


            $scope.mainLogo = {};

            $scope.navs = [
                navStates.bio,
                navStates.projects,
                navStates.resume,
                navStates.contact
            ];









            function isiPhone(){
                return (
                    (navigator.platform.indexOf("iPhone") != -1) ||
                    (navigator.platform.indexOf("iPod") != -1)
                );
            }



            /* Canvas */
            var mouse_e = {pageX: 0, pageY: 0};
            var canvas = document.getElementById('nodes');
            var ctx = canvas.getContext('2d');

            var fps = isiPhone() ? 10 : 30;
            var total_nodes = isiPhone() ? 25 : 50;
            var min_speed = 10;
            var nodes_speed = 7;
            var nodes = [];
            var min_dist = 100;
            var move = true;
            var draw_to_mouse = false;
            var gather_nodes = false;
            var circle_radius = 100;
            var line_opacity = 1;

            var lowMargin = 110;

            // Init nodes
            for(var i = 0; i < total_nodes; i++) {
                var c_width = ctx.canvas.width;
                var c_height = ctx.canvas.height;

                var node = {cx:     Math.round(Math.random() * c_width),
                    cy:     Math.round(Math.random() * c_height),
                    dx:    Math.round(Math.random() * c_width),
                    dy:    Math.round(Math.random() * c_height),
                    speed: Math.round(min_speed + Math.random() * nodes_speed * 10),
                    gather: false
                };
                nodes.push(node);
            }

            frame = function() {
                var c_width = ctx.canvas.width;
                var c_height = ctx.canvas.height;

                if(move) {
                    // Redraw
                    ctx.clearRect(0, 0, c_width, c_height);

                    for(var i = 0; i < total_nodes; i++) {

                        var node = nodes[i];
                        node.cx += (node.dx - node.cx) / node.speed;
                        node.cy += (node.dy - node.cy) / node.speed;

                        ctx.fillStyle = 'rgba(0, 0, 0, ' + ((1 - line_opacity) * 0.5) + ')';
                        ctx.beginPath();
                        ctx.arc(node.cx, node.cy, 1, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.fill();

                        if((node.cx >= node.dx - 1) &&
                            (node.cx <= node.dx + 1) &&
                            (node.cy >= node.dy - 1) &&
                            (node.cy <= node.dy + 1)) {

                            if(!node.gather) {
                                node.dx = Math.round(Math.random() * c_width);
                                node.dy = Math.round(Math.random() * c_height);
                            } else {
                                var radian = ((Math.random() * 360) / 180) * Math.PI;
                                node.dx = (c_width / 2) + (Math.cos(radian) * circle_radius);
                                node.dy = (c_height / 2) - (Math.sin(radian) * circle_radius);
                                node.dy += lowMargin;
                            }
                        }
                    }

                    webNodes();
                }

                // Keep playing
                setTimeout(function() {
                    frame();
                }, 1000 / fps);
            };

            frame();

            function webNodes() {
                for(a = 0; a < total_nodes; a++) {

                    if(draw_to_mouse && !nodes[a].gather) {
                        mouse_x = mouse_e.pageX - $('#nodes').offset().left;
                        mouse_y = mouse_e.pageY - $('#nodes').offset().top;
                        x_dist = nodes[a].cx - mouse_x;
                        y_dist = nodes[a].cy - mouse_y;
                        dist = Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2));
                        drawLine(nodes[a].cx + 1, nodes[a].cy + 1, mouse_x, mouse_y, (min_dist - dist) / 100);
                    }

                    for(b = a + 1; b < total_nodes; b++){

                        x_dist = nodes[a].cx - nodes[b].cx;
                        y_dist = nodes[a].cy - nodes[b].cy;
                        dist = Math.sqrt(Math.pow(x_dist, 2) + Math.pow(y_dist, 2));

                        if(dist <= min_dist) {
                            drawLine(nodes[a].cx + 1, nodes[a].cy + 1, nodes[b].cx + 1, nodes[b].cy + 1, (min_dist - dist) / 100);
                        }
                    }
                }
            }

            function drawLine(x1, y1, x2, y2, alpha) {
                ctx.strokeStyle = 'rgba(0, 0, 0, ' + (alpha * line_opacity) + ')';
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }

            function releaseNodes() {
                for(a = 0; a < total_nodes; a++) {
                    nodes[a].gather = false;
                    nodes[a].dx = Math.round(Math.random() * c_width);
                    nodes[a].dy = Math.round(Math.random() * c_height);
                }
            }

            function gatherNodes() {
                for(a = 0; a < total_nodes; a++) {
                    nodes[a].gather = true;

                    var radian = ((Math.random() * 360) / 180) * Math.PI;
                    nodes[a].dx = (c_width / 2) + (Math.cos(radian) * circle_radius);
                    nodes[a].dy = (c_height / 2) - (Math.sin(radian) * circle_radius);

                    nodes[a].dy += toggled ? lowMargin : 0;
                }
            }

            function fadeToNodes(from) {
                line_opacity = from / 100;
                if(from > 0) {
                    setTimeout(function() {
                        fadeToNodes(from - 1);
                    }, 5);
                }
            }

            function fadeToLines(from) {
                line_opacity = from / 100;
                if(from < 100) {
                    setTimeout(function() {
                        fadeToLines(from + 1);
                    }, 100);
                }
            }

            // Main Circle
            var toggled = false;
            $('#circle').click(function() {
                if($('#circle').hasClass('clicked')) {
                    toggled = false;
                    $('#circle').removeClass('clicked');
                    $('#circle').removeClass('low');
                    hideNavigation();
                    releaseNodes();
                    fadeToLines(0);
                } else {
                    toggled = true;
                    $('#circle').addClass('clicked');
                    $('#circle').addClass('low');
                    showNavigation();
                    gatherNodes();
                    fadeToNodes(100);
                }
            });


            function switchNavigation(from, to) {
                from.animate({'opacity': 0}, 250)
                    .hide();

                to.css('opacity', 0)
                    .show()
                    .animate({'opacity': 1}, 250)
                    .delay(250);
            }
        });