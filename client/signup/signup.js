angular.module('funLearning.signup', [])
  .controller('SignupCtrl', function($scope, UsersFactory, $sanitize) {

    $scope.avatar_body = "assets/bear_animation_body.png";
    $scope.avatar_head = "assets/bear_animation_head_only.png";
    $scope.addUser = function() {

      var user = {
        firstName: $sanitize($scope.firstname),
        lastName: $sanitize($scope.lastname),
        username: $sanitize($scope.username),
        password: $sanitize($scope.password),
        age: 9,
        gender: $sanitize($scope.gender),
        isAdministator: $sanitize($scope.isAdministrator),
        grade: $sanitize($scope.grade),
        teacher: $sanitize("Tre"),
        school: $sanitize($scope.school),
        dateJoined: "03-25-2017",
        avatar: {"body":$scope.avatar_body, "head":$scope.avatar_head},
        gameResults: {
          "game1": [{"livesUsed": 0, "time": 0, "pointsScored": 0, "pointsAvailable": 9, "feeling": 0}],
          "game2": [{"livesUsed": 0, "time": 0, "pointsScored": 0, "pointsAvailable": 9, "feeling": 0}],
          "game3": [{"livesUsed": 0, "time": 0, "pointsScored": 0, "pointsAvailable": 9, "feeling": 0}]
        },
        badges: [],
        friends: [],
        sessionLength: []
      };
      // resets each modules values to clear the forms fields
      $scope.firstName = '';
      $scope.lastName = '';
      $scope.password = '';
      $scope.username = '';
      $scope.birthday = '';
      $scope.gender = '';
      $scope.isAdministrator = '';
      $scope.grade = '';
      $scope.teacher = '';
      $scope.school = '';
      console.log(user);
      UsersFactory.addNewUser(user);
    };

    // $scope.setAvatarHead = function($event){
    //   console.log("setting avatar head", $event.target.getAttribute('value'))
    //   $scope.avatarHead = $event.target.getAttribute('value');
    //   var avatarHeadForDatabase =
    // }
//   angular.module('ui.bootstrap.demo').controller('DateParserDemoCtrl', function ($scope, uibDateParser) {
//   $scope.format = 'yyyy/MM/dd';
//   $scope.date = new Date();
// });

  })
