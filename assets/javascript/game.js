
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

//placeholder for eta calcuation stuff
    let nextArrival = "21:20";
    let eta = "50";

	// --------------------------------------------------------------

		// At the initial load and subsequent value changes, get a snapshot of the stored data.
		// This function allows you to update your page in real-time when the firebase database changes.
	database.ref().on("value", function(snapshot) {

	    // Set the variables equal to the stored values.
	    starship = snapshot.val().starship;
	    registery = snapshot.val().registery;
	    starbase = snapshot.val().starbase;
	    launchTime = snapshot.val().launchTime;
//launchTime = parseInt(launchTime);
	    duration = snapshot.val().duration;
	    duration = parseInt(duration);
	
		console.log(starship);
		console.log(registery);
		console.log(starbase);
		console.log(launchTime);
		console.log(duration);

		newShipLine = /*"<tr><th>Starship</th><th>Registry</th><th>Home Starbase</th><th>Patrol Duration</th><th>Next Arrival</th><th>ETA</th></tr>+"*/    "<tr>  <td>USS "+starship+"</td>  <td>NCC-1"+registery+"</td>  <td>"+starbase+"</td>  <td>"+duration+" Minutes</td>  <td>"+nextArrival+"</td>  <td>"+eta+" Minutes</td></tr>";

		$("#newships").html(newShipLine);


		  // If any errors are experienced, log them to console.
		}, function(errorObject) {
		  console.log("The read failed: " + errorObject.code);
	});

// --------------------------------------------------------------

    // Save the data in Firebase. This will cause our "value" callback above to fire and update
    // the UI.
    database.ref().set({
      	starship: starship,
		registery: registery,
		starbase: starbase,
		launchTime: launchTime,
		duration: duration
    });

  // Save new value to Firebase
  database.ref("/shiplist2").push({
    starship: starship
  });

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return registery = Math.floor(Math.random() * (max - min + 1)) + min; 
}

	// Whenever a user clicks the launch button
$("#addship").on("click", function(event) {
  	event.preventDefault();

	let starship = $("#starship").val().trim();
	let starbase = $("#starbase").val().trim();
	let launchTime = $("#launch").val().trim();
	let duration = $("#duration").val().trim();
	let bidderPrice = parseInt(duration);
  	getRandomIntInclusive(1, 999);

  	console.log(starship);
	console.log(registery);
	console.log(starbase);
	console.log(launchTime);
	console.log(duration);

    // Save the new price in Firebase. This will cause our "value" callback above to fire and update
    // the UI.
    database.ref().set({
      	starship: starship,
		registery: registery,
		starbase: starbase,
		launchTime: launchTime,
		duration: duration
    });

  // Save new value to Firebase
  shipList = database.ref("/shiplist2").push({
    starship: starship
  });

});

});








