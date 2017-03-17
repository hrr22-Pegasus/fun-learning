angular.module('funLearning.game', [])
  .controller('GameCtrl', function($scope, $interval, $http, ResultsFactory){
    var interval;

    $scope.points = 0;
    $scope.highScore = 0;
    $scope.timer = 10;

    $scope.startTimer = function() {
        interval = $interval(function(){
          console.log("in interval", $scope.timer);
          if($scope.timer > 0){
            $scope.timer = $scope.timer - 1;
          } else {
            console.log("ending game");
            $scope.endGame();
          }
        }, 1000);
      }

    $scope.setRandomNumbers = function(){
      $scope.variable1 = Math.floor(Math.random() * 10);
      $scope.variable2 = Math.floor(Math.random() * 10);
      $scope.sum = $scope.variable1 + $scope.variable2;
    };

    $scope.startGame = function(){
      $scope.timer = 10;
      $scope.points = 0;
      $scope.setRandomNumbers();
      $scope.startTimer();
    }

    $scope.endGame = function(){
      $interval.cancel(interval);
      interval = undefined;
      $scope.score = $scope.points;
      if ($scope.score > $scope.highScore){
        $scope.highScore = $scope.score;
      }
    };

    $scope.checkAnswer = function(input){
      console.log("input", input);
      if($scope.timer > 0){
        if(input === $scope.sum){
          console.log("input", input);
          $scope.points += 1;
          $scope.setRandomNumbers();
        } else {
          $scope.points -= 1;
        }
        $scope.input_sum = "";
      }
    };

    $scope.addUser = function(data){
      console.log("adding user");
      return ResultsFactory.addNewUser(data);
    }

    $scope.getAllUsers = function(){
      return ResultsFactory.getUsers()
      .then(function(users) {
        console.log('getAllUsers in game.js', ResultsFactory.allUsers);
        console.log('users', users); //unecessary

        $scope.allUsers = [];

        for (var i = 0; i< ResultsFactory.allUsers[0].length; i++) {
          console.log(i);
          var userObject = ResultsFactory.allUsers[i];
          console.log(userObject);

          $scope.allUsers.push(userObject);

        }


      });
    }

    $scope.getLeaderBoard = function(){

    //   $http({
    //     method: GET;
    //     url:  ;       //todo
    //   }).then(function(){

    //   })
    }
});
