
//load stuff
$(document).ready(function () {

	// Initialize Firebase
	let config = {
		apiKey: "AIzaSyDv5rZU0ZW_kJohQ6A2c5PVnT91fz1jee0",
		authDomain: "starfleet-patrol.firebaseapp.com",
		databaseURL: "https://starfleet-patrol.firebaseio.com",
		projectId: "starfleet-patrol",
		storageBucket: "starfleet-patrol.appspot.com",
		messagingSenderId: "590431002658"
	};

	firebase.initializeApp(config);

		// Create a variable to reference the database
	let database = firebase.database();

		// Initial Values
	let starship = "Enterprise";
	let registery = "701";
	let starbase = "Vulcan";
	let launchTime = "20:30";
	let duration = "50";
	let nextArrival = 0;
    let eta = 0;

//placeholder for eta calcuation stuff
    nextArrival = "21:20";
    eta = "47";

	function getRandomIntInclusive(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return registery = Math.floor(Math.random() * (max - min + 1)) + min; 
	}


	// --------------------------------------------------------------

		// Whenever a user clicks the launch button
	$("#addship").on("click", function(event) {
	  	event.preventDefault();

		starship = $("#starship").val().trim();
		starbase = $("#starbase").val().trim();
		launchTime = $("#launch").val().trim();
		duration = $("#duration").val().trim();
		duration = parseInt(duration);
	  	getRandomIntInclusive(1, 999);

	 //  	console.log(starship);
		// console.log(registery);
		// console.log(starbase);
		// console.log(launchTime);
		// console.log(duration);

	    	// Save the new date in Firebase. This will cause our "value" callback above to fire and update the UI.
	    database.ref("/shiplist1").push({
	      	starship: starship,
			registery: registery,
			starbase: starbase,
			launchTime: launchTime,
			duration: duration
	    });
	});

	// --------------------------------------------------------------

		// At the initial load and subsequent value changes, get a snapshot of the stored data.
		// This function allows you to update your page in real-time when the firebase database changes.
	database.ref("/shiplist1").on("child_added", function(snapshot) {

	    // Set the variables equal to the stored values.
	    starship = snapshot.val().starship;
	    registery = snapshot.val().registery;
	    starbase = snapshot.val().starbase;
	    launchTime = snapshot.val().launchTime;
//launchTime = parseInt(launchTime);
	    duration = snapshot.val().duration;

	// --------------------------------------------------------------
	// Calculate the minutes until arrival using hardcore math

    	// Current Time
    let currentTime = moment();
    let currentTimeM = moment(currentTime).format("hh:mm");
    let currentTimeU = moment(currentTime).format("X");
    	console.log("Current M Time: " + currentTimeM);
    	console.log("Current U Time: " + currentTimeU);

    	//subtract one day to set depature in the past.
   	launchTime = moment(launchTime, "HH:mm").subtract(1, "days");
		console.log(launchTime);
		
		//convert start time to unix time
   	let launchTimeM = moment(launchTime, "HH:mm").format("hh:mm");
   	let launchTimeU = moment(launchTime, "HH:mm").format("X");
   	    console.log("Launch M Time: " + launchTimeM);
    	console.log("Launch U Time: " + launchTimeU);
		
    	// Difference between the times
    let timeDiffM = moment().diff(moment(new Date(launchTimeM)), "hh:mm");
    let timeDiffU = moment().diff(moment(new Date(launchTimeU)), "X");
    let timeDiff = moment().diff(moment(launchTime));
	    console.log(timeDiffM);
		console.log(timeDiffU);
	   	console.log(timeDiff);
		console.log("*How Long Ago: " + moment(timeDiffM).format("hh:mm"));
		console.log("*How Long Ago U: " + moment(timeDiffU).format("X"));
		console.log("*How Long Ago test: " + moment(timeDiff).format("hh:mm"));

 timeDiff = moment().diff(launchTime, "hh:mm");
    	console.log("DIFFERENCE IN TIME: " + timeDiff);

//let months = moment(snapshot.val().date, 'YYYY-MM-DD').fromNow();
//console.log("Time Worked is "+ months);

//convert duration to unix time

			// To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency.

	    duration = parseInt(duration);
    	let durationU = duration * 60000
    	let durationUcheck = moment().diff(moment(durationU), "hh:mm");
			console.log("*How Long Ago test: " + durationUcheck);


let remainderTime = timeDiff % duration;
eta = duration - remainderTime;
// To calculate the arrival time, add the tMinutes to the current time
nextArrival = moment().add(eta, "m").format("hh:mm A");
	
		// console.log(starship);
		// console.log(registery);
		// console.log(starbase);
		// console.log(launchTime);
		// console.log(duration);

      	let tableHtml = $("<tr>");
      	let shipHtml = $("<td>").text("USS " + snapshot.val().starship);
      	let registeryHtml = $("<td>").text("NCC-1" + snapshot.val().registery);
      	let starbaseHtml = $("<td>").text(snapshot.val().starbase);
      	let durationHtml = $("<td>").text(snapshot.val().duration);
      	let nextArrivalHtml = $("<td>").text(nextArrival);
      	let etaHtml = $("<td>").text(eta);

      	tableHtml.append(shipHtml).append(registeryHtml).append(starbaseHtml).append(durationHtml).append(nextArrivalHtml).append(etaHtml);

      	$("#fleet").append(tableHtml);

		  // If any errors are experienced, log them to console.
		}, function(errorObject) {
		  console.log("The read failed: " + errorObject.code);
	});









});








