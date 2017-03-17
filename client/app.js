angular.module('funLearning', [
  'funLearning.login',
  'funLearning.signup',
  'funLearning.dashboard',
  'funLearning.game',
  'funLearning.profile',
<<<<<<< HEAD
  'funLearning.results',
=======
>>>>>>> App updated to include basic front end modules and server functionality. Still need to incorporate databases.
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
      controller: 'GameCtrl'
    })
    .when('/profile', {
      templateUrl: 'profile/profile.html',
      controller: 'ProfileCtrl'
    })
    .otherwise({
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
    });
  $locationProvider.hashPrefix('');
});
