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

var isTimerRunning = false;
var userPick;
var correctA = 0;
var incorrectA = 0;
var noAnswers = 0;
var currentQ = 0;
var timeLeft = 30;
var spacer = $("<div class='spacer'><br></div>");
var spacer2 = $("<div class='spacer'><br></div>");
var countDiv = $("<div class='countdown'>");
var questionDiv = $("<div class='question'>");
var optionsDiv = $("<div class='options'>");
var gameDiv = $("#gamewindow");

var questionArray = [{
    question: "When did Futurama first air?",
    options: ["1999", "2000", "2012", "2001"],
    images: ["assets/images/SpacePilot3000.png"],
    correct: 0 },
    {
    question: "What is the name of the delivery company?",
    options: ["Awesome Express", "Planet Express", "MomCo", "UPS (United Postal Space)"],
    images: ["assets/images/planex.png"],
    correct: 1 },
    {
    question: "Who is the captain of the Planet Express ship?",
    options: ["The Professor", "Philip J Fry", "Tornonga Lulu", "Turanga Leela"],
    images: ["assets/images/leela.gif"],
    correct: 3 },
    {
    question: "Bite my shiny metal...",
    options: ["Daffodil", "Antiquing", "Ass", "Chumpette"],
    images: ["assets/images/benderbutt.gif"],
    correct: 2 },
    {
    question: "In case of cannibalism, who should we eat first?",
    options: ["Lobster Zoidberg", "Lobster Neuberg", "Doctor Zoidberg", "Goat Curry"],
    images: ["assets/images/zoidberg.jpg"],
    correct: 2 },
    {
    question: "How many albums do the Beastie Boys have in the year 3001?",
    options: ["5", "7", "I don't know but can I borrow a blank tape?", "200"],
    images: ["assets/images/beastieboys.jpg"],
    correct: 1 },
    {
    question: "Who rules over the Amazonians?",
    options: ["Their emotions, amiright men?", "FEMPUTOR", "She-Ra of the Amazonians", "Bort"],
    images: ["assets/images/amazons.jpg"],
    correct: 1 },
    {
    question: "What kind of item does Hedonismbot put in...things?",
    options: ["Tiny greeting card robots", "Pheasants", "Butter", "Batteries"],
    images: ["assets/images/hedonismbot.jpg"],
    correct: 3 },
    {
    question: "What is the quickest way to a woman's heart?",
    options: ["Her parents", "Roses", "Candy", "Karaoke"],
    images: ["assets/images/parents.png"],
    correct: 0 },
    {
    question: "Who actually gives the worst advice in existence?",
    options: ["Zapp Brannigan", "Don't pick anything else", "Because the answer is the first one", "Zapp is seriously the worst."],
    images: ["assets/images/zapp.jpg"],
    correct: 0 },
    ];

/////////////////////////FUNCTIONS///////////////////////////


function nextQuestion() {
    currentQ++;
    timeLeft = 30;
    gameDiv.empty();
    optionsDiv.empty();
        if (currentQ <= 9) {
            displayQ();
        }
        else {
            finalScore();
        }
    
};

function displayQ() {
    //countDiv.show();

    var thirtySeconds = setInterval(countdown, 1000)

    function countdown() {
        isTimerRunning = true;

        
        index = questionArray[currentQ].correct;
        correct = questionArray[currentQ].options[index];
        

        if (timeLeft == 0) {
            clearTimeout(thirtySeconds);
            optionsDiv.html("Wrong answer! The answer was " + correct + ".<p> <img class='img-fluid' src='" + questionArray[currentQ].images + "'>");
            countDiv.html("<h2>Next question loading...</h2>");
            noAnswers++;
            setTimeout(nextQuestion, 2000);
        }
        else {
            timeLeft--;
            countDiv.html("<h2>You have " + timeLeft + " seconds left</h2>")
        }
    };

    questionDiv.html(questionArray[currentQ].question)

    var optionArray = questionArray[currentQ].options;
    
    for (var i = 0; i < optionArray.length; i++) {
        var list = $("<li>");
        list.html(optionArray[i]);
        list.attr("data-id", i);
        optionsDiv.append(list);
    }

    gameDiv.append(questionDiv);
    gameDiv.append(spacer);
    gameDiv.append(optionsDiv);
    gameDiv.append(spacer2);
    gameDiv.append(countDiv);
    countDiv.html("<h2>You have " + timeLeft + " seconds left</h2>")

    $("li").on("click", function(event) {
        var userPick = $(this).data("id");
            index = questionArray[currentQ].correct;
            correct = questionArray[currentQ].options[index];
            isTimerRunning = false;

        if (userPick !== index) { 
            countDiv.html("");
            incorrectA++;
            questionDiv.html("");
            optionsDiv.html("Wrong answer! The answer was " + correct + ".<p> <img class='img-fluid' src='" + questionArray[currentQ].images + "'>");
            clearInterval(thirtySeconds);
            setTimeout(nextQuestion, 3000);
        }
        else {
            countDiv.html("");
            correctA++;
            questionDiv.html("");
            optionsDiv.html("Correct!<p> <img class='img-fluid' src='" + questionArray[currentQ].images + "'>");
            clearInterval(thirtySeconds);
            setTimeout(nextQuestion, 3000);
        }
    
    });

};



function finalScore() {

    var replay = $("<div class='again'>");
    $("#gamewindow").html("Right Answers: " + correctA + "<p>Wrong Answers: " + incorrectA + "<p>Unanswered Questions: " + noAnswers)
    $("#gamewindow").append(replay)
    $(".again").append("<button type='button' class='btn btn-danger' id='playbutton'>Try again?</button>");

    $("#playbutton").click(function() {
        $(this).hide();
        gameDiv.empty();
        optionsDiv.empty();
        startGame();
    });

};

function startGame() {
    correctA = 0;
    incorrectA = 0;
    noAnswers = 0;
    currentQ = 0;
    timeLeft = 30;
    displayQ();
};

$("#start_button").click(function() {
    $(this).hide();
    startGame();
});



