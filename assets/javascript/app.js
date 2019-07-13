

var start = $("start");
var trivia = $("trivia");
var question = $("question");
var answerA = $("A");
var answerB = $("B");
var answerC = $("C");
var counter = $("counter");
var timeGauge = $("timeGauge");
var progress = $("progress");
var scoreDiv = $("scoreContainer");


var questions = [
    {
          prompt: "What color are apples?\n(a) Red/Green\n\ (b) Purple\n(c) Orange",
          answer: "a"
    },
    {
         prompt: "What color are Bananas?\n(a) Teal\n\ (b) Magenta\n(c) Yellow",
         answer: "c"
    },
    {
         prompt: "What color are strawberries?\n(a) Yellow\n\ (b) Red\n(c) Blue",
         answer: "a"
    }
];
var score = 0;

for(var i = 0; i < questions.length; i++){
    var response = window.prompt(questions[i].prompt);
    if(response == questions[i].answer){
         score++;
         alert("Correct!");
    } else {
         alert("WRONG!");
    }
}
alert("you got " + score + "/" + questions.length);




var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 10; 
var gaugeWidth = 150;
var gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;


function renderQuestion(){
    var q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    answerA.innerHTML = q.answerA;
    answerB.innerHTML = q.answerB;
    answerC.innerHTML = q.answerC;
}

start.addEventListener("click",startQuiz);

// start of trivia 
function startTrivia(){
    start.style.display = "none";
    renderQuestion();
    trivia.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}


function renderProgress(){
    for(var qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter 

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // shows the score at the end of the quiz
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
       
        score++;
        
        answerIsCorrect();
    }else{
       
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
       
        clearInterval(TIMER);
        scoreRender();
    }
}

// right and wrong answers
function answerIsCorrect(){
    $(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
   $(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
    scoreDiv.style.display = "block";
    
   // percentage of answered questions
    const scorePerCent = Math.round(100 * score/questions.length);
    
}
