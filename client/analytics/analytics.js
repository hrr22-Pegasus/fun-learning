angular.module('funLearning.analytics', ['chart.js'])
  .controller('AnalyticsCtrl', function($scope, GameResultsFactory, UsersFactory, $location) {

    $scope.dataTable = [];
    $scope.compareDataTable = [];


    var dataTypeTrigger = "all";
    var parameterToMonitor = "points";
    var gameName = "game1";

    $scope.changeLocation = function(path) {
      console.log('clicked: ', path);
      $location.path(path);
    };

    $scope.setGame = function($event) {
      $scope.game= $event.target.getAttribute('value');
      gameName = $event.target.getAttribute('value');
      var parameterAverages = findClassAverage (allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
      var combinedClassAverage = combineClassAverage(parameterAverages);
      console.log(combinedClassAverage);
      setLabels(parameterAverages);
      if (dataTypeTrigger === "all"){
      setData(parameterAverages);
      setLabels(parameterAverages);
      setDataSetOverrideAndOptions(parameterAverages);
     } else if (dataTypeTrigger === "combined"){
      setData(combinedClassAverage);
      setLabels(combinedClassAverage);
      setDataSetOverrideAndOptions(combinedClassAverage);
     }
    };

    $scope.setDataViewType = function($event) {
     $scope.dataView = $event.target.getAttribute('value');
     dataTypeTrigger = $event.target.getAttribute('value');
     console.log(dataTypeTrigger);

     var parameterAverages = findClassAverage(allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
     var combinedClassAverage = combineClassAverage(parameterAverages);
     console.log(combinedClassAverage)
    setLabels(parameterAverages);


     console.log("INSIDE OF HERE!")
     if (dataTypeTrigger === "all"){
      setData(parameterAverages);
      setLabels(parameterAverages);
      setDataSetOverrideAndOptions(parameterAverages);

     } else if (dataTypeTrigger === "combined"){
      setData(combinedClassAverage);
      setLabels(combinedClassAverage);
      setDataSetOverrideAndOptions(combinedClassAverage);
     }
    };

    var allStudentData = UsersFactory.allUsers[0];

    var findStudent = function(student) {
      var studentObj;

      for (var i = 0; i<allStudentData.length; i++){
        var individualObject = allStudentData[i];
        var individualObjectName = individualObject["firstName"];
        if (individualObjectName === student){
          studentObj = individualObject;
          return studentObj;
        }
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
      console.log(allStudentsUnderTeacherArray);
      console.log("Working!")
      return allStudentsUnderTeacherArray;
    };

    var allStudentsUnderCertainTeacher = findAllStudentsUnderTeacher("Tre");



    var findStudent = function(student) {
      var studentObj;

      for (var i = 0; i<allStudentData.length; i++){
        var individualObject = allStudentData[i];
        var individualObjectName = individualObject["firstName"];
        if (individualObjectName === student){
          studentObj = individualObject;
          return studentObj;
        }
      }
    };


    var extractSingleStudentPerformance = function(singleStudent, parameter, game){
      var scores = [];
      console.log(game);
      var studentGameResults = singleStudent['gameResults'][game];
      console.log(game);
      console.log("Here!");
      console.log("Here are the student game results! ", studentGameResults);

      if(parameter === 'points') {
          for (var i = 0; i<studentGameResults.length; i++){
            var studentPointsScored = studentGameResults[i]["pointsScored"];
            var studentPointsAvailable = studentGameResults[i]["pointsAvailable"];
            var performance = (studentPointsScored/studentPointsAvailable);
            scores.push(performance*100);
          }
      } else if (parameter === 'time'){
        for (var i = 0; i<studentGameResults.length; i++){
          var studentTimeTaken = studentGameResults[i]["time"];
          var performance = studentTimeTaken;
          scores.push(performance)
        }
      } else if (parameter === 'feeling'){
        for (var i = 0; i<studentGameResults.length; i++){
          var studentTimeTaken = studentGameResults[i]["feeling"];
          var performance = studentTimeTaken;
          scores.push(performance)
        }
      } else {
        for (var i = 0; i<studentGameResults.length; i++){
          var studentPointsScored = studentGameResults[i]["pointsScored"];
          var studentPointsAvailable = studentGameResults[i]["pointsAvailable"];
          var performance = studentPointsScored /studentPointsAvailable;
          scores.push(performance);
        }
      }
      return scores;
    };


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


   $scope.setParameter = function($event) {
     $scope.parameter = $event.target.getAttribute('value');
     var parameterToMonitor = $event.target.getAttribute('value');
     var parameterAverages = findClassAverage(allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
     var combinedClassAverage = combineClassAverage(parameterAverages);
      setLabels(parameterAverages);

     console.log(combinedClassAverage);
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
      console.log("Inside of set labels, " + data);
      var numberOfLabels = data[0].length;
      var dynamicLabels = [];
      for (var i = 0; i < numberOfLabels; i++) {
        dynamicLabels.push("Class Attempt " + (i+1));
      }
      $scope.labels = dynamicLabels;
    };

    var setData = function(data) {
      console.log("dataSet!");
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

    var combineClassAverage = function(scores) {
      var combinedScores = [];
      var combinedScoresAttempts = [];

      var rotatedScores = rotateMatrix(scores,1);
      console.log(rotatedScores)
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

    setData(classAverages);
    setLabels(classAverages);
    setDataSetOverrideAndOptions(classAveragesLength);

    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    $scope.setChart = function (){
      console.log('set');
      $scope.datasetOverride = '';
    };



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

       $scope.setGame = function($event) {
      $scope.game= $event.target.getAttribute('value');
      gameName = $event.target.getAttribute('value');
      var parameterAverages = findClassAverage (allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
      var combinedClassAverage = combineClassAverage(parameterAverages);
      console.log(combinedClassAverage);
      setLabels(parameterAverages);
      if (dataTypeTrigger === "all"){
      setData(parameterAverages);
      setLabels(parameterAverages);
      setDataSetOverrideAndOptions(parameterAverages);
     } else if (dataTypeTrigger === "combined"){
      setData(combinedClassAverage);
      setLabels(combinedClassAverage);
      setDataSetOverrideAndOptions(combinedClassAverage);
     }
    };

    $scope.setDataViewType = function($event) {
     $scope.dataView = $event.target.getAttribute('value');
     dataTypeTrigger = $event.target.getAttribute('value');
     console.log(dataTypeTrigger);

     var parameterAverages = findClassAverage(allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
     var combinedClassAverage = combineClassAverage(parameterAverages);
     console.log(combinedClassAverage)
    setLabels(parameterAverages);


     console.log("INSIDE OF HERE!")
     if (dataTypeTrigger === "all"){
      setData(parameterAverages);
      setLabels(parameterAverages);
      setDataSetOverrideAndOptions(parameterAverages);

     } else if (dataTypeTrigger === "combined"){
      setData(combinedClassAverage);
      setLabels(combinedClassAverage);
      setDataSetOverrideAndOptions(combinedClassAverage);
     }
    };

    var allStudentData = UsersFactory.allUsers[0];

    var findStudent = function(student) {
      var studentObj;

      for (var i = 0; i<allStudentData.length; i++){
        var individualObject = allStudentData[i];
        var individualObjectName = individualObject["firstName"];
        if (individualObjectName === student){
          studentObj = individualObject;
          return studentObj;
        }
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
      console.log(allStudentsUnderTeacherArray);
      console.log("Working!")
      return allStudentsUnderTeacherArray;
    };

    var allStudentsUnderCertainTeacher = findAllStudentsUnderTeacher("Tre");



    var findStudent = function(student) {
      var studentObj;

      for (var i = 0; i<allStudentData.length; i++){
        var individualObject = allStudentData[i];
        var individualObjectName = individualObject["firstName"];
        if (individualObjectName === student){
          studentObj = individualObject;
          return studentObj;
        }
      }
    };


    var extractSingleStudentPerformance = function(singleStudent, parameter, game){
      var scores = [];
      console.log(game);
      var studentGameResults = singleStudent['gameResults'][game];
      console.log(game);
      console.log("Here!");
      console.log("Here are the student game results! ", studentGameResults);

      if(parameter === 'points') {
          for (var i = 0; i<studentGameResults.length; i++){
            var studentPointsScored = studentGameResults[i]["pointsScored"];
            var studentPointsAvailable = studentGameResults[i]["pointsAvailable"];
            var performance = (studentPointsScored/studentPointsAvailable);
            scores.push(performance*100);
          }
      } else if (parameter === 'time'){
        for (var i = 0; i<studentGameResults.length; i++){
          var studentTimeTaken = studentGameResults[i]["time"];
          var performance = studentTimeTaken;
          scores.push(performance)
        }
      } else if (parameter === 'feeling'){
        for (var i = 0; i<studentGameResults.length; i++){
          var studentTimeTaken = studentGameResults[i]["feeling"];
          var performance = studentTimeTaken;
          scores.push(performance)
        }
      } else {
        for (var i = 0; i<studentGameResults.length; i++){
          var studentPointsScored = studentGameResults[i]["pointsScored"];
          var studentPointsAvailable = studentGameResults[i]["pointsAvailable"];
          var performance = studentPointsScored /studentPointsAvailable;
          scores.push(performance);
        }
      }
      return scores;
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

    var classAverages = findClassAverage(allStudentsUnderCertainTeacher, "points", "game1");

    var classAveragesLength = classAverages.length;


   $scope.setCompareParameter = function($event) {
     $scope.parameter = $event.target.getAttribute('value');
     var parameterToMonitor = $event.target.getAttribute('value');
     var parameterAverages = findClassAverage(allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
     var combinedClassAverage = combineClassAverage(parameterAverages);
      setCompareLabels(parameterAverages);

     console.log(combinedClassAverage);
     if (dataTypeTrigger === "all"){
      setCompareData(parameterAverages);
      setCompareLabels(combinedClassAverage);

     } else if (dataTypeTrigger === "combined"){
      setCompareData(combinedClassAverage);
      setCompareLabels(combinedClassAverage);
     }
  };

    //need to make dynamic but for now this will work
    var setCompareLabels = function(data) {
      console.log("Inside of set labels, " + data);
      var numberOfLabels = data[0].length;
      var dynamicLabels = [];
      for (var i = 0; i < numberOfLabels; i++) {
        dynamicLabels.push("Class Attempt " + (i+1));
      }
      $scope.compareLabels = dynamicLabels;
    };

    var setCompareData = function(data) {
      console.log("dataSet!");
      $scope.compareData = data;
    };

    $scope.setCompareGame = function($event) {
      $scope.game= $event.target.getAttribute('value');
      gameName = $event.target.getAttribute('value');
      var parameterAverages = findClassAverage (allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
      var combinedClassAverage = combineClassAverage(parameterAverages);
      console.log(combinedClassAverage);
      setCompareLabels(parameterAverages);
      if (dataTypeTrigger === "all"){
      setCompareData(parameterAverages);
      setCompareLabels(parameterAverages);
      // setDataSetOverrideAndOptions(parameterAverages);
     } else if (dataTypeTrigger === "combined"){
      setCompareData(combinedClassAverage);
      setCompareLabels(combinedClassAverage);
      // setDataSetOverrideAndOptions(combinedClassAverage);
     }
  };


    // $scope.setCompareDataViewType = function($event) {
    //      $scope.compareDataView = $event.target.getAttribute('value');
    //      dataTypeTrigger = $event.target.getAttribute('value');
    //      console.log(dataTypeTrigger);

    //      var parameterAverages = findClassAverage(allStudentsUnderCertainTeacher, parameterToMonitor, gameName);
    //      var combinedClassAverage = combineClassAverage(parameterAverages);
    //      console.log(combinedClassAverage)
    //       setCompareLabels(parameterAverages);

    //      if (dataTypeTrigger === "all"){
    //       setCompareData(parameterAverages);
    //       setCompareLabels(parameterAverages);

    //      } else if (dataTypeTrigger === "combined"){
    //       setCompareData(combinedClassAverage);
    //       setCompareLabels(combinedClassAverage);
    //      }
    //     };















  });




