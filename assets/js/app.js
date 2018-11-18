$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB_8NmxP5w6Ki-zHjV8SXA_eyQ3tdGFKCI",
    authDomain: "train-scheduler-25388.firebaseapp.com",
    databaseURL: "https://train-scheduler-25388.firebaseio.com",
    projectId: "train-scheduler-25388",
    storageBucket: "train-scheduler-25388.appspot.com",
    messagingSenderId: "1043646003276"
  };

  firebase.initializeApp(config);

  var database = firebase.database();


    $("#addTrain-btn").on("click", function(event){

        event.preventDefault();

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = moment($("#firstTrainTime").val().trim(), "HH: mm").subtract(2, "years").format("X");
        console.log(trainTime)
        var frequency = $("#frequency").val().trim();


    var newTrain = {
        trainName : trainName,
        destination : destination,
        trainTime : trainTime,
        frequency : frequency,
    };

    database.ref().push(newTrain);
    
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

    });

database.ref().on("child_added", function(childSnapshot){

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;

var diffTime = moment().diff(moment.unix(trainTime), "minutes");
var remainder = diffTime % frequency;
var minutesAway = frequency - remainder;


var nextTrain = moment().add(minutesAway, "m").format("HH:mm");


var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesAway)
);

$("#newTrain").append(newRow);


});



});
