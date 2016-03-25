angular.module('hb.app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/app/app.html',
    "<div id=contain fill-height><div hb-s-row><div ng-repeat=\"nav in navBlocks\"><span hb-t-font=\"h4 small-caps\">{{::nav.title}}</span></div></div><div ui-view></div></div>"
  );


  $templateCache.put('/app/bio/views/bio.html',
    "<div>BIO</div>"
  );


  $templateCache.put('/app/projects/views/projects.html',
    "<div>PROJECTS</div>"
  );

}]);
