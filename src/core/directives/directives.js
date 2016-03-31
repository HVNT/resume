/**
 * Created with WebStorm.
 * User: hunt
 * Date: 9/16/15
 * Time: 2:44 PM
 * File:
 */
angular.module('hb.directives', [])
    .factory('hbFillHeight', function ($position, $window) {
        return function (property, element, offset) {
            element.css(property, ($window.innerHeight - $position.offset(element).top - (offset || 0)) + 'px');
        }
    })
    .directive('fillHeight', function (hbFillHeight, $window, $rootScope, $timeout) {
        return {
            restrict: 'AC',
            priority: 0,
            link: function (scope, element, attrs) {
                var window = angular.element($window),
                    offset = scope.$eval(attrs.fillHeight) || 0,
                    property = attrs.fillHeightMax ? 'max-height' : 'height';

                function fillHeight () {
                    hbFillHeight(property, element, offset);
                }

                window.on('resize', _.debounce(fillHeight, 10));
                $rootScope.$on('$includeContentLoaded', fillHeight);
                $rootScope.$on('$stateEnterTransitionComplete', fillHeight);

                fillHeight();

                scope.$watch(function () {
                    return element[0].offsetTop;
                }, fillHeight);

                $timeout(fillHeight, 0)
            }
        }
    })
    .directive('fillBackground', function () {
        return {
            scope: {
                color: '=fillBackground'
            },
            link: function (scope, element, attrs) {
                var color = scope.color;

                function setBackgroundColor () {
                    if (color) element.css({background: color});
                }

                setBackgroundColor();
            }
        }
    })
    .directive('transitionMask', function ($timeout, $animate, $state) {
        return {
            link: function (scope, element, attrs) {
                var options = scope.$eval(attrs.transitionMask);
                var maskEl = angular.element('<div class="transition-mask a-fade"></div>');
                maskEl.addClass(options.background || 'bg-textured-primary');

                element.prepend(maskEl);
                function show () {
                    $animate.removeClass(maskEl, 'ng-hide', {
                        tempClasses: 'ng-hide-animate'
                    });
                }

                function hide () {
                    $timeout(function () {
                        $animate.addClass(maskEl, 'ng-hide', {
                            tempClasses: 'ng-hide-animate'
                        });
                    }, options.delay);
                }

                if (!element.hasClass('contain')) {
                    element.addClass('contain');
                }

                // TODO: make this fade on condition
                if (options.showOn) {
                    scope.$on(options.showOn, show)
                }

                if (options.hideOn) {
                    scope.$on(options.hideOn, hide)
                }

                hide();
            }
        };
    })
    .directive('urlBackground', function () {
        return {
            link: function (scope, element, attrs) {
                var url = scope.$eval(attrs.urlBackground);

                function setBackgroundUrl (url) {
                    if (url) {
                        element.css({
                            'background-image': 'url(' + url + ')',
                            'background-size': '40px 40px'
                        });
                    }
                }

                setBackgroundUrl(url);

                scope.$watch(attrs.urlBackground, function (newBG) {
                    var url = scope.$eval(attrs.urlBackground);
                    setBackgroundUrl(url);
                });
            }
        }
    })
    .directive("lazySrc", function ($window, $document, $rootScope, $log) {
        var lazyLoader = (function () {
            var images = [];
            var renderTimer = null;
            var renderDelay = 100;
            var win = $($window);
            var doc = $document;
            var documentHeight = doc.height();
            var documentTimer = null;
            var documentDelay = 2000;
            var rvWatcher;
            var isWatchingWindow = false;

            function addImage (image) {
                images.push(image);

                if (!renderTimer) {
                    startRenderTimer();
                }

                if (!isWatchingWindow) {
                    startWatchingWindow(image.scrollParent);
                }
            }

            function removeImage (image) {
                var index = images.indexOf(image);

                if (~index) {
                    images.splice(index, 1);
                }

                if (!images.length) {
                    clearRenderTimer();
                    stopWatchingWindow(image.scrollParent);
                }
            }

            function checkDocumentHeight () {
                if (renderTimer) {
                    return;
                }

                var currentDocumentHeight = doc.height();

                if (currentDocumentHeight === documentHeight) {
                    return;
                }

                documentHeight = currentDocumentHeight;

                startRenderTimer();
            }

            function checkImages () {
                $log.debug("Checking for visible images");

                var visible = [];
                var hidden = [];

                var windowHeight = win.height();
                var scrollTop = win.scrollTop();

                var topFoldOffset = scrollTop;
                var bottomFoldOffset = ( topFoldOffset + windowHeight );

                for (var i = 0; i < images.length; i++) {
                    var image = images[i];

                    if (image.isVisible(topFoldOffset, bottomFoldOffset)) {
                        visible.push(image);
                    } else {
                        hidden.push(image);
                    }
                }

                for (var i = 0; i < visible.length; i++) {
                    visible[i].render();
                }

                images = hidden;

                clearRenderTimer();

                if (!images.length) {
                    stopWatchingWindow();
                }
            }

            function clearRenderTimer () {
                clearTimeout(renderTimer);
                renderTimer = null;
            }

            function startRenderTimer () {
                renderTimer = setTimeout(checkImages, renderDelay);
            }

            function startWatchingWindow (scrollParent) {
                isWatchingWindow = true;

                win.on("resize", windowChanged);
                win.on("scroll", windowChanged);
                if (scrollParent) {
                    scrollParent.on("resize", windowChanged);
                    scrollParent.on("scroll", windowChanged);
                }

                rvWatcher = $rootScope.$on("rv.scrolling", windowChanged);

                documentTimer = setInterval(checkDocumentHeight, documentDelay);
            }

            function stopWatchingWindow (scrollParent) {
                isWatchingWindow = false;

                win.off("resize", windowChanged);
                win.off("scroll", windowChanged);
                if (scrollParent) {
                    scrollParent.on("resize", windowChanged);
                    scrollParent.on("scroll", windowChanged);
                }
                rvWatcher();

                clearInterval(documentTimer);
            }

            function windowChanged () {
                if (!renderTimer) {
                    startRenderTimer();
                }
            }

            return ({
                addImage: addImage,
                removeImage: removeImage,
                checkImages: checkImages,
                windowChanged: windowChanged
            });
        })();

        function LazyImage (element) {

            var source = null;
            var isRendered = false;
            var height = null;
            var scrollParent = element.scrollParent();

            function isVisible (topFoldOffset, bottomFoldOffset) {
                if (!element.is(":visible")) {
                    return ( false );
                }

                if (height === null) {
                    height = element.height();
                }

                var top = element.offset().top;
                var bottom = ( top + height );

                return (
                    (
                        ( top <= bottomFoldOffset ) &&
                        ( top >= topFoldOffset )
                    )
                    ||
                    (
                        ( bottom <= bottomFoldOffset ) &&
                        ( bottom >= topFoldOffset )
                    )
                    ||
                    (
                        ( top <= topFoldOffset ) &&
                        ( bottom >= bottomFoldOffset )
                    )
                );

            }

            function render () {
                isRendered = true;
                renderSource();
            }

            function setSource (newSource) {
                source = newSource;

                if (isRendered) {
                    renderSource();
                }
            }

            function renderSource () {
                element[0].src = source;
                element.css({
                    background: ''
                });
            }

            return ({
                isVisible: isVisible,
                render: render,
                setSource: setSource,
                scrollParent: scrollParent
            });
        }

        function link ($scope, element, attributes) {
            var lazyImage = new LazyImage(element);

            lazyLoader.addImage(lazyImage);
            element.css({
                background: 'url(/assets/img/loader.gif) no-repeat center center'
            });

            attributes.$observe("rvLazySrc",
                function (newSource) {
                    lazyImage.setSource(newSource);
                });

            $scope.$on("$destroy",
                function () {
                    lazyLoader.removeImage(lazyImage);
                });
        }

        // Return the directive configuration.
        return ({
            link: link,
            restrict: "A"
        });
    })
    .directive('glitchMask', function ($compile, $timeout) {
        return {
            restrict: 'AC',
            require: 'glitchMask',
            controller: function () {
                var glitchColors = {
                    white: '#F9FAF4',
                    yellow: '#E0E569',
                    cyan: '#6CD4D3',
                    green: '#37C437',
                    pink: '#B045AF',
                    red: '#8F1B1B',
                    blue: '#0D1C77',
                    darkBlue: '#120F28',
                    darkerBlue: '#101E2F',
                    black: '#0F0F0D'
                };
                var glitchColorKeys = _.keys(glitchColors);

                this.bars = [];

                this.addBar = function (bar, barColor) {
                    var glitchColorIdx = this.bars.length;
                    var bc = barColor && glitchColors[barColor]
                        ? glitchColors[barColor]
                        : glitchColors[glitchColorKeys[glitchColorIdx]];

                    bar.setBackgroundColor(bc);
                    this.bars.push(bar);
                };
            },
            link: function (scope, element, attrs, ctrl) {
                var glitchTpl = '<div class="glitch-mask-bar" height="60%"></div>\n<div class="glitch-mask-bar" height="60%"></div>\n<div class="glitch-mask-bar" height="60%"></div>\n<div class="glitch-mask-bar" height="60%"></div>\n<div class="glitch-mask-bar" height="60%"></div>\n<div class="glitch-mask-bar" height="60%"></div>\n<div class="glitch-mask-bar" height="60%"></div>\n\n<!--second row-->\n<div class="glitch-mask-bar" height="10%" color="blue"></div>\n<div class="glitch-mask-bar" height="10%" color="black"></div>\n<div class="glitch-mask-bar" height="10%" color="pink"></div>\n<div class="glitch-mask-bar" height="10%" color="black"></div>\n<div class="glitch-mask-bar" height="10%" color="cyan"></div>\n<div class="glitch-mask-bar" height="10%" color="black"></div>\n<div class="glitch-mask-bar" height="10%" color="white"></div>\n\n<!--third row-->\n<div class="glitch-mask-bar" width="16.6%" height="30%" color="darkerBlue"></div>\n<div class="glitch-mask-bar" width="16.6%" height="30%" color="white"></div>\n<div class="glitch-mask-bar" width="16.6%" height="30%" color="darkBlue"></div>\n<div class="glitch-mask-bar" width="16.6%" height="30%" color="black"></div>\n<div class="glitch-mask-bar" width="16.6%" height="30%" color="cyan"></div>\n<div class="glitch-mask-bar" width="16.6%" height="30%" color="pink"></div>';
                var glitchEl = angular.element(glitchTpl);
                element.append(glitchEl);
                $compile(glitchEl)(scope);



                //$timeout(function () {
                //    scope.glitching = false;
                //}, 2000);
            }
        }
    })
    .directive('glitchMaskBar', function ($timeout) {
        return {
            restrict: 'AC',
            require: ['^glitchMask', 'glitchMaskBar'],
            controller: function ($scope, $element) {

                this.setBackgroundColor = function (color) {
                    $element.css({
                        'background': color
                    });
                };
            },
            link: function (scope, element, attrs, ctrls) {
                var GlitchMaskCtrl = ctrls[0];
                var GlitchMaskBarCtrl = ctrls[1];
                var barWidth = attrs.width || '14.2%'; // 100 / 7 = default value
                var barHeight = attrs.height || '200px';
                var barColor = attrs.color || null;

                GlitchMaskCtrl.addBar(GlitchMaskBarCtrl, barColor);

                $timeout(function () {
                    element.css({
                        'width': barWidth,
                        'height': barHeight
                    });
                }, 0);
            }
        }
    })
    .directive('typewrite', function ($timeout) {
        function linkFunction (scope, elem, attrs) {
            var timer = null,
                initialDelay = attrs.initialDelay ? getTypeDelay(attrs.initialDelay) : 200,
                typeDelay = attrs.typeDelay ? getTypeDelay(attrs.typeDelay) : 200,
                blinkDelay = attrs.blinkDelay ? getAnimationDelay(attrs.blinkDelay) : false,
                cursor = attrs.cursor ? attrs.cursor : '|',
                blinkCursor = attrs.blinkCursor ? attrs.blinkCursor === "true" : true,
                auxStyle;

            if (attrs.text) {
                timer = $timeout(function () {
                    updateIt(elem, 0, attrs.text);
                }, initialDelay);
            }

            function updateIt (element, i, text) {
                if (i <= text.length) {
                    element.html(text.substring(0, i) + cursor);
                    i++;
                    timer = $timeout(function () {
                        updateIt(elem, i, text);
                    }, typeDelay);
                } else {
                    if (blinkCursor) {
                        if (blinkDelay) {
                            auxStyle = '-webkit-animation:blink-it steps(1) ' + blinkDelay + ' infinite;-moz-animation:blink-it steps(1) ' + blinkDelay + ' infinite ' +
                                '-ms-animation:blink-it steps(1) ' + blinkDelay + ' infinite;-o-animation:blink-it steps(1) ' + blinkDelay + ' infinite; ' +
                                'animation:blink-it steps(1) ' + blinkDelay + ' infinite;';
                            element.html(text.substring(0, i) + '<span class="blink" style="' + auxStyle + '">' + cursor + '</span>');
                        } else {
                            element.html(text.substring(0, i) + '<span class="blink">' + cursor + '</span>');
                        }
                    } else {
                        element.html(text.substring(0, i));
                    }
                }
            }

            function getTypeDelay (delay) {
                if (typeof delay === 'string') {
                    return delay.charAt(delay.length - 1) === 's' ? parseInt(delay.substring(0, delay.length - 1), 10) * 1000 : +delay;
                }
            }

            function getAnimationDelay (delay) {
                if (typeof delay === 'string') {
                    return delay.charAt(delay.length - 1) === 's' ? delay : parseInt(delay.substring(0, delay.length - 1), 10) / 1000;
                }
            }

            scope.$on('$destroy', function () {
                if (timer) {
                    $timeout.cancel(timer);
                }
            });
        }

        return {
            restrict: 'A',
            link: linkFunction,
            scope: false
        };
    })
    .directive('nohdes', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var canvasTpl = '<canvas id="nodes" width="800px" height="150px"></canvas>';
                var canvasEl = angular.element(canvasTpl);
                elem.append(canvasEl);

                function isiPhone () {
                    return (
                        (navigator.platform.indexOf("iPhone") != -1) ||
                        (navigator.platform.indexOf("iPod") != -1)
                    );
                }


                /* Canvas */
                var mouse_e = {
                    pageX: 0,
                    pageY: 0
                };
                var canvas = document.getElementById('nodes');
                var ctx = canvas.getContext('2d');

                var fps = isiPhone() ? 10 : 30;
                var total_nodes = isiPhone() ? 25 : 75;
                var min_speed = 10;
                var nodes_speed = 7;
                var nodes = [];
                var min_dist = 100;
                var move = true;
                var draw_to_mouse = false;
                var gather_nodes = false;
                var circle_radius = 100;
                var line_opacity = 1;

                // Init nodes
                for (var i = 0; i < total_nodes; i++) {
                    var c_width = ctx.canvas.width;
                    var c_height = ctx.canvas.height;
                    var node = {
                        cx: Math.round(Math.random() * c_width),
                        cy: Math.round(Math.random() * c_height),
                        dx: Math.round(Math.random() * c_width),
                        dy: Math.round(Math.random() * c_height),
                        speed: Math.round(min_speed + Math.random() * nodes_speed * 10),
                        gather: false
                    };
                    nodes.push(node);
                }

                function frame () {
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
                        scope.$apply();
                    }, 1000 / fps);
                }

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

                function releaseNodes () {
                    for (a = 0; a < total_nodes; a++) {
                        nodes[a].gather = false;
                        nodes[a].dx = Math.round(Math.random() * c_width);
                        nodes[a].dy = Math.round(Math.random() * c_height);
                    }
                }

                function gatherNodes () {
                    for (a = 0; a < total_nodes; a++) {
                        nodes[a].gather = true;

                        var radian = ((Math.random() * 360) / 180) * Math.PI;
                        nodes[a].dx = (c_width / 2) + (Math.cos(radian) * circle_radius);
                        nodes[a].dy = (c_height / 2) - (Math.sin(radian) * circle_radius);
                    }
                }

                function fadeToNodes (from) {
                    line_opacity = from / 100;
                    if (from > 0) {
                        setTimeout(function () {
                            fadeToNodes(from - 1);
                        }, 5);
                    }
                }

                function fadeToLines (from) {
                    line_opacity = from / 100;
                    if (from < 100) {
                        setTimeout(function () {
                            fadeToLines(from + 1);
                        }, 5);
                    }
                }

                $(document).mousemove(function (e) {
                    mouse_e = e;
                });

                // Main Circle
                $('#circle').click(function () {
                    if ($('#circle').hasClass('clicked')) {
                        $('#circle').removeClass('clicked');
                        hideNavigation();
                        releaseNodes();
                        fadeToLines(0);
                    } else {
                        $('#circle').addClass('clicked');
                        showNavigation();
                        gatherNodes();
                        fadeToNodes(100);
                    }
                });

                function switchNavigation (from, to) {
                    from.animate({'opacity': 0}, 250)
                        .hide();

                    to.css('opacity', 0)
                        .show()
                        .animate({'opacity': 1}, 250)
                        .delay(250);
                }

                // Load list from URL
                if (window.location.href.match(/#!/g)) {
                    var to = window.location.href.match(/(#!)\/(.+)/i)[2];
                    $('#circle').click();
                    switchNavigation($('#navigation'), $('#' + to));
                }
            }
        }
    });