
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used to style a web page?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        answer: "CSS"
    },
    {
        question: "Which tag is used to create a paragraph in HTML?",
        options: [
            "<h1>",
            "<br>",
            "<p>",
            "<div>"
        ],
        answer: "<p>"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: [
            "var",
            "print",
            "echo",
            "display"
        ],
        answer: "var"
    },
    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        options: [
            "<!-- -->",
            "//",
            "**",
            "##"
        ],
        answer: "//"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let answered = false;

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 15;

    document.getElementById("timer").textContent = timeLeft;

    timer = setInterval(function() {
        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(true);
        }
    }, 1000);
}

function displayQuestion() {
    answered = false;

    let q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        "Question " + (currentQuestion + 1) + " / " + questions.length;

    document.getElementById("question").textContent = q.question;

    document.getElementById("feedback").textContent = "";

    document.getElementById("submitButton").style.display = "inline-block";
    document.getElementById("submitButton").disabled = false;

    document.getElementById("nextButton").style.display = "none";

    let optionsHTML = "";

    for (let i = 0; i < q.options.length; i++) {
        let option = q.options[i]
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;");

        optionsHTML += `
            <label>
                <input type="radio" name="answer" value="${option}">
                ${option}
            </label>
        `;
    }

    document.getElementById("options").innerHTML = optionsHTML;

    startTimer();
}

function checkAnswer(timeUp = false) {
    if (answered) {
        return;
    }

    let selected = document.querySelector('input[name="answer"]:checked');
    let feedback = document.getElementById("feedback");

    if (!selected && !timeUp) {
        feedback.textContent = "Please select an answer!";
        feedback.style.color = "orange";
        return;
    }

    answered = true;
    clearInterval(timer);

    if (selected && selected.value === questions[currentQuestion].answer) {
        score++;
        feedback.textContent = "Correct Answer!";
        feedback.style.color = "green";
    } else if (timeUp) {
        feedback.textContent = "Time is up! The correct answer is: " +
            questions[currentQuestion].answer;
        feedback.style.color = "red";
    } else {
        feedback.textContent = "Incorrect! The correct answer is: " +
            questions[currentQuestion].answer;
        feedback.style.color = "red";
    }

    let radioButtons = document.querySelectorAll('input[name="answer"]');

    radioButtons.forEach(function(radio) {
        radio.disabled = true;
    });

    document.getElementById("submitButton").style.display = "none";
    document.getElementById("nextButton").style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        clearInterval(timer);

        document.getElementById("quizSection").style.display = "none";

        document.getElementById("result").innerHTML =
            "<h2>Quiz Completed!</h2>" +
            "<p>Your Final Score: " + score + " / " + questions.length + "</p>";
    }
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;

    shuffleQuestions();

    document.getElementById("startButton").style.display = "none";
    document.getElementById("quizSection").style.display = "block";

    document.getElementById("result").innerHTML =
        "<p>Your score will appear here after finishing the quiz.</p>";

    displayQuestion();
}
