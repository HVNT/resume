angular.module('hb.app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/app/app.html',
    "<div id=\"view contain\"><div class=main-header><div hb-s-row ng-show=\"helloMsgDone && firstGlitchDone\"><div hb-s-col=12 rv-s-pxy=4><div class=canvas-mask-left></div><canvas id=nodes width=800px height=150px class=main-header__canvas ng-class=\"{'visible': canvasPrepped}\"></canvas><div class=canvas-mask-right></div></div></div></div><div class=main-body hb-s-px=2><div class=main-body__left><div ng-show=!helloMsgDone ng-include=BaseViews.greeting></div><div ng-show=\"helloMsgDone && firstGlitchDone\" ng-include=BaseViews.nav></div></div><div class=main-body__right></div></div><div ui-view class=contain></div><div class=glitch-mask ng-show=glitching></div></div>"
  );


  $templateCache.put('/app/bio/views/bio.html',
    "<div>BIO</div>"
  );


  $templateCache.put('/app/projects/views/projects.html',
    "<div>PROJECTS</div>"
  );


  $templateCache.put('/core/views/greeting.html',
    "<div class=main__greeting hb-s-py=4><div hb-s-row><div hb-s-col=8><h1 typewrite type-delay=75 blink-cursor=false cursor=_ text={{hello.me}} hb-t-font=h1></h1></div><div hb-s-col=4><span class=main__img ng-class=\"{'visible': helloMeDone}\"><img ng-src={{hello.img}} height=43px hb-s-pr=3 hb-s-pt=1> <i class=\"fa fa-hand-o-left\"></i> <span rv-t-font=p hb-s-px=2>me</span></span></div></div><div hb-s-row hb-s-pt=7><h2 typewrite initial-delay=2250 type-delay=40 blink-cursor=false cursor=_ text={{hello.msg}} hb-c-text=mono hb-t-font=h2></h2></div></div>"
  );


  $templateCache.put('/core/views/nav.html',
    "<div hb-s-row hb-s-pt=12 ng-init=\"isHoveringNav = {};\"><div ng-repeat=\"nav in navs\" hb-s-row hb-s-pb=4><div hb-s-row hb-c-text=mono hb-t-font=\"h5 small-caps\" hb-s-pl=4><div hb-s-col=1 hb-s-px=4><span hb-s-pull=right class=nav-anchor ng-class=\"{'visible': helloMsgDone}\" ng-show=helloMsgDone>{{isHoveringNav[$index] ? '_' : '.' }}</span></div><div hb-s-col=11><a typewrite hb-c-text=mono hb-t-font=link style=\"text-decoration: none\" class=nav-title ng-mouseenter=\"isHoveringNav[$index] = true\" ng-mouseleave=\"isHoveringNav[$index] = false\" initial-delay={{::nav.initialDelay}} type-delay=50 blink-cursor=false cursor=_ ng-click=nav.navigate() text={{::nav.title}} ng-href={{::nav.href}} target=_blank></a></div></div></div></div>"
  );


  $templateCache.put('/core/views/nodes.html',
    "<div class=center><div id=circle></div><canvas id=nodes width=600 height=400></canvas></div><div class=\"center center-text nav-links\"><a class=nav-link href=resume.html>resume</a> <a class=nav-link href=aboutme.html>about</a> <a class=nav-link href=mailto:hunterbrennick@gmail.com target=_self>contact</a></div>"
  );

}]);
