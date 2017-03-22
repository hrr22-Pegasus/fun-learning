angular.module('funLearning.dashboard', [])
  .controller('DashboardCtrl', ['$scope', 'TestsFactory',function($scope, TestsFactory) {

    // $scope.sendTest = function(){

    //   return TestsFactory.addNewTest();
    // };

    $scope.getTest = function(){
      console.log(TestsFactory.getTest("Tre"));

      return TestsFactory.getTest("Tre");
    };

  }])

