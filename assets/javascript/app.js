// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

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

// 2. Button for adding Employees
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = moment($("#traintime-input").val().trim(), "HH:mm").format("HH:mm");
  var trainFrecuency = $("#frecuency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frecuency: trainFrecuency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frecuency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#traintime-input").val("");
  $("#frecuency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
// database.ref().on("child_added", function (childSnapshot) {
//   console.log(childSnapshot.val());

//   // Store everything into a variable.
//   var trainName = childSnapshot.val().name;
//   var trainDestination = childSnapshot.val().destination;
//   var trainTime = childSnapshot.val().time;
//   var trainFrecuency = childSnapshot.val().frecuency;

//   // Employee Info
//   console.log(trainName);
//   console.log(trainDestination);
//   console.log(trainTime);
//   console.log(trainFrecuency);

//   // Prettify the employee start
//   var empStartPretty = moment.unix(trainTime).format("HH:mm");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMins = moment().diff(moment(trainTime, "HH:mm"), "minutes");
//   console.log(empMins);

//   //Calculate min away
//   //var minAway = trainFrecuency - ;
//   // console.log(empBilled);

//   // // Create the new row
//   // var newRow = $("<tr>").append(
//   //   $("<td>").text(empName),
//   //   $("<td>").text(empRole),
//   //   $("<td>").text(empStartPretty),
//   //   $("<td>").text(empMonths),
//   //   $("<td>").text(empRate),
//   //   $("<td>").text(empBilled)
//   // );

//   // Append the new row to the table
//   $("#train-table > tbody").append(empMins);
// });

  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016

  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
