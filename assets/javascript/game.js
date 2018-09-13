
//load stuff
$(document).ready(function () {

  //establish questions as objects
  let question0 = {
    question: "Who represented Humanity when they made first contact with the Vulcans?",
    choice: ["Doctor Zefram Cochrane", "Colonel Phillip Green", "Doctor Henry Archer", "Doctor Emory Erickson"],
    correctButton: "aChoice",
    correct: "aChoice",
  };

  let question1 = {
    question: "Which Human was key to arranging an alliance between the Vulcans and the Andorians?",
    choice: ["Admiral Maxwell Forrest", "Captain Jonathan Beckett Archer", "Captain Jean-Luc Picard", "Captain Erika Hernandez"],
    correct: "bChoice",
  };

  let question2 = {
    question: "What year was the United Federation of Planets founded in?",
    choice: ["2161 CE", "2155 CE", "2063 CE", "2256 CE"],
    correct: "aChoice"
  };

  let question3 = {
    question: "What battle started the first Federation-Klingon war?",
    choice: ["Battle of Vulcanis", "Battle of Organia", "Battle of T'Kuvma", "Battle of the Binary Stars"],
    correct: "dChoice"
  };

  let question4 = {
    question: "Which starship first successfully used a Displacement-Activated Mycelial Spore Hub Drive?",
    choice: ["USS Enterprise NCC-1701", "USS Enterprise NCC-1701-D", "USS Discovery NCC-1031", "USS Voyager NCC-74656"],
    correct: "cChoice"
  };

  let question5 = {
    question: "Which starship captain turned back the Romulan Star Empire’s incursion on stardate 1709.1 (2266 CE)?",
    choice: ["Captain Gabriel Lorca", "Captain James Tiberius Kirk", "Captain Philippa Georgiou", "Captain Hikaru Walter Sulu"],
    correct: "bChoice"
  };

  let question6 = {
    question: "In which sector were Doctor Carol Marcus’ experiments into the Genesis Effect undertaken?",
    choice: ["Sector 001", "Bajor Sector", "Gamma Hydra Sector", "Mutara Sector"],
    correct: "dChoice"
  };

  let question7 = {
    question: "Which two starships saved the first Khitomer Conference from being destroyed by political extremists?",
    choice: ["USS Enterprise NCC-1701-E and USS Defiant NX-74205", "USS Enterprise NCC-1701-A and USS Excelsior NCC-2000", "USS Discovery NCC-1031 and USS Shenzhou NCC-1227", "USS Enterprise NCC-1701 and USS Federation NX-2100"],
    correct: "bChoice"
  };

  let question8 = {
    question: "As of the 24th century, what is the most massive starship ever constructed by Starfleet?",
    choice: ["Galaxy Class", "Excelsior Class", "Sovereign Class", "Nebula Class"],
    correct: "aChoice"
  };

  let question9 = {
    question: "Which Starfleet officer led the attack on the Borg at the battle of Wolf 359?",
    choice: ["Admiral James Tiberius Kirk", "Captain Kathryn M. Janeway", " Admiral J.P. Hanson", "Captain Jean-Luc Picard"],
    correct: "cChoice"
  };

  let question10 = {
    question: "Who was the first Klingon to graduate from Starfleet Academy?",
    choice: ["B'Elanna Torres of the House of L'Naan", "Worf of the House of Mogh", "J'Dan of the House of House of Duras", "Kurn of the House of Mogh"],
    correct: "bChoice"
  };

  let question11 = {
    question: "Who was the first artificial intelligence to serve as an officer in Starfleet?",
    choice: ["Data", "Voyager's Emergency Medical Hologram", "M-5 Multitronic Computer Unit", "Ilia"],
    correct: "aChoice"
  };

  let question12 = {
    question: "Which Federation starship was the first to explore the Delta Quadrant? ",
    choice: ["USS Voyager NCC-74656", "USS Defiant NX-74205", "USS Enterprise NCC-1701-D", "USS Stargazer NCC-2893"],
    correct: "aChoice"
  };

  let question13 = {
    question: "Which two Starfleet officers discovered the Bajoran Wormhole?",
    choice: ["Benjamin Lafayette Sisko and Jadzia Dax", "Jadzia Dax and Julian Subatoi Bashir", "Julian Subatoi Bashir and Miles Edward O'Brien", "Data and Geordi La Forge"],
    correct: "aChoice"
  };

  let question14 = {
    question: "The Alliance against the Dominion consisted of the Federation, the Klingon Empire, and which other major space power?",
    choice: ["The Breen Confederacy", "The Cardassian Union", "The Romulan Star Empire", "The Son'a Solidarity"],
    correct: "cChoice"
  };

  let question15 = {
    question: "Which Starflet officer defied orders to reveal the Starfleet/Son’a scandal to the Federation Council?",
    choice: ["Captain Benjamin Lafayette Sisko", "Admiral Matthew Dougherty", "Captain Kathryn M. Janeway", "Commander William Thomas Riker"],
    correct: "dChoice"
  };

  let question16 = {
    question: "Which starship was responsible for stopping Praetor Shinzon from starting a war between the Romulan Star Empire and the United Federation of Planets?",
    choice: ["USS Defiant NX-74205", "USS Enterprise NCC-1701-A", "USS Enterprise NCC-1701-D", "USS Enterprise NCC-1701-E"],
    correct: "dChoice"
  };

  let question17 = {
    question: "Which Federation Ambassador was lost in a temporal rift while trying to save Romulus and Remus from destruction by the Hobus Supernova?",
    choice: ["Ambassador Lwaxana Troi", "Ambassador Sarek", "Ambassador Spock", "Lieutenant Commander Data"],
    correct: "cChoice"
  };





  //** REST OF QUESTIONS GO HERE

  //establish variables
  let allQuestions = [question0, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14, question15, question16, question17];
  let currentQuestion;
  let questionAnswered = false;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let timeOnTimer = 30;
  let i = -1;
  let percent;

  function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  //  Variable that will hold our setInterval that runs the timer
  let intervalId;
  // prevents the timer from being sped up unnecessarily
  let clockRunning = false;

  //code to start master timer
  // Our timer object
  let timer = {
    time: timeOnTimer,
    // Use setInterval to start the count here and set the clock to running.
    start: function () {
      // Use setInterval to start the count here and set the clock to running.
      if (!clockRunning) {
        intervalId = setInterval(timer.count, 1000);
        clockRunning = true;
      }
      let audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "assets/sound/newquestion.mp3");
      audioElement.play();
    },
    stop: function () {
      // Use clearInterval to stop the count here and set the clock to not be running.
      clearInterval(intervalId);
      clockRunning = false;
    },
    count: function () {
      // increment time by 1, remember we cant use "this" here.
      timer.time--;
      // Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.
      let converted = timer.timeConverter(timer.time);
      console.log(converted);
      // Use the variable we just created to show the converted time in the "display" div.
      $("#timer").text(converted);
      if (timer.time === 5) {
        let audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "assets/sound/fivesec.mp3");
        audioElement.play();
      }
      if (timer.time === 0) {
        console.log(timer.time);
        timesUp();
        let audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "assets/sound/button2.mp3");
        audioElement.play();
      }
    },
    timeConverter: function (t) {
      let minutes = Math.floor(t / 60);
      let seconds = t - (minutes * 60);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (minutes === 0) {
        minutes = "00";
      }
      else if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return minutes + ":" + seconds;
    }
  };

  function timesUp() {
    console.log('Hello');
    wrongAnswers = wrongAnswers + 1;
    chosen()
    $(".seal").hide();
    $(".status").html("Time has expired - Time is the fire in which we burn.");
    //code to present 'times up' pic
    $(".timesup").show();
    //code to prevent more questions being picked
    questionAnswered = true;

    if (questionAnswered === true && i < allQuestions.length - 1) {
      setTimeout(function () {
        //code to activate next question
        initializeQuestion();
      }, 4000);
    }
    if (questionAnswered === true && i >= allQuestions.length - 1) {
      gameOver();
    }
  }



  //game reset code
  function initializeGame() {
    //code to allow answers to be picked
    i = -1;
    correctAnswers = 0;
    wrongAnswers = 0;
    $(".question").show();
    $(".instructions").show();
    $(".instructions1").hide();
    $(".timesup").hide();
    $(".status").hide();
    $(".failure").hide();
    $(".success").hide();
    $(".timesup").hide();
    //shuffle questions
    allQuestions = shuffle(allQuestions);
  };

  //question reset code
  function initializeQuestion() {
    //create a function to select each question and present it
    //create code to present each question and answers in turn
    i = i + 1;
    timer.time = timeOnTimer;
    console.log(i);
    $(".answer").show();
    $(".score").show();
    $(".score1").html("Correct Answers: " + correctAnswers);
    $(".score2").html("Incorrect Answers: " + wrongAnswers);
    $(".answer").prop('disabled', false);
    $(".timesup").hide();
    $(".status").hide();
    $(".failure").hide();
    $(".success").hide();
    $("#timer").text("00:30");
    if (!clockRunning) {
      intervalId = setInterval(timer.count, 1000);
      clockRunning = true;
    }
    $(timer.start);
    if (questionAnswered === true) {
      questionAnswered = false;
    }
    $(".seal").show();
    //code to allow answers to be picked
    currentQuestion = allQuestions[i].question;
    console.log(currentQuestion);
    $(".question").html(currentQuestion);
    currentAChoice = allQuestions[i].choice[0];
    console.log(currentAChoice);
    $("#aChoice").html(currentAChoice);
    currentBChoice = allQuestions[i].choice[1];
    console.log(currentBChoice);
    $("#bChoice").html(currentBChoice);
    currentCChoice = allQuestions[i].choice[2];
    console.log(currentCChoice);
    $("#cChoice").html(currentCChoice);
    currentDChoice = allQuestions[i].choice[3];
    console.log(currentDChoice);
    $("#dChoice").html(currentDChoice);
    correctChoice = allQuestions[i].correct;
    console.log(correctChoice);
  };

  function chosen() {
    //stops timer
    $(timer.stop);
    clockRunning = false;
    //code to prevent more questions being picked
    $(".answer").prop('disabled', true);
    //hide other answers
    $(".answer").hide();
    //show correct answer
    $("[value='" + correctChoice + "']").show();
    //show result info
    $(".status").show();
    //code to show score
    $(".score").show();
    console.log(correctAnswers);
    console.log(wrongAnswers);
    percent = Math.round(correctAnswers * 100 / (correctAnswers + wrongAnswers));
    console.log(percent)
    $(".score1").html("Correct Answers: " + correctAnswers);
    $(".score2").html("Incorrect Answers: " + wrongAnswers);
    $(".score3").html("Percentage Correct: " + percent + "%");
  };

  function gameOver() {
    console.log("GAME OVER");
    setTimeout(function () {
      $(".instructions").hide();
      $(".question").hide();
      $(".answer").hide();
      $(".success").hide();
      $(".failure").hide();
      $(".current").hide();
      $(".timesup").hide();
      $(".status").hide();
      $(".startgame").html("Start Exam Again");
      $("#startgame").show();
      $("#startgame").click(function () {
        initializeGame();
        initializeQuestion();
        $(".startgame").hide();
      });
    }, 4000);
  }

  //start game (over)
  $(".instructions").hide();
  $(".question").hide();
  $(".answer").hide();
  $(".success").hide();
  $(".failure").hide();
  $(".current").hide();
  $(".timesup").hide();
  $(".status").hide();
  $(".instructions1").show();
  $(".startgame").html("Start Exam");
  $("#startgame").show();
  $("#startgame").click(function () {
    initializeGame();
    initializeQuestion();
    $(".startgame").hide();
  });

  $('.answer').bind('click', function (evt) {

    if ($(this).val() === correctChoice) {
      console.log("Correct!");
      correctAnswers = correctAnswers + 1;
      chosen();
      $(".status").html("<h2>Correct!</h2>").append("<p>A Starfleet Officer's first duty is to the truth!</p>");
      $(".seal").hide();
      $(".success").show();
      questionAnswered = true;
      console.log(questionAnswered);
      let audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "assets/sound/button.mp3");
      audioElement.play();
    }
    else {
      wrongAnswers = wrongAnswers + 1;
      console.log("loser!");
      chosen();
      $(".status").html("<h2>Incorrect. See above for correct answer.</h2>").append("<p>Insufficient facts always invite danger.</p>");
      //code for duration
      $(".seal").hide();
      $(".failure").show();
      questionAnswered = true;
      console.log(questionAnswered);
      let audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "assets/sound/button3.mp3");
      audioElement.play();
    }

    if (questionAnswered === true && i < allQuestions.length - 1) {
      //code for duration
      setTimeout(function () {
        //code to activate next question
        initializeQuestion();
      }, 4000);
    }
    //code to reset game
    if (questionAnswered === true && i >= allQuestions.length - 1) {
      gameOver();
    }
  });
});








