
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
	let starship = "";
	let registery = "";
	let starbase = "";
	let launchTime = "";
	let duration = "";
	let nextArrival = "";
    let eta = "";
	let etaM = "";

	function getRandomIntInclusive(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return registery = Math.floor(Math.random() * (max - min + 1)) + min; 
	}

	// --------------------------------------------------------------

		// Whenever a user clicks the launch button
	$("#addship").on("click", function(event) {
	  	event.preventDefault();

	    let audioElement = document.createElement("audio");
	    audioElement.setAttribute("src", "assets/sound/command.mp3");
	    audioElement.play();

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
	    duration = snapshot.val().duration;

	// --------------------------------------------------------------
	// Calculate the minutes until arrival using hardcore math

    	// Current Time
    let currentTime = moment();
    let currentTimeM = moment(currentTime).format("HH:mm");
    let currentTimeU = moment(currentTime).format("X");
    	console.log("Current M Time: " + currentTimeM);
    	console.log("Current U Time: " + currentTimeU);

    let dateSD = moment(currentTime).format("DDDD");
    let hourSD = moment(currentTime).format("HH");
    let stardateH = 2.74 * hourSD / 24
    let stardateL = stardateH + 5000 + 1000 * dateSD / 365

    let stardateR = Math.round(stardateL * 10) / 10
    	console.log("Stardate: " + stardateR);
		$("#stardate").text("Current Stardate: " + stardateR);

	    // First Time
   	launchTime = moment(launchTime, "HH:mm")
		console.log(launchTime);

		//convert start time to unix time
   	let launchTimeM = moment(launchTime).format("HH:mm");
   	let launchTimeU = moment(launchTime).format("X");
   	    console.log("Launch M Time: " + launchTimeM);
    	console.log("Launch U Time: " + launchTimeU);
		
	if (launchTimeU < currentTimeU) {
    	console.log("SHIP ALREADY LAUNCHED!");

	    	// Difference between the times
		let timeDiff = moment().diff(moment(launchTime));
				//console.log(timeDiff);
				console.log("*How Long Ago U: " + moment(timeDiff).format("X"));
			// Calculate the minutes till arrival: take the current time in unix subtract the lauch time 
		let timeDiffU = currentTimeU - launchTimeU;
			console.log("*How Long Ago U check: " + timeDiffU);

		    //convert duration to unix time
		duration = parseInt(duration);
			console.log(duration);
		let durationU = duration * 60
			console.log(durationU);
		let durationUcheck = moment(durationU, 'X').format("m");
			console.log("Duration check U: " + durationUcheck);

		let durationMJS = duration * 60000
				console.log(durationMJS);
			let durationMJScheck =  moment(durationMJS).format("m");
			console.log("Duration check MJS: " + durationUcheck);

			// find the modulus between the difference and the frequency.
		let remainderTime = timeDiff % durationMJS;
		let remainderTimeU = timeDiffU % durationU;
			console.log("Remainder Time: " + remainderTime);
			console.log("Remainder U Time: " + remainderTimeU);

			//figure out ETA
		eta = durationMJS - remainderTime;
		//let etaU = durationU - remainderTimeU;
		etaM = moment(new Date(eta)).format("m");
		//let etaMU = etaU / 60;
		//etaMU = Math.round(etaMU);
			console.log("ETA: " + etaM);
			//console.log("ETA U: " + etaMU);

		// To calculate the arrival time, add the eta to the current time
	nextArrival = moment().add(eta);
	//nextArrivalU = moment().add(etaU);
	nextArrivalM = moment(nextArrival).format("HH:mm")
		console.log(nextArrivalM);

	}

	else {
		console.log("SHIP NOT LAUNCHED YET!");

		nextArrivalM = moment(launchTime).format("HH:mm");
			console.log("*Will Launch on: " + nextArrivalM);

		eta = currentTimeU - launchTimeU;
		etaM = -1 * eta / 60;
		etaM = Math.round(etaM);
			console.log("*How Long to wait: " + etaM);
	
	};

		//console.log(starship);
		//console.log(registery);
		//console.log(starbase);
		//console.log(duration);
		//console.log(nextArrivalM);
		//console.log("*How Long to wait: " + etaM);

      	let tableHtml = $("<tr>");
      	let shipHtml = $("<td>").text("USS " + snapshot.val().starship);
      	let registeryHtml = $("<td>").text("NCC-1" + snapshot.val().registery);
      	let starbaseHtml = $("<td>").text(snapshot.val().starbase);
      	let durationHtml = $("<td>").text(snapshot.val().duration + " Minutes");
      	let nextArrivalHtml = $("<td>").text(nextArrivalM);
      	let etaHtml = $("<td>").text(etaM + " Minutes");

      	tableHtml.append(shipHtml).append(registeryHtml).append(starbaseHtml).append(durationHtml).append(nextArrivalHtml).append(etaHtml);

      	$("#fleet").append(tableHtml);

		  // If any errors are experienced, log them to console.
		}, function(errorObject) {
		  console.log("The read failed: " + errorObject.code);
	});
});








