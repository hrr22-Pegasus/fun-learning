angular.module('funLearning.users', [])
  .factory('UsersFactory', function($http, $location) {

    var currentUser = [];
    var currentTeacher = {}; // not currently used
    var allUsers = [];
    var allTeachers = []; // not curently used

    var getAllUsers = function() {
      return $http({
        method: 'GET',
        url: '/api/users',
      }).then(function(res){
        allUsers.push(res.data);
      })
    };

    var getCurrentUser = function(username, password){
      return $http({
        method: 'GET',
        url: '/api/users/' + username + '/' + password
      }).then(function(res){
        console.log('usersFactor.js - getCurrentUser result', res);

        if (res.data) {
          currentUser.push(res.data);
          $location.path('/dashboard');
        } else {
          alert('login didn\'t work! If you haven\'t created account, please create one!');
          $location.path('/login');
        }
        return currentUser;
      });
    };

    var getUserProfile = function() {
      console.log(currentUser);
      return currentUser;
    };

    var addNewUser = function(data) {
      return $http({
        method: 'POST',
        url: '/api/users',
        data: data
      }).then(function(res){
        getCurrentUser(res.data.username, res.data.password);
        console.log('usersFactory.js - post request succeeded! :)');
      });
    };

    return {
      currentUser: currentUser,
      currentTeacher: currentTeacher,
      allUsers: allUsers,
      allTeachers: allTeachers,
      addNewUser: addNewUser,
      getAllUsers: getAllUsers,
      getCurrentUser: getCurrentUser
    };
  });






