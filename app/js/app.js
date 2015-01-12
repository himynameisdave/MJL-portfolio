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
      });
});



//	MAIN CONTROLLER
app.controller('Porfolio', function ($scope, $log) {

   var l = document.getElementById('logo'),
      tl = new TimelineMax(),
      icons = document.getElementsByClassName('icon');


      tl.to(l, 1.75, {opacity:1, ease:Power3.easeOut});
      tl.to(icons, 0.55, {opacity: 1, margin: 0, ease:Power2.easeIn});
      tl.to(icons[0], 0.45, {top: "-15%", margin: "0 0 0 -7.5px", delay: -0.1, ease: Elastic.easeOut});
      tl.to(icons[1], 0.45, {top: "69%", left: "5%", delay: -0.45, ease: Elastic.easeOut});
      tl.to(icons[2], 0.45, {top: "69%", left: "84%", delay: -0.45, ease: Elastic.easeOut});


});



