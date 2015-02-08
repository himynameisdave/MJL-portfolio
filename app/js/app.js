  //	DEFINE APP
var app = angular.module('app', ['ui.router']);


//	MAIN CONTROLLER
app.controller('Main', ["$scope", "$state", "$http", function ($scope, $state, $http) {

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
    topNav: true
  };

  $scope.activePage = getCurrentPage();

  /////////////////////////////
  //   BUSINESS LOGIC
  /////////////////////////////

  //  get to the top right quick
  // runTheJewels(0.001, 0);

  var delay = 500;//TODO: use this.


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
      $scope.$apply();

      ///////////////////////
      //    TODO: Turns off scroll functionality for now
      ///////////////////////
      //throttler
      // if( Math.round(window.scrollY) % 5 === 0 ){
      if( false ){

        var sections = [{
                          id: 'logo'
                        },{
                          id: 'print'
                        },{
                          id: 'web'
                        }];

        //  get position of all of our sections
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

    };//end window scroll function!!

  };

  $scope.setActivePage = function(page){

      var el = document.getElementById(page),
          scrollToHere = el.offsetTop;

      TweenLite.to(window, 1.815, {scrollTo:{y:scrollToHere}, ease: Circ.easeInOut});

  };

  $scope.setupScrollListener();

}]);


//  t=time; d=distance;
var runTheJewels = function(t, d){
  TweenLite.to(window, t, {scrollTo:{y:d}, ease:Power4.easeOut});
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

};

