angular.module('funLearning.dashboard', [])
  .controller('DashboardCtrl', ['$scope', 'TestsFactory',function($scope, TestsFactory) {

    $scope.sendTest = function(){

      return TestsFactory.addNewTest(
        {
          "teacher": "Tre",
          "games": { "game1": { "test1": [[0,1], [5,5], [3,3], [0,0]] }, "game2": { "test1": [[0,1], [5,5], [3,3], [0,0]]} }
        }
      );
    };

  }])

