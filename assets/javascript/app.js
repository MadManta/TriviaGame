/*

Trivia Guessing Game Necessities:

-Press "Play Game" to start game
-10 Questions with 4 possible answers (only 1 is true)
    - Check trivia.fyi for questions
-Countdown Timer for every question
-User must be able to click on an answer
-Responses for wrong and right answers
-Countdown Timer for wrong/right screen that then switches to next question
-After all 10 questions are answered, score is calibrated and shown
-Option to press "Play Again?" to start game over


*/

/////////////////////////GLOBAL VARIABLES///////////////////////////

var userPick;
var correct = 0;
var incorrect = 0;
var noAnswers = 0;
var currentQ = 0;
var timeLeft = 30;
var thirtySeconds = setInterval(countdown, 1000)

var questionArray = [{
    question: "Pupusas are from what country?",
    options: ["El Salvador", "Nicaragua","Mexico", "Uruguay"],
    images: [""],
    correct: 0 },
    {
    question: "Sriracha is named after a city in which country?",
    options: ["Cambodia", "China", "Thailand", "Vietnam"],
    images: [""],
    correct: 2},
    {
    question: "Champagne is manufactured in which country?",
    options: ["Germany", "Spain", "USA", "France"],
    images: [""],
    correct: 3},
    ];

/////////////////////////FUNCTIONS///////////////////////////

function nextQuestion() {
    currentQ++;
    displayQ();
};

function displayQ() {
    $("#question").html(questionArray[currentQ].question)

    var optionArray = questionArray[currentQ].options;
    
    for (var i = 0; i < optionArray.length; i++) {
        var list = $("<li>");
        list.html(optionArray[i]);
        list.attr("data-id");
        $("#options").append(list);
    }


};

function choose() {
    $(questionArray[currentQ].options).click( );
}

    if (userPick != this.questionArray[currentQ].correct) {
        // display "Wrong! The correct answer was " + correct
        // $("#question").empty();        
        // nextQuestion();
    }
    else {
        // display "Correct!"
        // $("#question").empty();        
        // nextQuestion();
        
    };

function start() {
    $("#question").html(questionArray[currentQ].question)
    
};

function countdown() {

    if (timeLeft == 0) {
        clearTimeout(thirtySeconds);
        /* 
        will need to run a "time's up!" function, separate from "win/lose" with its own score counter.


        */
    }
    else {
        timeLeft--;
        $("#countdown").html("<h2>You have " + timeLeft + " seconds left</h2>")
    }
    
  }

////////////////////////GAME START////////////////////////////

  $("#startbutton").click(function() {
    start();
    $(this).hide();
  });

  $("#options").click(function(e) {
    var userPick = $(this).data("id"),

        index = questionArray[currentQ].correct,
        correct = questionArray[currentQ].choices[index];

    if (userPick !== index) {
        $("#options").text("Wrong answer! The correct answer is " + correct);
        answer(false);
    }
    else {
        $("#options").text("Correct!");
        answer(true);
    }
  });

  function answer(correct) {
    var string = correct ? 'correct' : 'incorrect';
    options[string]++;
    $('.' + string).html(string + ' options: ' + options[string]);
  }

  displayQ();