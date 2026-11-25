// Store the game status, player name, scores and round results
let gameStarted = false;
let playerName = "";
let wins = 0;
let losses = 0;
let draws = 0;
let roundNumber = 0;
let results = [];

// Start the game after checking the player's name
function startGame() {
    playerName = document.getElementById("playerName").value.trim();

    // Display an alert if the name field is empty
    if (playerName === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;

    // Display the welcome message using innerHTML
    document.getElementById("welcome").innerHTML = "Welcome, " + playerName + "!";

    // Display the game start date and time using Date()
    document.getElementById("startTime").innerHTML = "Game started on: " + new Date();
}

// Generate and return a random computer choice
function getComputerChoice() {
    // Array contains all possible choices
    let choices = ["rock", "paper", "scissors"];

    // Generate a random array index from 0 to 2
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Play one round, decide the winner and update the page
function playRound(playerChoice) {
    // Check that Start Game has been clicked
    if (gameStarted === false) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    let roundResult = "";

    // Compare both choices and decide the result
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        document.getElementById("result").style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
        document.getElementById("result").style.color = "green";
    } else {
        roundResult = "Lose";
        losses++;
        document.getElementById("result").style.color = "red";
    }

    // Change both image sources to match the selected choices
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    // Display the choices and result
    document.getElementById("playerChoice").innerHTML = playerChoice;
    document.getElementById("computerChoice").innerHTML = computerChoice;
    document.getElementById("result").innerHTML =
        playerName + ": " + playerChoice + " | Computer: " +
        computerChoice + " | You " + roundResult + "!";

    // Increase the round number and store the result in an array
    roundNumber++;
    results.push(roundResult);

    // Update the scoreboard values
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Set the result colour based on the game outcome
    let resultClass = "";

    if (roundResult === "Win") {
        resultClass = "win";
    } else if (roundResult === "Lose") {
        resultClass = "lose";
    } else {
        resultClass = "draw";
    }

    // Add a new row to the history table
    document.getElementById("historyBody").innerHTML +=
        "<tr><td>" + roundNumber + "</td><td>" + playerChoice +
        "</td><td>" + computerChoice + "</td><td class='" +
        resultClass + "'>" + roundResult + "</td></tr>";

    // Clear the old summary when another round is played
    document.getElementById("summary").innerHTML = "";
    }

// Count wins with a for loop and calculate the win percentage
function showSummary() {
    let totalRounds = results.length;
    let totalWins = 0;

    // Count every Win stored in the results array
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            totalWins++;
        }
    }

    // Calculate percentage and round it to a whole number
    let winPercentage = 0;
    if (totalRounds > 0) {
        winPercentage = Math.round((totalWins / totalRounds) * 100);
    }

    document.getElementById("summary").innerHTML =
        "You played " + totalRounds + " rounds and won " + winPercentage + "%.";
}

// Reset all scores, results, history and messages
function resetGame() {
    gameStarted = false;
    wins = 0;
    losses = 0;
    draws = 0;
    roundNumber = 0;
    results = [];

    // Reset the scoreboard
    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;

    // Clear the history table and messages
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML =
        "Game has been reset. Click Start Game to play again.";
    document.getElementById("result").style.color = "#263746";
    document.getElementById("summary").innerHTML = "";

    // Return images and choice labels to their initial state
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
    document.getElementById("playerChoice").innerHTML = "Waiting...";
    document.getElementById("computerChoice").innerHTML = "Waiting...";

    // Clear the name, welcome message and start time
    document.getElementById("playerName").value = "";
    document.getElementById("welcome").innerHTML = "";
    document.getElementById("startTime").innerHTML = "";
    playerName = "";
}
