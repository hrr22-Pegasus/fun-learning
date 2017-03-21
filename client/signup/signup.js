angular.module('funLearning.signup', [])
  .controller('SignupCtrl', function($scope, UsersFactory) {

    $scope.addUser = function(user) {
      $scope.firstName = '';
      $scope.lastName = '';
      $scope.password = '';
      $scope.username = '';
      $scope.birthday = '';
      $scope.gender = '';
      $scope.isAdministator = '';
      $scope.letterGrade = '';
      $scope.teacher = '';
      $scope.school = '';
      UsersFactory.addNewUser(user);
    };
//   angular.module('ui.bootstrap.demo').controller('DateParserDemoCtrl', function ($scope, uibDateParser) {
//   $scope.format = 'yyyy/MM/dd';
//   $scope.date = new Date();
// });

  })
// testing git rebase - Jesse