angular.module('funLearning.login', [])
  .controller('LoginCtrl', function($scope, $sanitize, UsersFactory) {

    $scope.getSingleUser = function() {
      var username = $sanitize($scope.username);
      var password = $sanitize($scope.password);
      $scope.username = '';
      $scope.password = '';
      return UsersFactory.getCurrentUser(username, password);
    };

    $scope.getLeaderBoard = function() {
    };

    UsersFactory.getAllUsers();


  });


