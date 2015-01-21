//	DEFINE APP
var app = angular.module('app', ['ui.router']);

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  /*
  $stateProvider
      .state("intro", {
        url: "/",
        templateUrl: "partials/intro.html"
      })
      .state("what-is-yeoman", {
        url: "/what-is-yeoman",
        templateUrl: "partials/what-is-yeoman.html"
      })
      .state("installation", {
        url: "/installation",
        templateUrl: "partials/installation.html"
      });
  */

}]);


//	MAIN CONTROLLER
app.controller('Main', ["$scope", "$state", function ($scope, $state) {

  // $scope.isHome = true;


  $scope.isHome = false;

}]);
