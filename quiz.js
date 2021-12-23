//Select ALL Elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
//const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

//Create the Questions
let questions = [
  {
    question: "Who is Man Citys best player",
    choiceA: "Cancelo",
    choiceB: "DeBruyne",
    choiceC: "Diaz",
    correct: "A",
  },
  {
    question: "Who won the Premier League in 2021",
    choiceA: "Liverpool",
    choiceB: "Chelsea",
    choiceC: "ManCity",
    correct: "C",
  },
  {
    question: "Who has scored the most Goals in club History",
    choiceA: "Sterling",
    choiceB: "Arguero",
    choiceC: "Balotelli",
    correct: "B",
  },
  {
    question: "Where does Man City Play",
    choiceA: "The Kop",
    choiceB: "Bernebau",
    choiceC: "Etihad",
    correct: "C",
  },
  {
    question: "Who is Man Citys Coach",
    choiceA: "Howe",
    choiceB: "Zidane",
    choiceC: "Guardiola",
    correct: "C",
  },
  {
    question: "What former ManCity player plays for ManU",
    choiceA: "Sancho",
    choiceB: "Pogba",
    choiceC: "De Gea",
    correct: "A",
  },
  {
    question: "Who won Player of the Year in 2019",
    choiceA: "DeBruyne",
    choiceB: "Ederson",
    choiceC: "Delph",
    correct: "A",
  },
  {
    question: "What former City player plays for  RB Leipzig",
    choiceA: "Nasri",
    choiceB: "Kolorov",
    choiceC: "Angelino",
    correct: "C",
  },
];


 
//Variables
const lastQuestion = questions.length - 1;
let count = 0; 
let runningQuestion = 0;
const questionTime = 20;//  20seconds
const gaugeWidth = 150;// 150 px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER = setInterval(renderCounter, 2000); // 20 second timer
let score = 0;



//Render Question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

//Starting Quiz------> Question 1/Counter start
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s, 20 second timer
}

// render progress
function renderProgress(){
  for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
      progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }

}
//Counter Render
function renderCounter(){
  if(count <= questionTime){
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++
  }else{
      count = 0;
      //answer is wrong
      if(runningQuestion < lastQuestion){-
        runningQuestion++;
        renderQuestion();
      }else{
        // and quiz and show score
        clearInterval(TIMER);
        scoreRender();
      }
  }
}

//check Answer
function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct){
    //correct answer
    score++
    //change progress bar to green
    answerisCorrect();
  }else{
    // wrong answer
    //change progress bar to red
    answerisWrong()
  }
  count = 0
  if(runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  }else{
    // end the quiz and show score
    clearInterval(TIMER);
    scoreRender();
  }
}

//answer is correct
function answerisCorrect(){
  document.getElementById(runningQuestion).style.backgroundColor= "0f0";
}
// answer is wrong
function answerisWrong(){
  document.getElementById(runningQuestion).style.backgroundColor= "f00";
}

function scoreRender(){
    scoreDiv.style.display = "block";
    
    // Calcualte Questions the user answered
    const scorePercent = Math.round(100 * score/questions.length);
   
    //choose the Image based on the score percent
    let img = (scorePercent >= 80) ? "/img/5.png" :
              (scorePercent >= 60) ? "/img/4.png" :
              (scorePercent >= 40) ? "/img/3.png" :
              (scorePercent >= 20) ? "/img/2.png" : "/img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML = "<p>" + scorePercent +"%</p>";
}





















