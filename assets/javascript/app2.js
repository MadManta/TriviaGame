
function trivia() {
    this.userPick = null;
    this.answers = {
        correct: 0,
        incorrect: 0
    };
    this.images = null;
    this.count = 30;
    this.current = 0;
    this.questions = [{
        question: "In Aladdin, what is the name of Jasmine's pet tiger?",
        options: ["Rajah", "Bo", "Iago", "Jack"],
        images: ["../images/Rajah.gif"],
        correct: 0
    }, {
        question: "In Peter Pan, Captain Hook had a hook on which part of his     body?",
        options: ["Right Foot", "Left Hand", "Left Foot", "Right Hand"],
        correct: 1

    }, {
        question: "In the Lion King, where does Mufasa and his family live?",
        options: ["Rocky Mountain", "Forest", "Desert", "Pride Rock"],
        correct: 3

    }, {
        question: "In Beauty and the Beast, how many eggs does Gaston eat for    breakfast?",
        options: ["2 Dozen", "5 Dozen", "5000", "0"],
        correct: 1

    }, {
        question: "In Alice in Wonderland, what is the name of Alice’s kitten?",
        options: ["Dinah", "Sammie", "Kat", "Luna"],
        correct: 0

    }, {
        question: "After being on earth, where did Hercules first meet his   father Zeus?",
        options: ["Mount Olympus", "Greece", "In the Temple of Zeus", "Elysian   Fields"],
        correct: 2

    }, {
        question: "During the ballroom scene of Beauty & the Beast, what color is Belle’s Gown?",
        options: ["Yellow", "Blue", "Gold", "White"],
        correct: 2

    }, {
        question: "In Bambi, what word does the owl use to describe falling in love?",
        options: ["Whimsical", "Miserable", "Joyful", "Twitterpatted"],
        correct: 3
    }];
    this.ask = function() {
        if (this.questions[this.current]) {
            $("#countdown").html("Time remaining: " + "00:" + this.count + " secs");
            $("#questionv").html(this.questions[this.current].question);
            var optionsArr = this.questions[this.current].options;

            for (var i = 0; i < optionsArr.length; i++) {
                var button = $('<button>');
                button.text(optionsArr[i]);
                button.attr('data-id', i);
                $('#options').append(button);
            }
            window.triviaCounter = setInterval(this.timer, 1000);
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    this.questions.length - (this.answers.correct + this.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('body').show();
        }
    };
    this.timer = function() {
        this.count--;
        if (this.count <= 0) {
            setTimeout(function() {
                this.nextQ();
            });

        } else {
            $("#countdown").html("Time remaining: " + "00:" + this.count + " secs");
        }
    };
    this.nextQ = function() {
        this.current++;
        clearInterval(window.triviaCounter);
        this.count = 30;
        $('#countdown').html("");
        setTimeout(function() {
            this.cleanUp();
            this.ask();
        }, 1000)
    };
    this.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + this.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + this.answers.incorrect);
    };
    this.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        this.answers[string]++;
        $('.' + string).html(string + ' answers: ' + this.answers[string]);
    };
    return this;
};
var Trivia;

$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#options').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        _t = Trivia || $(window).trivia(),
        index = _t.questions[_t.current].correct,
        correct = _t.questions[_t.current].choices[index];

    if (userPick !== index) {
        $('#options').text("Wrong Answer! The correct answer was: " + correct);
        this.answer(false);
    } else {
        $('#options').text("Correct!!! The correct answer was: " + correct);
        this.answer(true);
    }
    this.nextQ();
});