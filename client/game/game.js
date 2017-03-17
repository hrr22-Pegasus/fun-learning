angular.module('funLearning.game', ['ngRoute'])
  .controller('GameCtrl', function($scope, $interval, $http){
    var interval;

    $scope.highScore = 0;
    $scope.timer = 10;
    $scope.points = 0;

    // $scope.getNameAgeGrade = function () {

    // }



    $scope.startGame = function(){
      // $scope.timer = 10;
      // $scope.points = 0;

    }


  $scope.setRandomNumbers = function(){
      $scope.variable1 = Math.floor(Math.random() * 10);
      $scope.variable2 = Math.floor(Math.random() * 10);
      $scope.sum = $scope.variable1 + $scope.variable2;


      interval = $interval(function(){
        console.log("in interval", $scope.timer);
        if($scope.timer > 0){
          $scope.timer = $scope.timer - 1;
        } else {
          console.log("ending game");
          $scope.endGame();
        }
      }, 1000);
    };

    $scope.startGame = function(){

    }

    $scope.endGame = function(){
      console.log($scope.timer)
      // $scope.timer = $scope.timer;
      $interval.cancel(interval);
      interval = undefined;
      $scope.score =  $scope.points;
      if ($scope.score > $scope.highScore){
        $scope.highScore = $scope.score;
      }
      $scope.points = 0;
    };

    $scope.checkAnswer = function(input){
      console.log("input", input);
      if(input === $scope.sum){
        console.log("input", input);
        $scope.points += 1;
        $scope.setRandomNumbers();
      } else {
        $scope.points -= 1;
      }
      $scope.input_sum = "";

    };

    $scope.submitPlayerInfo = function(data){

      $http({
        method: 'POST',
        url: '/api/users',    //1234567890ag
        data: data
      }).then(function(){
        console.log('post request succeeded! :)')
      })
    }

    $scope.getPlayerHighScore = function(){

      // $http({
      //   method: GET;
      //   url:  ;       //todo
      // }).then(func tion(){

      // })
    }

    $scope.getLeaderBoard = function(){

    //   $http({
    //     method: GET;
    //     url:  ;       //todo
    //   }).then(function(){

    //   })
    }


  })