angular.module('funLearning', [
  'funLearning.login',
  'funLearning.signup',
  'funLearning.dashboard',
  'funLearning.game',
  'funLearning.profile',
  'funLearning.results',
  'funLearning.users',
  'ngRoute'
  ])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
    })
    .when('/signup', {
      templateUrl: 'signup/signup.html',
      controller: 'SignupCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'dashboard/dashboard.html',
      controller: 'DashboardCtrl'
    })
    .when('/game', {
      templateUrl: 'game/game.html',
      // template: '<div>\
      //   <div id="gameCanvas" game-canvas="players" map-id="mapId"></div>\
      // </div>',
      controller: 'GameCtrl',
      onEnter: function(Game) {
        Game.playing = true;
      },
      onExit: function(Game) {
        Game.playing = false;
      }
    })
    .when('/profile', {
      templateUrl: 'profile/profile.html',
      controller: 'ProfileCtrl'
    })
    .otherwise({
      templateUrl: 'signup/signup.html',
      controller: 'SignupCtrl'
    });
  $locationProvider.hashPrefix('');

});
