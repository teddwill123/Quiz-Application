var startButton = document.querySelector("#start");                
var questionsDisplay = document.querySelector("#questions");       
var currentQuestionIndex = 0;                                
var timeLeft = 75;                                                
var score = 0;                                                      
var quizEnded = false;                                              

const timer = document.getElementById("time");                     
const firstAnswer = document.getElementById("answer-1");         
const secondAnswer = document.getElementById("answer-2");           
const thirdAnswer = document.getElementById("answer-3");           
const fourthAnswer = document.getElementById("answer-4");          
const submitButton = document.getElementById("submit");             

firstAnswer.addEventListener("click", checkAnswer);                 
secondAnswer.addEventListener("click", checkAnswer);                
thirdAnswer.addEventListener("click", checkAnswer);             
fourthAnswer.addEventListener("click", checkAnswer);             
startButton.addEventListener("click", startTheQuiz);           
submitButton.addEventListener("click", saveScore);           

// A function that initiates the quiz by starting it.
function startTheQuiz () {
    timerCountdown();                                                           
    const startScreenDisplay = document.getElementById("start-screen");            
    startScreenDisplay.remove();                                                   
    const showQuestions = document.getElementById("questions");                 
    showQuestions.classList.remove("hide");                                    
    showQuestionsAndAnswers (timeLeft, quizQuestions[currentQuestionIndex]); 
}

// A function that counts down from a specified time in 1-second increments.
function timerCountdown () {
    var timeDeduct = setInterval(function() {                                       

        if (quizEnded === true) {                                                   
            clearInterval(timeDeduct);                                             
        };

        if (timeLeft > 0) {                                                     
            timer.textContent = timeLeft;               
            timeLeft--;                                                             
        } else {                                                                   
            clearInterval(timeDeduct);                                              
            endTheQuiz();                                                       
        };
    }, 1000);                                                                       
}

// A function that displays the questions and answer choices to the user.
function showQuestionsAndAnswers (time, currentQuestionData) {

    const currentQuestionH2 = document.getElementById("question-title");            

    if (currentQuestionIndex+1 > quizQuestions.length) return;            

    if (time > 0) {                                                                 
        currentQuestionH2.textContent = currentQuestionData.question;               
        firstAnswer.textContent = currentQuestionData.answerChoices[0];             
        secondAnswer.textContent = currentQuestionData.answerChoices[1];            
        thirdAnswer.textContent = currentQuestionData.answerChoices[2];             
        fourthAnswer.textContent = currentQuestionData.answerChoices[3];          
    };
}

// A function that checks if the user's selected answer is correct or incorrect.
function checkAnswer (event) {
    const feedbackDiv = document.getElementById("feedback");                        
    feedbackDiv.classList.remove("hide");                                         
    const showFeedback = document.getElementById("feedback-alert");                
    var choices = quizQuestions[currentQuestionIndex].answerChoices;          
    var correctanswer = quizQuestions[currentQuestionIndex].correctAnswer;   
    var button = event.target;                                                    

    if (parseInt(button.getAttribute("data-index")) === choices.indexOf(correctanswer)) { 
        showFeedback.textContent = "Correct!";                                        
        score += 1;                                                                    
    } else {                                                                             
        showFeedback.textContent = "Wrong!";                                              
        timeLeft -= 10;                                                            
    };

    if (score >= 20 ) {                                                                  
        endTheQuiz();                                                                     
    }

    currentQuestionIndex++;                                                             
    showQuestionsAndAnswers (timeLeft, quizQuestions[currentQuestionIndex]);        
}

// A function that ends the quiz
function endTheQuiz () {
    const questionDiv = document.getElementById("questions");                           
    questionDiv.classList.add("hide");                                                  
    const endScreen = document.getElementById("end-screen");                       
    endScreen.classList.remove("hide");                                                   
    const feedbackDiv = document.getElementById("feedback");                            
    feedbackDiv.classList.add("hide");                                            

    const finalScoreSpan = document.getElementById("final-score");                 
    finalScoreSpan.textContent = score;                                               

    quizEnded = true;                                                                
    setTimeout(function() {                                                           
        timer.textContent = "Quiz Finished!";                                           
    }, 700);                                                                           
}

// A function that saves the user's score in the local storage.
function saveScore () {
    var initialsInput = document.getElementById("initials");                       
    var initials = initialsInput.value;                                                   
    var initialsAndScore = {initials, score};                                             
    var alreadyExistingScores = JSON.parse(localStorage.getItem("scores"));               
                                                        

    if (!alreadyExistingScores) {                                                         
        alreadyExistingScores = [];                                                      
    }

    var newScores = [...alreadyExistingScores, initialsAndScore];                         
    localStorage.setItem("scores", JSON.stringify(newScores));                            
}