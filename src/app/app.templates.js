angular.module('hb.app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/app/app.html',
    "<div class=view><div id=container><div class=center><div id=circle><p>HUNTER BRENNICK</p><h2>curious learner</h2></div><div class=canvas-container><canvas id=nodes width=600 height=400></canvas></div></div><div class=\"center center-text nav-links\"><a class=nav-link href=aboutme.html>bio</a> <a class=nav-link href=resume.html>resume</a> <a class=nav-link href=projects.html>projects</a> <a class=nav-link href=mailto:hunterbrennick@gmail.com target=_self>contact</a></div></div><!--! end of #container --><div ui-view></div></div>"
  );


  $templateCache.put('/app/bio/views/bio.html',
    "<div>BIO</div>"
  );


  $templateCache.put('/app/projects/views/projects.html',
    "<div>PROJECTS</div>"
  );

}]);
