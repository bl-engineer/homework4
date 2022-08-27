// var detailsSection = document.querySelector("#details");
var quizSection = document.querySelector("#quiz");
var timerSection = document.querySelector("#timer");
var highscoresLink = document.querySelector("#highscores");

// Main sections
var quizHeader = document.createElement("h1")
var quizHeader2 = document.createElement("h2");
var main = document.createElement("section");
var result = document.createElement("p");

result.setAttribute("class", "result");

// Creating the homepage
var descriptionSection = document.createElement("section");
descriptionSection.setAttribute("style", "text-align:center");



descriptionSection.innerHTML = `
    <p style="text-align:center">
        Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!
    </p>
    <button id="startQuiz">Start Quiz</button>
`;

// Creating the quiz list
var choices = document.createElement("ol");
var choice1 = document.createElement("li");
var choice2 = document.createElement("li");
var choice3 = document.createElement("li");
var choice4 = document.createElement("li");

// Creating the results section and the form for initials
var initialsSection = document.createElement("section");
initialsSection.innerHTML = `
    <form>
        Enter initials: 
        <input id="initials" maxlength="10"/>
        <button id="submit">Submit</button>
    </form>
`;

// Creating section for high scores and a class of scoreList as attribute where we store the scores
var scoresSection = document.createElement("section");
scoresSection.setAttribute("class", "scoreList");

var time = 0;
var score = 0;
var index = 0;
var isTakingQuiz = false;

// Set up the first page and header to be `Coding Quiz Challenge`
quizHeader.textContent = "Coding Quiz Challenge";
quizHeader.setAttribute("style", "text-align:center");
quizSection.appendChild(quizHeader);

// Display the description that loads the `p` tag and `Start Quiz` button to be responsive
quizSection.appendChild(descriptionSection);
var startButton = document.querySelector("#startQuiz");


var questions = shuffleArray([
    {
        questionText: "Commonly used data types DO not include:",
        choice1: "1.  alerts",
        choice2: "2.  booleans",
        choice3: "3.  strings",
        choice4: "4.  numbers"
    },
    {
        questionText: "The condition in an if/else statement is enclused within______.",
        choice1: "1.  parentheses",
        choice2: "2.  quotes",
        choice3: "3.  curly braces",
        choice4: "4.  square brackets"
    },
    {
        questionText: "Arrays in JavaScript can be used to store______.",
        choice1: "1.  all data types",
        choice2: "2.  other arrays",
        choice3: "3.  booleans",
        choice4: "4.  numbers and strings"
    },
    {
        questionText: "String values must be enclosed within______When being assigned to variables.",
        choice1: "1.  Quotes",
        choice2: "2.  Commas",
        choice3: "3.  Curly braces",
        choice4: "4.  Parentheses"
    },
    {
        questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "1.  console.log",
        choice2: "2.  JavaScript",
        choice3: "3.  for loops",
        choice4: "4.  terminal/bash"
    },
    {
        questionText: "How do you create a function in Javascript?",
        choice1: "1.  function myFunction()",
        choice2: "2.  function = myFunction()",
        choice3: "3.  function:myFunction()",
        choice4: "4.  function: = myFunction()"
    },
    {
        questionText: "How does a FOR loop start?",
        choice1: "1.  for (i = 0; i <= 5; i++)",
        choice2: "2.  for (i = 0; i <= 5)",
        choice3: "3.  for (i <= 5; i++)",
        choice4: "4.  for i = 1 to 5"
    }
]);

startButton.addEventListener("click", function() {
    // Calling the quiz function
    quiz();
    // Setting the time and chrono
    timerSection.textContent = "Time: " + time;
    var timeInterval = setInterval(function () {
        if (isTakingQuiz && time > 0) {
            time--;
            timerSection.textContent = "Time: " + time;
        } else if (isTakingQuiz && time <= 0) {
            isTakingQuiz = false;
            promptInitials();
        }
        if (!isTakingQuiz) {
            clearInterval(timeInterval);
        }
    }, 1000);
    // To align the section headers to the left
    quizHeader.setAttribute("style", "text-align:left");

});

function quiz() {
    time = 75;
    score = 10;
    index = 0;
    isTakingQuiz = true;
    highscoresLink.innerHTML = "";
    result.innerHTML = "";
    // Removing the description section before appending the choices and results
    quizSection.removeChild(descriptionSection);
    quizSection.appendChild(choices);
    quizSection.appendChild(result);
    // Call the generateQuestion function
    generateQuestion();
}

function generateQuestion() {
    // Find the current Question by index and appending the question text with answers
    currentQuestion = questions[index];
    quizHeader.textContent = currentQuestion.questionText;
    var answers = shuffleArray([currentQuestion.choice1, currentQuestion.choice2, currentQuestion.choice3, currentQuestion.choice4])
    // Attributing a class to the button list of choices and append it
    choice1.innerHTML = '<button class="answerChoice">' + answers[0] + '</button>';
    choice2.innerHTML = '<button class="answerChoice">' + answers[1] + '</button>';
    choice3.innerHTML = '<button class="answerChoice">' + answers[2] + '</button>';
    choice4.innerHTML = '<button class="answerChoice">' + answers[3] + '</button>';
    choices.appendChild(choice1);
    choices.appendChild(choice2);
    choices.appendChild(choice3);
    choices.appendChild(choice4);
    choices.setAttribute("style", "display:block");
    // To hide the ordered list number 
    choices.setAttribute("style", "list-style-type:none");
}

highscoresLink.addEventListener("click", function(event) {
    quizSection.removeChild(descriptionSection);
    // Display the high score list when we click on the link by calling this function
    displayHighScores();
});

quizSection.addEventListener("click", function(event) {
    var element = event.target;
    if (isTakingQuiz) {
        if (element.textContent === currentQuestion.choice1) {
            // Display the result to `Correct` and add the score if the quiz is being taking
            result.innerHTML = "<hr>Correct!";
            score += 2;
        } else if (element.getAttribute("class") === "answerChoice") {
            result.innerHTML = "<hr>Wrong!";
            --score;
            time -= 10;
        } else {
            return;
        }

        // Do the new question
        if (index < questions.length - 1) {
            index++;
            generateQuestion();
        } else {
            isTakingQuiz = false;
            promptInitials();
        }
    }
});

function promptInitials() {
    // Append the quizHeader as `All done!`
    quizHeader.textContent = "All done!";
    // Remove the last quiz section of choices
    quizSection.removeChild(choices);
    // Insert quizHeader2 before the result
    quizHeader2.textContent = `Your final score is ${score}.`;
    quizSection.insertBefore(quizHeader2, result)

    // Append the initialsSection before the result and adding a responsive click on `submit` to display the highscore list
    quizSection.insertBefore(initialsSection, result);
    var submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", saveScore);
}

function saveScore(event) {
    event.preventDefault();
    
    // Initials value to uppercase
    var initials = document.querySelector("#initials").value.toUpperCase();
    if (initials === "") {
        // When no initial is given
        initials = "X";
    }
    // Retriving highscores 
    var highscores = localStorage.getItem("highscores");
    if (highscores == null) {
        highscores = {initials: [], scores: []}
    } else {
        highscores = JSON.parse(highscores);
    }

    for (i = highscores.scores.length; i >= 0 ; --i) {
        if (i === 0 || score <= highscores.scores[i-1]) {
            highscores.scores.splice(i, 0, score);
            highscores.initials.splice(i, 0, initials);
            break;
        }
    }
    localStorage.setItem("highscores", JSON.stringify(highscores));

    quizSection.removeChild(initialsSection);
    quizSection.removeChild(quizHeader2)
    quizSection.removeChild(result);
    displayHighScores();
}

function displayHighScores() {
    scoresSection.innerHTML = "";
    highscoresLink.innerHTML = "";
    var list = document.createElement("ol");
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    if (highscores != null) {
        for (i = 0; i < highscores.scores.length; ++i) {
            var listItem = document.createElement("li");
            listItem.textContent = highscores.initials[i] + " - " + highscores.scores[i];
            // List of the fith last scores to be appended
            list.appendChild(listItem);
            if (i >= 4){
                break
            }
        }
        scoresSection.appendChild(list);
    }
    var buttonSection = document.createElement("section");
    buttonSection.innerHTML = '<button id="back" >Go Back</button> <button id="clear">Clear High Scores</button>';
    scoresSection.appendChild(buttonSection);
    quizHeader.textContent = "High scores";
    // Try
    quizHeader.setAttribute("style","margin-left: 25px" )
    quizSection.appendChild(scoresSection);
    // goBack button to be responsive on click
    var backButton = document.querySelector("#back");
    backButton.addEventListener("click", goBack);

    // clearHighScores button to be responsive on click
    var clearButton = document.querySelector("#clear");
    clearButton.addEventListener("click", clearHighScores);
}

function goBack(event) {
    quizSection.removeChild(scoresSection);
    quizHeader.textContent = "Coding Quiz Challenge";
    quizHeader.setAttribute("style", "text-align:center");
    quizSection.appendChild(descriptionSection);
    highscoresLink.innerHTML = '<a href="#">View high scores</a>';
}

function clearHighScores(event) {
    localStorage.clear();
    if (scoresSection.childNodes.length >= 2) {
        scoresSection.removeChild(scoresSection.firstChild);
    }
}

function shuffleArray(array) {
    for (var i = 0; i < array.length; ++i) {
        var randIndex = Math.floor(Math.random() * array.length)
        var temp = array[i];
        array[i] = array[randIndex];
        array[randIndex] = temp;
    }
    return array;
}