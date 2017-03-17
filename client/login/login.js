angular.module('funLearning.login', [])
  .controller('LoginCtrl', function($scope, $interval, $http, ResultsFactory){
    var interval;

    $scope.validateUser = function() {

    }


    $scope.getLeaderBoard = function(){


    }
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
