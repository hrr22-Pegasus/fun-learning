angular.module('funLearning.dashboard', [])
  .controller('DashboardCtrl', function($scope, TestsFactory) {

    // $scope.sendTest = function(){

    //   return TestsFactory.addNewTest();
    // };

    $scope.getTest = function(){
      console.log(TestsFactory.getTest("Tre"));

      return TestsFactory.getTest("Tre");
    };

  });

