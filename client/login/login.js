angular.module('funLearning.login', [])
  .controller('LoginCtrl',['$scope', 'UsersFactory', function($scope, UsersFactory){
    var interval;


    // $scope.setUser = function(username, password) {
    //   console.log("setUser in scope")
    //   return UsersFactory.set(username, password); //return UsersFactory.currentUser
    // };

    $scope.getSingleUser = function(username, password) {
      $scope.username = '';
      $scope.password = '';
      return UsersFactory.getCurrentUser(username, password);
    };

    $scope.getLeaderBoard = function(){


    };
}]);


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
