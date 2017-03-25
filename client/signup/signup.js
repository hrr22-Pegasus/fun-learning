angular.module('funLearning.signup', [])
  .controller('SignupCtrl', function($scope, UsersFactory, $sanitize) {


    // {firstName: firstName, lastName: lastName, username: username, password: password, birthday: birthday, gender: gender, administrator: isAdministrator, letterGrade: letterGrade, teacher: teacher, school: school}
    // $scope.addUser = function(user) {
    //   $scope.firstName = '';
    //   $scope.lastName = '';
    //   $scope.password = '';
    //   $scope.username = '';
    //   $scope.birthday = '';
    //   $scope.gender = '';
    //   $scope.isAdministrator = '';
    //   $scope.letterGrade = '';
    //   $scope.teacher = '';
    //   $scope.school = '';
    //   UsersFactory.addNewUser(user);
    // };
    $scope.addUser = function() {
      $scope.avatarHead = "assets/bear_animation_head_onl.png"

      var user = {
        firstName: $sanitize($scope.firstname),
        lastName: $sanitize($scope.lastname),
        password: $sanitize($scope.password),
        username: $sanitize($scope.username),
        birthday: $sanitize($scope.birthday),
        avatar: ["assets/bear_animation_body.png", $scope.avatarHead],
        gender: $sanitize($scope.gender),
        isAdministator: $sanitize($scope.isAdministrator),
        letterGrade: $sanitize($scope.letterGrade),
        teacher: $sanitize($scope.teacher),
        school: $sanitize($scope.school)
      };
      $scope.firstName = '';
      $scope.lastName = '';
      $scope.password = '';
      $scope.username = '';
      $scope.birthday = '';
      $scope.gender = '';
      $scope.isAdministrator = '';
      $scope.letterGrade = '';
      $scope.teacher = '';
      $scope.school = '';
      UsersFactory.addNewUser(user);
    };

    $scope.setAvatarHead = function($event){
      console.log("setting avatar head", $event.target.getAttribute('value'))
      $scope.avatarHead = $event.target.getAttribute('value');
    }
//   angular.module('ui.bootstrap.demo').controller('DateParserDemoCtrl', function ($scope, uibDateParser) {
//   $scope.format = 'yyyy/MM/dd';
//   $scope.date = new Date();
// });

  })
// testing git rebase - Jesse