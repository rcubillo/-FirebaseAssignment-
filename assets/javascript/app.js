// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyDofQRWN6tFEQp692NQlgxeP_-X4m8J3BI",
  authDomain: "portfoliocontactinfo.firebaseapp.com",
  databaseURL: "https://portfoliocontactinfo.firebaseio.com",
  projectId: "portfoliocontactinfo",
  storageBucket: "portfoliocontactinfo.appspot.com",
  messagingSenderId: "420214178482"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = moment($("#traintime-input").val().trim(), "HH:mm").format("HH:mm");
  var trainFrecuency = $("#frecuency-input").val().trim();

  //Mutates the original moment by subtracting time.
  firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");

  var currentTime = moment();

  //To get the difference in minutes
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  
  //Getting the division remainder
  var tRemainder = diffTime % trainFrecuency;
  var minaway = trainFrecuency - tRemainder;

  var nextTrain = moment().add(minaway, "minutes");
  var nextarrival = moment(nextTrain).format("hh:mm a");


  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frecuency: trainFrecuency,
    // hw
    trainFormatted: nextarrival,
    tillTrain: minaway

  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log("name" + newTrain.name);
  console.log("destination"+ newTrain.destination);
  console.log("time" + newTrain.time);
  console.log("frecuency" + newTrain.frecuency);
  //hw
  console.log("nexttrain" + newTrain.trainFormatted);
  console.log("mintill" + newTrain.tillTrain);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#traintime-input").val("");
  $("#frecuency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrecuency = childSnapshot.val().frecuency;
 //hw
  var nextarrival = childSnapshot.val().trainFormatted;
  var minaway = childSnapshot.val().tillTrain;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrecuency);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrecuency),
    $("<td>").text(nextarrival),
    $("<td>").text(minaway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

