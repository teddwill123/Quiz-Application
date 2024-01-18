var highscoreArea = document.getElementById("highscores");                                 
const clearScoresBtn = document.getElementById("clear");                                 
clearScoresBtn.addEventListener("click", clearHighscores);                               

// A function to display the Highscores. 
function showScores () {
    var scores = JSON.parse(localStorage.getItem("scores"));                               

    if (!scores) {                                                                        
        highscoreArea.innerHTML =  "";                                                     
        const scoreList = document.createElement("h3");                                      
        scoreList.textContent = `No Scores`;                                                  
        highscoreArea.appendChild(scoreList);                                                
        return;                                                                             
    };

    for (var i = 0; i < scores.length; i++) {                                           
        const scoreList = document.createElement("li");                                       
        highscoreArea.appendChild(scoreList);                                                 
    };    
}

// A function to remove the Highscores.
function clearHighscores () {
    localStorage.removeItem("scores");                                                    
    showScores();                                                                          
}

showScores();                                                                             