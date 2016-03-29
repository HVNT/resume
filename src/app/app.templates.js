angular.module('hb.app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/app/app.html',
    "<div id=\"view contain\"><div class=main-header><div hb-s-row ng-show=\"helloMsgDone && firstGlitchDone\"><div hb-s-col=12 hb-s-pxy=4><canvas id=nodes width=1000px height=150px class=main-header__canvas ng-class=\"{'visible': canvasPrepped}\"></canvas></div></div></div><div class=main-body hb-s-px=2><div class=main-body__top><div ng-show=\"helloMsgDone && firstGlitchDone\" ng-include=BaseViews.nav></div></div><div class=main-body__bottom><div ui-view ng-show=\"helloMsgDone && firstGlitchDone\"></div></div></div></div><div ng-include=BaseViews.greeting ng-show=!helloMsgDone></div><div class=glitch-mask ng-show=glitching></div>"
  );


  $templateCache.put('/app/bio/views/bio.html',
    "<div>BIO</div>"
  );


  $templateCache.put('/app/projects/views/projects.html',
    "<div ui-view></div>"
  );


  $templateCache.put('/app/projects/views/projects.list.html',
    "<div class=projects__left><div hb-s-row hb-s-pxy=8><div hb-s-row hb-s-pb=4><h5 hb-t-font=\"h5 small-caps\" hb-s-pb=3>Work</h5><div hb-s-row ng-repeat=\"project in projects\" hb-s-pl=1 hb-s-pb=2><h6 ng-click=goProject(project) hb-c-text=mono ng-class=\"{'nav__title--active': activeProjectNav.state === project.state}\" hb-t-font=\"link h6 small-caps\">{{::project.title}}</h6></div></div><div hb-s-row><h5 hb-t-font=\"h5 small-caps\" hb-s-pb=3>School</h5><div hb-s-row ng-repeat=\"schoolProject in schoolProjects\" hb-s-pl=1 hb-s-pb=2><h6 ng-click=goProject(schoolProject) hb-c-text=mono ng-class=\"{'nav__title--active': activeProjectNav.state === schoolProject.state}\" hb-t-font=\"link h6 small-caps\">{{::schoolProject.title}}</h6></div></div></div></div><div class=projects__right><div ui-view></div></div>"
  );


  $templateCache.put('/app/projects/views/projects.list.project.html',
    "<div hb-s-row hb-s-pxy=8><div hb-s-row><div class=project></div><div hb-s-pull=left><img class=inline-block ng-src={{activeProject.forLogoUrl}} height=50px hb-s-pr=3 hb-s-pt=1></div><div hb-s-pull=left hb-s-px=2><div hb-s-row hb-s-py=1><h4 hb-t-font=h4>{{activeProject.title}}</h4></div><div hb-s-row><h6 hb-c-text=mono hb-t-font=h6>{{activeProject.subtitle}}</h6></div></div></div><div hb-s-row></div></div>"
  );


  $templateCache.put('/core/views/greeting.html',
    "<div class=greeting-mask><div hb-s-row><div hb-s-col-offset=4 hb-s-col=4><h1 typewrite type-delay=75 blink-cursor=false cursor=_ text={{hello.me}} hb-t-font=h1></h1></div><div hb-s-col=4><span class=main__img ng-class=\"{'visible': helloMeDone}\"><i class=\"fa fa-hand-o-right\"></i> <img ng-src={{hello.img}} height=43px hb-s-pr=3 hb-s-pt=1></span></div></div><div hb-s-row hb-s-pt=7><div hb-s-col-offset=4 hb-s-col=10><h2 typewrite initial-delay=2250 type-delay=40 blink-cursor=false cursor=_ text={{hello.msg}} hb-c-text=mono hb-t-font=h2></h2></div></div></div>"
  );


  $templateCache.put('/core/views/nav.html',
    "<div hb-s-row hb-s-pt=10 ng-init=\"isHoveringNav = {};\"><div class=inline-block ng-repeat=\"nav in navs\" hb-s-col=3><div hb-s-row hb-c-text=mono hb-t-font=\"h5 small-caps\" hb-s-pl=4><div hb-s-col=2 hb-s-pr=2><span hb-s-px=4 class=nav-anchor ng-class=\"{'visible': helloMsgDone}\" ng-show=helloMsgDone>{{isHoveringNav[$index] ? '_' : '.' }}</span></div><div hb-s-col=10><a typewrite hb-c-text=mono hb-t-font=link style=\"text-decoration: none\" class=nav__title ng-class=\"{'nav__title--active': activeNav.state === nav.state}\" ng-mouseenter=\"isHoveringNav[$index] = true\" ng-mouseleave=\"isHoveringNav[$index] = false\" initial-delay={{::nav.initialDelay}} type-delay=50 blink-cursor=false cursor=_ ng-click=nav.navigate() text={{::nav.title}} ng-href={{::nav.href}} target=_blank></a></div></div></div></div>"
  );


  $templateCache.put('/core/views/nodes.html',
    "<div class=center><div id=circle></div><canvas id=nodes width=600 height=400></canvas></div><div class=\"center center-text nav-links\"><a class=nav-link href=resume.html>resume</a> <a class=nav-link href=aboutme.html>about</a> <a class=nav-link href=mailto:hunterbrennick@gmail.com target=_self>contact</a></div>"
  );

}]);
