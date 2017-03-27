angular.module('funLearning.login', [])
  .controller('LoginCtrl', function($scope, $sanitize, UsersFactory) {

    // $scope.setUser = function(username, password) {
    //   console.log("setUser in scope")
    //   return UsersFactory.set(username, password); //return UsersFactory.currentUser
    // };

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


      // $scope.validateUser = function(){
      // return ResultsFactory.getUsers()
      // .then(function(users) {
      //   console.log('getAllUsers in game.js', ResultsFactory.allUsers);
      //   console.log('users', users); //unecessary

      //   $scope.allUsers = [];

      //   for (var i = 0; i< ResultsFactory.allUsers[0].length; i++) {
      //     console.log(i);
      //     var userObject = ResultsFactory.allUsers[i];
      //     console.log(userObject);

      //     $scope.allUsers.push(userObject);

      //   }


      // });
