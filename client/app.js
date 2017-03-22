angular.module('funLearning', [
  'funLearning.login',
  'funLearning.signup',
  'funLearning.dashboard',
  'funLearning.game',
  'funLearning.profile',
  'funLearning.results',
  'funLearning.users',
  'ngSanitize',
  'funLearning.analytics',
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
      templateUrl: 'games/game.html',
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
    .when('/analytics', {
      templateUrl: 'analytics/analytics.html',
      controller: 'AnalyticsCtrl'
    })
    .otherwise({
      templateUrl: 'signup/signup.html',
      controller: 'SignupCtrl'
    });
  $locationProvider.hashPrefix('');

});
