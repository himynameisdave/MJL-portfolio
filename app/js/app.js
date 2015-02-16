  //	DEFINE APP
var app = angular.module('app', ['ui.router']);

//	MAIN CONTROLLER
app.controller('Main', ["$scope", "$state", "$http", '$document', function ($scope, $state, $http, $document) {

  ///////////////////////////////
  //   GET DATA FROM MODEL
  //////////////////////////////

  //  Don't forget it's async
  $http.get('./data.json').
    success(function(data, status, headers, config) {
       $scope.siteData = data.sections;
    }).
    error(function(data, status, headers, config) {
      throw data;
    });



  /////////////////////////////////
  //   IMPORTANT SHOW/HIDE VARS
  /////////////////////////////////

  $scope.hide = {
    showcase: true,
    topNav: true,
    showcaseInstruction: true
  };

  $scope.sectionsLoaded = {
      logo:   false,
      print:  false,
      web:    false
  };

  $scope.finishedIntroAnim = false;

  $scope.activePage    = getCurrentPage();



  /////////////////////////////
  //   SCROLL LOGIC
  /////////////////////////////
  //  TODO: This shit needs to be outside of the contoller.
  $scope.setupScrollListener = function(){

    var doneScrollAbout = false;

    window.onscroll = function(e){

      // if($scope.hide.showcase){
        $scope.hide.topNav = checkIsHome();
        // $scope.$apply();
      // }

      $scope.activePage = getCurrentPage();
      $scope.sectionPositions = getSectionPositions();

      //  CHECK IF SECTIONS HAVE LOADED/SHOULD BE LOADED
      if($scope.sectionPositions){
        //check if positions are all loaded, if so don't call this guy
        // if( !$scope.sectionsLoaded.logo || !$scope.sectionsLoaded.print || $scope.sectionsLoaded.web ){
          $scope.loadSections();
        // }
      }
      $scope.$apply();



      ///////////////////////
      //    TODO: Turns off scroll functionality for now
      ///////////////////////
      //throttler
      // if( Math.round(window.scrollY) % 5 === 0 ){
      /*
      if( false ){

        var sections = [{
                          id: 'logo'
                        },{
                          id: 'print'
                        },{
                          id: 'web'
                        }];

        //  get position of all of our sections

        //////////////////////////////////////////////////////////////////////
        //    TODO refactor && make use of the $scope.sectionPositions/getSectionPositions() shit
        //////////////////////////////////////////////////////////////////////
        sections.forEach(function(val, i){
          //  grab the element itself (?)
          var el   = document.getElementById(val.id);
          //  if the elements actually exist & the
          if(el !== null){
            //  save some data on our position
            var pos             = sections[i].position = el.getBoundingClientRect(),
                elTop           = sections[i].position.top,
                elHeight        = sections[i].position.height,
                posInDoc        = sections[i].posInDoc = elTop + document.body.scrollTop,
                percentScrolled = Math.round(elTop / elHeight * 100);

              if( elTop > 0 && !doneScrollAbout){
                doneScrollAbout = true;

                if( percentScrolled <= 49 ){
                  setTimeout(function(){
                    //if not the last one
                    if(i !== sections.length){
                      // console.log('scrolling down');
                      runTheJewels(1.5, sections[i].posInDoc);
                    }else{
                      // console.log('scrolling down');
                      runTheJewels(1.5, posInDoc);
                    }
                    doneScrollAbout = false;
                  }, 1250);
                }

                if( percentScrolled > 50 ){
                  setTimeout(function(){
                    if(i !== 0){
                      // console.log('scrolling back up');
                      runTheJewels(1.5, sections[i-1].posInDoc);
                      setTimeout(function(){
                       doneScrollAbout = false;
                      }, 1500);
                    }else{
                      var homePos = document.getElementById('home').getBoundingClientRect().top + document.body.scrollTop;
                      runTheJewels(1.5, homePos);
                      setTimeout(function(){
                        doneScrollAbout = false;
                      }, 1500);
                    }
                  }, 1250);
                }

              }

          }//end isNull check
        });

      }//end throttler

      */

    };//end window scroll function!!

  };

  $scope.loadSections = function(){

    //  timout to beat the $apply()
    var throttle = 400,
        scrollAmountToTrigger = 180;

    //////////////////////////
    //    DRY so bad
    ////////////////////////////

    if( !$scope.sectionsLoaded.logo ){
      if($scope.sectionPositions.logo.top < scrollAmountToTrigger){
        $scope.sectionsLoaded.logo = true;

        setTimeout(function(){
          var logo = document.getElementById('module-logo'),
              logoProjects = logo.querySelectorAll('.nav-sub-logos .nav-sub-list-item');
            animateInProjects(logo, logoProjects);
        },throttle);

      }
    }

    if( !$scope.sectionsLoaded.print ){
      if($scope.sectionPositions.print.top < scrollAmountToTrigger){
        $scope.sectionsLoaded.print = true;

        setTimeout(function(){
          var print = document.getElementById('module-print'),
              printProjects = print.querySelectorAll('.nav-sub-print .nav-sub-list-item');
            animateInProjects(print, printProjects);
        },throttle);

      }
    }

    if( !$scope.sectionsLoaded.web ){
      if($scope.sectionPositions.web.top < scrollAmountToTrigger){
        $scope.sectionsLoaded.web = true;

        setTimeout(function(){
          var web = document.getElementById('module-web'),
              webProjects = web.querySelectorAll('.nav-sub-web .nav-sub-list-item');
            animateInProjects(web, webProjects);
        },throttle);

      }
    }

  };

  $scope.introAnimation = function(){
    setTimeout(function(){

      var main = document.querySelectorAll('.module-main'),
          dur  = 1600;

      TweenLite.set(main[0], { scale: 0, rotation: -3200 });
      TweenLite.to( main[0], (dur/1000), { scale: 1, rotation: 0, ease: Elastic.easeInOut } );
      setTimeout(function(){
        $scope.finishedIntroAnim = true;
        $scope.$apply();
      }, dur);
    }, 600);
  };

  $scope.setActivePage = function(page){
      var el = document.getElementById(page),
        scrollToHere = el.offsetTop;

    TweenLite.to(window, 1.815, {scrollTo:{y:scrollToHere}, ease: Circ.easeInOut});
  };

  $scope.showShowcase = function( section, project ){
    $scope.hide.showcase = false;
    $scope.hide.topNav = true;

    $scope.activeProject = $scope.siteData[section].projects[project];
  };

  $scope.closeShowcase = function() {
    $scope.hide.showcase = true;
    $scope.hide.topNav = false;
    if($scope.hide.showcaseInstruction){
      $scope.hide.showcaseInstruction = false;
    }
  };

  $scope.goToTop = function(time){
    runTheJewels(time, 0);
  };

  /////////////////////////////
  //   BUSINESS LOGIC
  /////////////////////////////
      ///////////////////////////////////
      //  TODO: start app here:
      ///////////////////////////////////

    $document.ready(function(){
      //  get to the top right quick
      runTheJewels(0.001, 0);
      $scope.setupScrollListener();
      $scope.introAnimation();
    });

}]);


//  t=time; d=distance;
var runTheJewels = function(t, d){
  TweenLite.to(window, t, {scrollTo:{y:d}, ease:Power3.easeInOut});
},
checkIsHome = function(){

  var home = document.getElementById('home');

    if( home !== null ){
      if(home.getBoundingClientRect().bottom > 0){
        return true;
      }else{
        return false;
      }
    }

},
getCurrentPage = function(){

  var sections = [{
                    id: 'home',
                  },{
                    id: 'logo'
                  },{
                    id: 'print'
                  },{
                    id: 'web'
                  }],
      currentPage = 'home';

  sections.reverse();

  sections.forEach(function(val, i){
    var el = document.getElementById( val.id );

    if( el !== null ){

      if( el.getBoundingClientRect().bottom > 0 ){
        currentPage = val.id;
      }

    }else{
      currentPage = 'home';
    }

  });

  return currentPage;

},
getSectionPositions = function(){


  var sectionPositions = {},
      IDs = [{ id: 'home', },{ id: 'logo' },{ id: 'print' },{ id: 'web' }];

    IDs.forEach(function(val, i){
      var el = document.getElementById( val.id );
      if( el !== null ){
        sectionPositions[val.id] = el.getBoundingClientRect();
      }
    });

  return sectionPositions;

},
animateInProjects = function(section, projects){

  //  quickly scale down all projects
  for( i = 0; i < projects.length; i++ ){
    TweenLite.set(projects[i], { scale: 0, rotation: -135 });
  }
  TweenLite.to(section, 0.875, { opacity: 1 });
  for( i = 0; i < projects.length; i++ ){
    var dur = 1 + ((i+1) * 0.25);
    TweenLite.to(projects[i], dur, { scale: 1, rotation: 0, ease:Elastic.easeInOut });
  }

};






