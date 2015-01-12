//	DEFINE APP
var app = angular.module('app', ['ui.router']);



//  CONFIG DAT UI-ROUTER
app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "partials/main.html",
        controller: "Porfolio"
      })
      .state('resume', {
        url: '/resume',
        templateUrl: 'partials/resume.html',
        controller: "Resume"
      });

});



//	MAIN CONTROLLER
app.controller('Porfolio', function ($scope, $log, $state) {

   var l = document.getElementById('logo'),
      tl = new TimelineMax(),
      icons = document.getElementsByClassName('icon');


      tl.to(l, 2, {opacity:1, delay: 1, ease:Power3.easeOut});
      tl.to(icons, 0.25, {opacity: 1, margin: 0, ease:Power2.easeIn});
      tl.to(icons[0], 0.4, {top: "-5%", left: "50%", margin: "0 0 0 -20px", delay: -0.25, ease: Elastic.easeOut});
      tl.to(icons[1], 0.4, {top: "83%", left: "5%", delay: -0.4, ease: Elastic.easeOut});
      tl.to(icons[2], 0.4, {top: "83%", left: "82%", delay: -0.4, ease: Elastic.easeOut});


  $scope.goResume = function(){
    $state.go('resume');
  };

  $scope.goContact = function(){
    alert('Go Contact');
  };



});


app.controller('Resume', function ($scope, $log, $state) {





});





