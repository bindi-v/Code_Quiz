// Arrays used to give question on screen
var questions = [
    {   question:" Which element in HTML have self-closing tag?",
         options: ["A. main", "B. img", " C. p", "D. a"],
         correctAnswer : 1,
  },
  {
    question:"On which elements you create style in CSS?",
      options : ["A. class", "B. id", "C. div ", " D. all of above"], 
      answer : 3,
  },
  {
    question: "For which purpose we use Hex Code?",
    options : ["A. specific color", "B. specific font-family ", "C. specific margin ", "D. specific width"],
    answer : 0,
  },
  {
    question: "SSH stands for...",
    options : [" A. Secure Search Hyperlink", " B. Secure Style Code", " C. Secure Shell Keys", " D. Search Secure Hypertext"],
    answer : 2,
  },
  {
    question : "If you want to create a new file, Then what command you should write in Git Bash? ",
    options : [" A. mkdir ", " B. cd ", "C. touch ", " D. pwd"],
    answer : 2,
  },
 ];

var quizCard = document.querySelector(".quiz-card");
var startBtn = document.querySelector(".start-btn");
var quitBtn = document.querySelector(".quit-btn");
var quiz = document.querySelector(".quiz");

var timer = document.querySelector(".timer-text");
var answers = document.querySelector(".answers");
var questionEl = document.querySelector(".questions");
var btnA = document.querySelector(".btnA");
var btnB = document.querySelector(".btnB");
var btnC = document.querySelector(".btnC");
var btnD = document.querySelector(".btnD");

var questionNumber = 0;
var score = 0;
var scoreCard = document.querySelector(".scorecard");
var displayScore = document.querySelector(".display-score");
var initials = document.querySelector(".initials");
var submitBtn = document.querySelector(".submit-btn");

var timeLeft = 50;
var replayBtn = document.querySelector(".replay");
var exitBtn = document.querySelector(".exit");
var currentQuestion;
var timeInterval;

init();

function init() {
    quiz.style.display = "none";
    scoreCard.style.display="none";
    quizCard.style.display ="block";
    timer.style.display="none";
};

startBtn.addEventListener("click", startGame);
quitBtn.addEventListener("click", quitGame);

function startGame(){
    startTimer();
    quizCard.style.display="none";
    quiz.style.display="block";
    timer.style.display="block";
    questionNumber = 0;
    createQuestions();
};
function getIndexFromId(id) {
    var ids = ["btnA", "btnB", "btnC", "btnD"];
    return ids.indexOf(id);
}
function checkAnswer(event) {
    var userAnswer = getIndexFromId(event.target.id);
    if (userAnswer === currentQuestion.answer) {
        score++
    } else {
        timeLeft = timeLeft - 10;
        
    }
}

function createQuestions() {
    currentQuestion = questions[questionNumber];

    if (questionNumber < questions.length) {
        questionEl.textContent = currentQuestion.question;
        btnA.innerHTML = currentQuestion.options[0];
        btnB.innerHTML = currentQuestion.options[1];
        btnC.innerHTML = currentQuestion.options[2];
        btnD.innerHTML = currentQuestion.options[3];
    }
    
    btnA.addEventListener("click", checkAnswer);
    btnB.addEventListener("click", checkAnswer);
    btnC.addEventListener("click", checkAnswer);
    btnD.addEventListener("click", checkAnswer);
    answers.addEventListener("click", nextQuestion);;
} 

function nextQuestion() {
    if (questionNumber < questions.length) {
        questionNumber++;
        createQuestions();
    } 
    if (questionNumber === questions.length) {
        showScoreCard();
        stopTimer();
    }
}

function showScoreCard() {
    console.log("scoreCard")
    console.log(score);
    quiz.style.display = "none";
    timer.style.display = "none";
    scoreCard.style.display="block";
    displayScore.textContent="You got: " + score + "  correct!";
}
var highScore = [];
function saveScore (){
    var name = initials.value;
    var newScore = {"name": name, "score": score}
        highScore.push(newScore);
    //{name, score};
    localStorage.setItem("highScore", JSON.stringify(highScore));
    console.log(saveScore)
}

function displayScores() {
    var showScores = JSON.parse(localStorage.getItem("highScore"));
    console.log(showScores);
    if (showScores !== null) {
        for (var i = 0; i < showScores.length; i++){
    
     document.getElementById("display-name").innerHTML = showScores[i].name;
    
    document.getElementById("scores-display").innerHTML = showScores[i].score;
        }
    } else { 
        return;
    }
}

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    saveScore();
    displayScores();
});

function replayQuiz(){
    quiz.style.display="block";
    scoreCard.style.display="none";
    timer.style.display="none";
    timeLeft = 50;
    questionNumber = 0;
    score= 0 ;
    startGame();
}

replayBtn.addEventListener("click", replayQuiz);
exitBtn.addEventListener("click", init);
function loseGame() {
    quiz.textContent = "Times Up!"
}

function quitGame() {
    quizCard.textContent = "Thank You!!"
}

function startTimer() {
    timeInterval = setInterval(function(){
        if (timeLeft > 1) {
            timer.textContent = " Remaining Sec :" + timeLeft ;
            timeLeft--;
        } else {
            console.log("End Game")
            timer.textContent = "";
            loseGame();
            clearInterval(timeInterval);
        }
    }, 1000) 
}

function stopTimer() {
    clearInterval(timeInterval);
}