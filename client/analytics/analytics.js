angular.module('funLearning.analytics', ['chart.js'])
  .controller('AnalyticsCtrl', function($scope, GameResultsFactory, UsersFactory, $location) {

    //Here we store the data for the first datatable to be accessed to generate a table of values.
    $scope.dataTable = [];
    //this is the data storage area for the second table, currently not used however.
    $scope.compareDataTable = [];

    //To allow for code reusability, we can filter by certain parameters in the "extract single student performance", which takes in a parameter and game as part of its arguments.
    var dataTypeTrigger = "all";
    var parameterToMonitor = "points";
    var gameName = "game1";

    //here we access all the students from our user factory. Using the factory makes the students array available throughout the application.
    var allStudentData = UsersFactory.allUsers[0];

    //this is perhaps the most important function....and longest. It is what takes a student performance based on parameter, allowing for it to be "Extracted" and pushed into the array used to see all the results
    var extractSingleStudentPerformance = function(singleStudent, parameter, game){
      var scores = [];
      var studentGameResults = singleStudent['gameResults'][game];

      if (parameter === 'points') {
        for (var i = 0; i<studentGameResults.length; i++) {
          var studentPointsScored = studentGameResults[i][ "pointsScored"];
          var studentPointsAvailable = studentGameResults[i][ "pointsAvailable"];
          var performance = (studentPointsScored /studentPointsAvailable);
          scores.push(performance * 100);
        }
      } else if (parameter === 'time') {
        for (var i = 0; i<studentGameResults.length; i++) {
          var studentTimeTaken = studentGameResults[i]["time"];
          var performance = studentTimeTaken;
          scores.push(performance);
        }
      } else if (parameter === 'feeling') {
        for (var i = 0; i<studentGameResults.length; i++){
          var studentTimeTaken = studentGameResults[i]["feeling"];
          var performance = studentTimeTaken;
          scores.push(performance);
        }
      } else {
        for (var i = 0; i < studentGameResults.length; i++) {
          var studentPointsScored = studentGameResults[i]["pointsScored"];
          var studentPointsAvailable = studentGameResults[i]["pointsAvailable"];
          var performance = studentPointsScored /studentPointsAvailable;
          scores.push(performance);
        }
      }
      return scores;
    };

    //here we find all students under the teacher name passed in.
    var findAllStudentsUnderTeacher = function(teacher) {
      var allStudentsUnderTeacherArray = [];

      for (var i = 0; i < allStudentData.length; i++){
        var individualObject = allStudentData[i];
        var individualObjectName = individualObject["teacher"];
        if (individualObjectName === teacher){
          allStudentsUnderTeacherArray.push(individualObject);
        }
      };
      return allStudentsUnderTeacherArray;
    };

   //we currently have this hardcoded to take all students under "Tre", but feel free to make this dynamic.
    var allStudentsUnderCertainTeacher = findAllStudentsUnderTeacher("Tre");

    //this function calculates the class average by pushing in all student info into an array and then calculating the sum.
    var findClassAverage = function(classData, parameter, game) {
      var allClassScores = [];
      var attemptsSum = 0;
      var numStudents = classData.length;
      for (var i = 0; i<classData.length; i++) {
        var student = classData[i];
        var studentName = classData[i]["firstName"] + ' ' + classData[i]["lastName"];
        var studentGrade = classData[i]["grade"];
        var studentAge = classData[i]["age"];
        var studentPerformance = extractSingleStudentPerformance(student, parameter, game);
        allClassScores.push(studentPerformance);
        attemptsSum+=studentPerformance.length;
        $scope.dataTable[i]= ({"studentName":studentName, "studentGrade": studentGrade, "studentAge":studentAge, "studentPerformance":studentPerformance});
      }

      var attemptAverage = attemptsSum / numStudents;

      return allClassScores;

    };

    var classAverages = findClassAverage(allStudentsUnderCertainTeacher, "points", "game1");

    var classAveragesLength = classAverages.length;
    //to get combined averages required some tricky arithmetic. You need to be able to summate all the values in a column and then use that as the average for that attempt. To do this more easily, we rotate our array matrix.
    var combineClassAverage = function(scores) {
      var combinedScores = [];
      var combinedScoresAttempts = [];

      var rotatedScores = rotateMatrix(scores,1);
      for (var i = 0; i<rotatedScores.length; i++){
        for (var j = 0; j<rotatedScores[i].length; j++){
          if (j ===0){
            combinedScores[i] = rotatedScores[i][j]
          }
          if (j>0) {
            combinedScores[i]+= rotatedScores[i][j]
          }
          if (j === rotatedScores[i].length-1){
            combinedScores[i] = Math.round(combinedScores[i])/(j+1);
          }
        }
      }
      return combinedScores;
    };



    //this is simply for allowing angular routing changes on button clicks
    $scope.changeLocation = function(path) {
      $location.path(path);
    };

    //when a user selects a game, it will set the gameName variable, which is used to dynamically render graphs for specific games.
    $scope.setGame = function($event) {
      $scope.game= $event.target.getAttribute('value');
      gameName = $event.target.getAttribute('value');

      //"Parameter averages" shows the entire performance of the whole class (i.e. multiple lines)
      var parameterAverages = findClassAverage (allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
      //"Combined Class average" shows the combined class view
      var combinedClassAverage = combineClassAverage(parameterAverages);
      if (dataTypeTrigger === "all") {
      //setData is a function which ultimately casts the data to the canvas to be rendered. If the data type trigger is to see all the students data, then it will used the parameter averagaes.
      setData(parameterAverages);
      //set labels takes the length of the parameter averages, i.e. the number of attempts, and dynamically creates labels.
      setLabels(parameterAverages);
      //this is not as important and can be omitted; it is the settings for your axes.
      setDataSetOverrideAndOptions(parameterAverages);
      } else if (dataTypeTrigger === "combined") {
      //this casts the combined data of the class to the canvas
        setData(combinedClassAverage);
        setLabels(combinedClassAverage);
        setDataSetOverrideAndOptions(combinedClassAverage);
     }
    };

    $scope.setDataViewType = function($event) {
      //set data view type is what listens to the event on clicking the view desired, either all or combined, and stores this view to allow for dynamic rendering.
     $scope.dataView = $event.target.getAttribute('value');
     dataTypeTrigger = $event.target.getAttribute('value');

     //Similar code redudancy from above so that we can modulate the view each time a user clicks on a different view type.
      var parameterAverages = findClassAverage(allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
      var combinedClassAverage = combineClassAverage(parameterAverages);
      setLabels(parameterAverages);

      if (dataTypeTrigger === "all"){
        setData(parameterAverages);
        setLabels(parameterAverages);
        setDataSetOverrideAndOptions(parameterAverages);

       }  else if (dataTypeTrigger === "combined"){
        setData(combinedClassAverage);
        setLabels(combinedClassAverage);
        setDataSetOverrideAndOptions(combinedClassAverage);
     }
    };


    var findAllStudentsUnderTeacher = function(teacher) {
      var allStudentsUnderTeacherArray = [];

      for (var i = 0; i<allStudentData.length; i++){
        var individualObject = allStudentData[i];
        var individualObjectName = individualObject["teacher"];
        if (individualObjectName === teacher){
          allStudentsUnderTeacherArray.push(individualObject);
        }
      }
      return allStudentsUnderTeacherArray;
    };


  //this listens to the type of parameter (score, time, feeling), click event, sets it in the global scope, and then passes it to set data in order to generate dynamic views.
   $scope.setParameter = function($event) {
     $scope.parameter = $event.target.getAttribute('value');
     var parameterToMonitor = $event.target.getAttribute('value');
     var parameterAverages = findClassAverage(allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
     var combinedClassAverage = combineClassAverage(parameterAverages);
      setLabels(parameterAverages);

     if (dataTypeTrigger === "all"){
      setData(parameterAverages);
      setLabels(combinedClassAverage);
      setDataSetOverrideAndOptions(parameterAverages);

     } else if (dataTypeTrigger === "combined"){
      setData(combinedClassAverage);
      setLabels(combinedClassAverage);
      setDataSetOverrideAndOptions(combinedClassAverage);
     }
    };

    //need to make dynamic but for now this will work
    var setLabels = function(data) {
      var numberOfLabels = data[0].length;
      var dynamicLabels = [];
      for (var i = 0; i < numberOfLabels; i++) {
        dynamicLabels.push("Class Attempt " + (i+1));
      }
      $scope.labels = dynamicLabels;
    };

    var setData = function(data) {
      $scope.data = data;
    };



    var setDataSetOverrideAndOptions = function(numDataSets) {
      var dataSetOverrideArray = [];
      var dataSetOptions = {
        'scales': {
          'yAxes': []
        }
      };

      var dataSetOptionsYaxes = dataSetOptions['scales']['yAxes'];

      for (var i = 0; i < numDataSets; i++) {
        dataSetOverrideArray.push({ yAxisID: 'y-axis-' + i });
        dataSetOptionsYaxes.push({
          id: 'y-axis-' + i,
          type: 'linear',
          display: true,
          position: 'left'
        });
      }
    };

    var rotateMatrix = function(matrix, direction) {
      var direction = direction || 1;
      var newMatrix = [];
      if (matrix.length === 0 || matrix[0].length === 0) {
        return newMatrix;
      }
      if (direction === 1) { // rotate clockwise
        for (var i = 0; i < matrix[0].length; i++) {
          newMatrix.push([]);
          for (var j = matrix.length - 1; j >= 0; j--) {
            newMatrix[i].push(matrix[j][i]);
          }
        }
      } else { // rotate counterclockwise
        for (var i = 0; i < matrix[0].length; i++) {
          newMatrix.unshift([]);
          for (var j = 0; j < matrix.length; j++) {
            newMatrix[0].push(matrix[j][i]);
          }
        }
      }
      return newMatrix;
    };

    //this initializes our analytics page with data so that there is something to look at on loading.
    setData(classAverages);
    setLabels(classAverages);
    setDataSetOverrideAndOptions(classAveragesLength);

    $scope.onClick = function (points, evt) {
    };
    $scope.setChart = function (){
      $scope.datasetOverride = '';
    };

    //this provides different axis parameters. If you navigate the chart.js documentation, you will see that different graphs have different degrees of changes that can be made in terms of axes (pie charts and bar charts are very simple compared to line graphs)
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

    //All these functions below are similar to those above except we distinguish this data as being the "Compare" Data so as to allow for a juxtaposition of the chart views (the first chart vs the second, comparison, chart)
    $scope.setCompareDataViewType = function($event) {
      $scope.dataView = $event.target.getAttribute('value');
      dataTypeTrigger = $event.target.getAttribute('value');

      var parameterAverages = findClassAverage(allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
      var combinedClassAverage = combineClassAverage(parameterAverages);
      setCompareLabels(parameterAverages);


      if (dataTypeTrigger === "all"){
        setCompareData(parameterAverages);
        setCompareLabels(parameterAverages);

      } else if (dataTypeTrigger === "combined") {
        setCompareData(combinedClassAverage);
        setCompareLabels(combinedClassAverage);
      }
    };



    var compareClassAverage = function(classData, parameter, game) {
      var allClassScores = [];
      var attemptsSum = 0;
      var numStudents = classData.length;
      for (var i = 0; i<classData.length; i++) {
        var student = classData[i];
        var studentName = classData[i]["firstName"] + ' ' + classData[i]["lastName"];
        var studentGrade = classData[i]["grade"];
        var studentAge = classData[i]["age"];
        var studentPerformance = extractSingleStudentPerformance(student, parameter, game);
        allClassScores.push(studentPerformance);
        attemptsSum+=studentPerformance.length;
        $scope.compareDataTable[i]= ({"studentName":studentName, "studentGrade": studentGrade, "studentAge":studentAge, "studentPerformance":studentPerformance});
      }

      var attemptAverage = attemptsSum / numStudents;

      return allClassScores;

    };

    $scope.setCompareParameter = function($event) {
      $scope.parameter = $event.target.getAttribute('value');
      var parameterToMonitor = $event.target.getAttribute('value');
      var parameterAverages = findClassAverage(allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
      var combinedClassAverage = combineClassAverage(parameterAverages);
      setCompareLabels(parameterAverages);

      if (dataTypeTrigger === "all"){
        setCompareData(parameterAverages);
        setCompareLabels(combinedClassAverage);

      } else if (dataTypeTrigger === "combined"){
        setCompareData(combinedClassAverage);
        setCompareLabels(combinedClassAverage);
      }
    };

    var setCompareLabels = function(data) {
      var numberOfLabels = data[0].length;
      var dynamicLabels = [];
      for (var i = 0; i < numberOfLabels; i++) {
        dynamicLabels.push("Class Attempt " + (i+1));
      }
      $scope.compareLabels = dynamicLabels;
    };

    var setCompareData = function(data) {
      $scope.compareData = data;
    };

    $scope.setCompareGame = function($event) {
      $scope.game= $event.target.getAttribute('value');
      gameName = $event.target.getAttribute('value');
      var parameterAverages = findClassAverage (allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
      var combinedClassAverage = combineClassAverage(parameterAverages);
      setCompareLabels(parameterAverages);
      if (dataTypeTrigger === "all"){
        setCompareData(parameterAverages);
        setCompareLabels(parameterAverages);
      } else if (dataTypeTrigger === "combined"){
        setCompareData(combinedClassAverage);
        setCompareLabels(combinedClassAverage);
      }
    };

  });






