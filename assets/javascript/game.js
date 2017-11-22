// External js file for pyschic game

// javascript test function
function logToCon(message) {
    console.log(message);
}

//Turn on debugging
var debug = true;

//Create pool of letters for computer to draw from
var randomLetterPool = "abcdefghijklmnopqrstuvwxyz";

//Create empty variable to store randomly generated letter
var randomLetter = "";

//Create an empty variable for the userGuess
var userGuess = "";

//Set the number of attempts
var numberOfAttempts = 3;

//Set a temporary variable to decrement as the game is played
var tempNumberOfAttempts = numberOfAttempts

//Debug messages
if (debug) {
    logToCon("numberOfAttempts = " + numberOfAttempts);
}

//Empty array for storing historical user guesses
var arrHistoricGuesses = [""];

//Empty array for storing wins and losses
var arrWins = 0;
var arrLosses = 0;

// Select the span with the id of "total-attempts" and , and insert the following HTML into it.
document.querySelector("#total-attempts").innerHTML = numberOfAttempts;

//Randomly generate a letter for the computer pick
for (var i = 0; i < 1; i++) {
    //Generates a random letter from the randomLetterPool
    randomLetter += randomLetterPool.charAt(Math.floor(Math.random() * randomLetterPool.length));
}

if (debug) {
    logToCon("randomLetter generated as: " + randomLetter);
}
// Select the span with the id of "computer-current-letter" and insert the following HTML into it.
document.querySelector("#computer-current-letter").innerHTML = randomLetter;

//Capture the user pick
document.onkeyup = function (event) {
    // Determines which key was pressed.
    var userGuess = event.key;
    if (debug) {
        //Debug message
        logToCon("userGuess: " + userGuess);
    }
    //Update list of previous user guesses with the letter selected
    arrHistoricGuesses.push(userGuess);
    if (debug) {
        //Debug message
        logToCon("arrHistoricGuesses: " + arrHistoricGuesses);
    }
    document.querySelector("#player-guesses").innerHTML = arrHistoricGuesses;

    //Set the user guess value
    document.querySelector("#player-current-letter").innerHTML = userGuess;


    if (debug) {
        //Debug message
        logToCon("tempNumberOfAttempts (before decrementing): " + tempNumberOfAttempts);
    }
    //decrement the picks remaining (numberOfAttempts) by one every time the player chooses a letter 
    tempNumberOfAttempts--
        if (debug) {
            //Debug message
            logToCon("tempNumberOfAttempts (after decrementing): " + tempNumberOfAttempts);
        }
        //Lose Scenario
        if (tempNumberOfAttempts === 0) {
            var isWinner = false;
            alert("You lose!");
            logToCon("You lose!");
            arrLosses++
            document.querySelector("#total-losses").innerHTML = arrLosses;
        }
    }
    //Win scenario
    //Match a letter
    if (userGuess === randomLetter) {
        var isWinner = true;
        alert("You Win!");
        logToCon("You win!");
        //increment Win number
        arrWins++
        if (debug) {
            //Debug message
            logToCon("arrWins (after incrementing): " + arrWins);
        }
        document.querySelector("#total-wins").innerHTML = arrWins;
    }

if(isWinner){
    //Reset values back to default but leave wins and losses counters intact

}




//Determine if computer pick matches user pick
    //Make sure case matches

    //If letters from user and computer match, then player wins
        //When player wins, increase win counter

//If no letters from player match and the picks remaining are 0, then player loses    
    //When player loses, increment the loss counter












