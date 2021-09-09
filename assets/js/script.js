var questionContainer = document.querySelector('#question-div');
var questionTitle = document.querySelector('#questions-title');
var questionChoices = document.querySelector('#choice');
var score = document.querySelector("#score");
var scoreHeader = document.querySelector('#highScoreHeader')
var timerCount = document.querySelector(".timer-count");
var startButton = document.querySelector('#start-button');
var time = 100;
var timer;
var startContainer = document.querySelector('#rules-container')
var gameOverContainer = document.querySelector('#gameOver');
var index = 0;
var initials = document.querySelector('#initialsText');
var submitButton = document.querySelector('#submit')
var scoreListContainer = document.querySelector('#scoreList');
var highScoresListIteam = document.querySelector('#highScores');
var returnButton = document.querySelector('#returnBut');

var playersInfo = [];

var questionsLoop = [
    {
      question: "Question One",
      answers: ["one", "two", "three", "four"],
      correctAnswer: "one",
    },
    {
      question: "Question Two",
      answers: ["one", "two", "three", "four"],
      correctAnswer: "two",
    },
    {
      question: "Question Three",
      answers: ["one", "two", "three", "four"],
      correctAnswer: "three",
    },
    {
      question: "Question Four",
      answers: ["one", "two", "three", "four"],
      correctAnswer: "four",
    },
];

function init() {
    var playersInfoObj = JSON.parse(localStorage.getItem("playersInfo"));
    scoreHeader.textContent = playersInfoObj.score;
}

function startQuiz() {
    //when the quiz starts we need to hide the start screen 
    startContainer.setAttribute('class', 'hidden')
    //show the question screen
    questionContainer.removeAttribute('class')
    //we need to start the time
    timer = setInterval(function (){
        //suctract 1 second from the time
        time --;
        timerCount.textContent = time

        if(time <= 0){
            end()
        }
    },1000)


renderQuestions();

}

function renderQuestions(){
    //we need the question & options to generate on the page. 
   // we need to pass the index so that we know where we are in the question array
    var currentQuestion = questionsLoop[index] //querstionsLoop[0]

   //update the title of the question on the page
    questionTitle.textContent = currentQuestion.question;

    questionChoices.innerHTML = "";

   //create a loop of our answers and generate a button for each
    for (var i = 0; i < currentQuestion.answers.length; i++) {
      
       var buttonEl = document.createElement("button");
       buttonEl.setAttribute('class', 'choice');
       buttonEl.setAttribute('value', currentQuestion.answers[i] )

       buttonEl.textContent = currentQuestion.answers[i]

       buttonEl.onclick = buttonClick;

       questionChoices.appendChild(buttonEl)
    }
}

function buttonClick(){
//if the user is wrong subtract 10 seconds

    if(this.value !== questionsLoop[index].correctAnswer){
    time-= 10;

    if(time < 0){
        time = 0
    }
    //show the new time onthe page
    timerCount.textContent = time
    }

    index++;

    if(index === questionsLoop.length){
        end()
    }
    else{
        renderQuestions()
    }
}

function end() {
    clearInterval(timer);
    //show the end container
    gameOverContainer.removeAttribute('class')
    //hide the question container
    questionContainer.setAttribute('class', 'hidden')
    //show the final score
    score.textContent = time
    return;
}

//create a fucntion that saves the initials and score into local storage. 
function saveScoreName() {
//take the final time and make it the score 
    var playersInfo = {
        initials: initials.value,
        score: time,
    };
    localStorage.setItem("playersInfo", JSON.stringify(playersInfo));

return playersInfo;
}

// How to get the submitButton to also execute with Enter Key
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveScoreName();
    // renderLastGrade();
    showHighScores();
});



function showHighScores() {

    scoreListContainer.removeAttribute('class');
    gameOverContainer.setAttribute('class', 'hidden');

    var li = document.createElement("li");
    // li.textContent = playersInfoObj;
    
    var playersInfoObj = JSON.parse(localStorage.getItem("playersInfo"));

    li.textContent = (playersInfoObj.initials + " - " + playersInfoObj.score);

    highScoresListIteam.appendChild(li);

    
return;
};

returnButton.addEventListener("click", function(event) {
    event.preventDefault();
    location.reload();
});

startButton.onclick = startQuiz;

init();