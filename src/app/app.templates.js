angular.module('hb.app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/app/app.html',
    "<div id=\"view contain\"><div hb-s-row hb-t-font=center><span ng-repeat=\"nav in navs\" hb-s-pr=4><span hb-c-text=mono hb-t-font=\"link h4 small-caps\">{{::nav.title}}</span></span></div><div ui-view class=contain fill-height></div></div>"
  );


  $templateCache.put('/app/bio/views/bio.html',
    "<div>BIO</div>"
  );


  $templateCache.put('/app/projects/views/projects.html',
    "<div>PROJECTS</div>"
  );

}]);
