/*

Trivia Guessing Game Necessities:

-Press "Play Game" to start game
-10 Questions with 4 possible answers (only 1 is true)
    - Check trivia.fyi for questions
-Countdown Timer for every question
-Responses for wrong and right answers
-Countdown Timer for wrong/right screen that then switches to next question
-After all 10 questions are answered, score is calibrated and shown
-Option to press "Play Again?" to start game over


*/

var correct = 0;
var incorrect = 0;
var noAnswers = 0;
var currentQ = 0;

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


$("#question").html(questionArray[currentQ].question)

var userPick;

    if (userPick != this.questionArray[currentQ].correct) {
        // display "Wrong! The correct answer was " + correct
        // nextQuestion();
    }
    else {
        // display "Correct!"
        // nextQuestion();
    };

function start() {

};


var timeLeft = 30;
var thirtySeconds = setInterval(countdown, 1000)

function countdown() {

    if (timeLeft == 0) {
        clearTimeout(thirtySeconds);
        /* 
        will need to run a "time's up!" function, separate from "win/lose" with its own score counter.


        */
    }
    else {
        timeLeft--;
        $("#countdown").html("<h2>" + timeLeft + "</h2>")
    }
    
  }

  $("#startbutton").click(function() {
    start();
    $(this).hide();
  });