angular.module('funLearning.profile', ['chart.js'])
  .controller('ProfileCtrl', function($scope, UsersFactory, $location) {

    $scope.changeLocation = function(path) {
      console.log('clicked: ', path);
      $location.path(path);
    };

    //this can be used if you want to make a table of rows and columns with the data
    $scope.dataTable = [];

    //we pull the current user from our user factory.
    var userProfile = UsersFactory.currentUser[0];


    //dynamically select the properties from that current user.
    $scope.firstName = userProfile["firstName"];
    $scope.lastName = userProfile["lastName"];
    $scope.username = userProfile["username"];
    $scope.age = userProfile["age"];
    $scope.grade = userProfile["grade"];

    //pull in the game results and divide by type of game.
    var userGameResults = userProfile["gameResults"];
    var game1 = userGameResults["game1"];
    var game2 = userGameResults["game2"];
    var game3 = userGameResults["game3"];

    //simple function which calculates the game average based on which game and which parameter.
    var findGameAverage = function(dataset, parameter) {
      var sum = 0;
      var plays = dataset.length;

      for (var i = 0; i < dataset.length; i++) {
        if (parameter === "pointsScored") {
          var pointsScored = dataset[i]["pointsScored"];
          var pointsAvailable = dataset[i]["pointsAvailable"];
          var calculatedScore = parseInt((pointsScored / pointsAvailable*100).toFixed(2));
          sum += calculatedScore;
        } else {
          var parameterPoints = dataset[i][parameter];
          sum += parameterPoints;
        }
      }
      var average = sum / plays;
      return average;
    };

    //Average points for each game
    var game1Average = findGameAverage(game1, "pointsScored");
    var game2Average = findGameAverage(game2, "pointsScored");
    var game3Average = findGameAverage(game3, "pointsScored");


    //average time for each game
    var game1AverageTime = findGameAverage(game1, "time");
    var game2AverageTime = findGameAverage(game2, "time");
    var game3AverageTime = findGameAverage(game3, "time");

    //average feeling for each game
    var game1AverageFeeling = findGameAverage(game1, "feeling");
    var game2AverageFeeling = findGameAverage(game2, "feeling");
    var game3AverageFeeling = findGameAverage(game3, "feeling");

    //the labbels for our graph
    $scope.gameLabels = ["Pythagoras' Haunted House", "Fraction Fun", "Cellular Shootouts"];

    //the data used by the pie chart
    $scope.gamePlayData = [game1.length, game2.length, game3.length];

    $scope.series = ['Game Plays', 'Game Average'];

    //the data used by the bar chart
    $scope.barChartData = [
      [game1.length, game2.length, game3.length],
      [game1Average, game2Average, game3Average]
    ];

    //we use this to select the unique performance for a certain parameter.
    var performanceForParameter = function(game, parameter) {
      var dataSet = userGameResults[game];
      var parameterSpecificDataSet = [];

      for (var i = 0; i<dataSet.length; i++) {
        var datum = dataSet[i][parameter];
        parameterSpecificDataSet.push(datum);
      }
      return parameterSpecificDataSet;
    };

    //feeling scores, time scores and points scores.
    var game1Feeling = performanceForParameter("game1", "feeling");
    var game2Feeling = performanceForParameter("game2", "feeling");
    var game3Feeling = performanceForParameter("game3", "feeling");
    var game1Time = performanceForParameter("game1", "time");
    var game2Time = performanceForParameter("game2", "time");
    var game3Time = performanceForParameter("game3", "time");
    var game1Scores = performanceForParameter("game1", "pointsScored");
    var game2Scores = performanceForParameter("game2", "pointsScored");
    var game3Scores = performanceForParameter("game3", "pointsScored");

    //setting the unique data for the specific canvas it relates to (Crossreference the html and it will make a lot more sense!)
    $scope.game1labels = ["Attempt 1", "Attempt 2", "Attempt 3"];
    $scope.game1series = ['Average', 'Feeling', 'Time'];
    $scope.game1data = [game1Scores, game1Feeling, game1Time
    ];


    $scope.game2labels = ["Attempt 1", "Attempt 2", "Attempt 3"];
    $scope.game2series = ['Average', 'Feeling', 'Time'];
    $scope.game2data = [game2Scores, game2Feeling, game2Time
    ];


    $scope.game3labels = ["Attempt 1", "Attempt 2", "Attempt 3"];
    $scope.game3series = ['Average', 'Feeling', 'Time'];
    $scope.game3data = [game3Scores, game3Feeling, game3Time
    ];


    $scope.game1labels = ["Attempt 1", "Attempt 2", "Attempt 3"];
    $scope.game1series = ['Average', 'Feeling', 'Time'];
    $scope.game1stats = [game1Scores, game1Feeling, game1Time
    ];


    $scope.game2labels = ["Attempt 1", "Attempt 2", "Attempt 3"];
    $scope.game2series = ['Average', 'Feeling', 'Time'];
    $scope.game2stats = [game2Scores, game2Feeling, game2Time
    ];


    $scope.game3labels = ["Attempt 1", "Attempt 2", "Attempt 3"];
    $scope.game3series = ['Average', 'Feeling', 'Time'];
    $scope.game3stats = [game3Scores, game3Feeling, game3Time
    ];


    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];

    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };

    $scope.game1Average = game1Average;
    $scope.game2Average = game2Average;
    $scope.game3Average = game3Average;
    $scope.game1AverageTime = game1AverageTime;
    $scope.game2AverageTime = game2AverageTime;
    $scope.game3AverageTime = game3AverageTime;
    $scope.game1AverageFeeling = game1AverageFeeling;
    $scope.game2AverageFeeling = game2AverageFeeling;
    $scope.game3AverageFeeling = game3AverageFeeling;

  });





