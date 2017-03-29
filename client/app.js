angular.module('funLearning', [
  'funLearning.login',
  'funLearning.signup',
  'funLearning.dashboard',
  'funLearning.game',
  'funLearning.profile',
  'funLearning.users',
  'funLearning.tests',
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
      templateUrl: 'games/game1/game1.html',
      controller: 'GameCtrl1'
    })
    .when('/game2', {
      templateUrl: 'games/game2/game2.html',
      controller: 'GameCtrl2'
    })
    .when('/game3', {
      templateUrl: 'games/game3/game3.html',
      controller: 'GameCtrl3'
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
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
    });
  $locationProvider.hashPrefix('');

});
