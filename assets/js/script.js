var questionContainer = document.querySelector('#questionDiv');
var questionTitle = document.querySelector('#questionsTitle');
var questionChoices = document.querySelector('#choice');
var showAnswerResult = document.querySelector('#answerResult');
var score = document.querySelector('#score');
var scoreHeader = document.querySelector('#highScoreHeader')
var timerCount = document.querySelector('#timerCount');
var startButton = document.querySelector('#startButton');
var time = 100;
var timer;
var startContainer = document.querySelector('#rulesContainer')
var gameOverContainer = document.querySelector('#gameOver');
var index = 0;
var initials = document.querySelector('#initialsText');
var submitButton = document.querySelector('#submit')
var scoreListContainer = document.querySelector('#scoreList');
var highScoresListIteam = document.querySelector('#highScores');
var returnButton = document.querySelector('#returnBut');

var questionsLoop = [
    {
      question: "What does HTML stand for?",
      answers: ["Hot Mail", "Hypertext Markup Language", "How to Make Lasagna", "Hypertext Management Language"],
      correctAnswer: "Hypertext Markup Language",
    },
    {
      question: "What does CSS stand for?",
      answers: ["Cascading Style Sheeps", "Collating Style Sheets", "Cascading Section Sheets", "Cascading Style Sheets"],
      correctAnswer: "Cascading Style Sheets",
    },
    {
      question: "What does JS stand for?",
      answers: ["JumpScript", "JavaScore", "JavaScript", "JavaSprint"],
      correctAnswer: "JavaScript",
    },
    {
      question: "Which of the following is not a Programing Language?",
      answers: ["JavaScript", "Java", "Python", "Laser"],
      correctAnswer: "Laser",
    },
    {
      question: "Which of the following is not a Semantic Element of HTML?",
      answers: ["<section>", "<div>", "<details>", "<main>"],
      correctAnswer: "<div>",
    },
    {
      question: "How do you link a URL in HTML?",
      answers: ["<a href=", "<a rel=", "<script src=", "<href="],
      correctAnswer: "<a href=",
    },
    {
      question: "Which of the following is a Flex Container property?",
      answers: ["flex-box", "justify-items", "align-content", "flex-map"],
      correctAnswer: "align-content",
    },
    {
      question: "Which is the correct way of entering ConsoleLog?",
      answers: ["consolelog()", "console.(log)", "ConsoleLog()", "console.log()"],
      correctAnswer: "console.log()",
    },
    {
      question: "Which is not a way to declare a veriable in JavaScript?",
      answers: ["var", "fix", "const", "let"],
      correctAnswer: "fix",
    },
    {
      question: "What method is used to join several arrays into one?",
      answers: ["join()", "push()", "concat()", "toString()"],
      correctAnswer: "concat()",
    },
];

function init() {
    var playersInfoObj = JSON.parse(localStorage.getItem("playersInfo")) || [];
    
    playersInfoObj.sort(function(a,b){
        return b.score - a.score
    });

    scoreHeader.textContent = playersInfoObj[0].score;
};

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
};

function renderQuestions(){
    //we need the question & options to generate on the page. 
   // we need to pass the index so that we know where we are in the question array
    var currentQuestion = questionsLoop[index];

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
};

function clearingResult() {
    answerResult.innerHTML = "";
};

function buttonClick(){
//if the user is wrong subtract 10 seconds
    if(this.value !== questionsLoop[index].correctAnswer){
        time-= 10;
        answerIncorrect();

    if(time < 0){
        time = 0
    }
    //show the new time onthe page
    timerCount.textContent = time
    setTimeout(clearingResult, 2000);
    }

    if(this.value === questionsLoop[index].correctAnswer){
        answerCorrect();
        setTimeout(clearingResult, 2000);
    }

    index++;

    if(index === questionsLoop.length){
        end()
    }

    else{
        renderQuestions()
    }
};

function answerCorrect() {
    answerResult.textContent = "Correct!"
};

function answerIncorrect() {
    answerResult.textContent = "Wrong!"
};

function end() {
    clearInterval(timer);
    //show the end container
    gameOverContainer.removeAttribute('class')
    //hide the question container
    questionContainer.setAttribute('class', 'hidden')
    //show the final score
    score.textContent = time
    return;
};

//create a fucntion that saves the initials and score into local storage. 
function saveScoreName() {
    var scoreInfo = JSON.parse(localStorage.getItem("playersInfo")) || [];

//take the final time and make it the score 
    var playersInfo = {
        initials: initials.value,
        score: time,
    };

    scoreInfo.push(playersInfo)
    localStorage.setItem("playersInfo", JSON.stringify(scoreInfo));
}

function showHighScores() {
    
    scoreListContainer.removeAttribute('class');
    gameOverContainer.setAttribute('class', 'hidden');
    
    var playersInfoObj = JSON.parse(localStorage.getItem("playersInfo")) || [];
    
    playersInfoObj.sort(function(a,b){
        return b.score - a.score
    })
    
    for (let i = 0; i < 10; i++) {
        var li = document.createElement("li");

        li.textContent = playersInfoObj[i].score + " - " + playersInfoObj[i].initials;

         highScoresListIteam.appendChild(li);     
    }
};

function pressEnter(event){
    if(event.key === "Enter"){
        saveData();
    }
};

function reload(){
    location.reload()
};

function saveData(){
    saveScoreName();
    showHighScores();
};

// How to get the submitButton to also execute with Enter Key
submitButton.onclick = saveData;

returnButton.onclick = reload;

startButton.onclick = startQuiz;

initials.onkeyup = pressEnter;

init();