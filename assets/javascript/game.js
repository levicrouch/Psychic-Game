// External js file for pyschic game
//Turn on debugging
var debug = true;

//Set the condition to play game
var playGame = true;

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////////                 functions                            ///////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// Log message to console
function logToCon(message) {
    console.log(message);
}

// Update html document
function writeHTML(id, value) {
    document.querySelector("#" + id).innerHTML = value;
    logToCon("writeHTML: ID: " + id + " value: " + value)
}

//Reset document keeping the wins and losses count
function resetPicks() {
    //regenerate random letter
    //var randomLetter = generateRandomLetter()
    //reset userGuess
    var userGuess = "";
    //reset tempNumberOfAttempts
    var tempNumberOfAttempts = 0;
    //reset arrHistoricGuesses
    var arrHistoricGuesses = [];
    //reset isWinner back to false
    if (isWinner) {
        var isWinner = false

    }
}

function determineMatch(playerPick, computerPick) {
    //Determine if letter matches computer
    if (playerPick === computerPick) {
        var isWinner = true;
        updateWinCounter();
        alert("You Win!")
        return isWinner;
    }
}
function logGuess(userGuess, arrHistoricGuesses) {
    //Update list of previous user guesses with the letter selected
    arrHistoricGuesses.push(userGuess);
    //Set the user guess value
    writeHTML("player-current-letter", userGuess);
    if (debug) {
        //Debug message
        logToCon("arrHistoricGuesses: " + arrHistoricGuesses);
    }
    writeHTML("player-guesses", arrHistoricGuesses);
    return arrHistoricGuesses;
}

function updateWinCounter() {
    //increment Win number
    winCounter++
    if (debug) {
        //Debug message
        logToCon("winCounter (after incrementing): " + winCounter);
    }
    //Write updated wins counter on page
    writeHTML("total-wins", winCounter);    
}

function updateLossCounter() {
    //increment loss number
    lossCounter++
    if (debug) {
        //Debug message
        logToCon("lossCounter (after incrementing): " + lossCounter);
    }
    //Write updated wins counter on page
    writeHTML("total-losses", lossCounter);
}

function generateRandomLetter() {
    //Generate the computer guess
    //Create pool of letters for computer to draw from
    var randomLetterPool = "abcdefghijklmnopqrstuvwxyz";
    var randomLetter = "";
    //Randomly generate a letter for the computer pick
    for (var i = 0; i < 1; i++) {
        //Generates a random letter from the randomLetterPool
        randomLetter += randomLetterPool.charAt(Math.floor(Math.random() * randomLetterPool.length));
    }
    if (debug) {
        logToCon("randomLetter generated as: " + randomLetter);
    }
    // Select the span with the id of "computer-current-letter" and insert the following HTML into it.
    writeHTML("computer-current-letter", randomLetter);
    return randomLetter
}


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////                 Play game                            //////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//Set variables to their default state on page reload
//Set the number of attempts
var numberOfAttempts = 3;

//Set a temporary variable to decrement as the game is played
var tempNumberOfAttempts = numberOfAttempts

//Empty array for storing historical user guesses
var arrHistoricGuesses = [];

//Empty array for storing wins and losses
var winCounter = 0;
var lossCounter = 0;

//Create blank variable for isWinner
var isWinner = false;

//Set the userGuess to blank
var userGuess = "";

//Select the span with the id of "total-attempts" and, and insert the total number of attempts available.
writeHTML("total-attempts", numberOfAttempts);
// Set the remaining-guesses span with the total available guesses
writeHTML("remaining-guesses", numberOfAttempts);

//Generate the computer pick
var randomletter = generateRandomLetter();

//Player picks a letter
document.onkeyup = function (event) {

    // Determines which key was pressed.
    var userGuess = event.key;
    logToCon("userGuess: " + userGuess);

    //Write userGuess to document
    writeHTML("player-current-letter", userGuess)

    //Decrement the attempt counter
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
    //Determine is the player guess matches the computer pick
    var isWinner = determineMatch(userGuess, randomletter);
    if (!isWinner) {
        if (tempNumberOfAttempts === 0 || tempNumberOfAttempts > numberOfAttempts) {
            var isWinner = false;
            alert("You lose!");
            logToCon("Exceeded the number of maximum number of attempts of: " + numberOfAttempts);
            updateLossCounter();
        } else {
            //Log number of attempts left
            logToCon("Keep going, you still have: " + tempNumberOfAttempts + " left");
            writeHTML("remaining-guesses", tempNumberOfAttempts);
            //Log player's guess to page
            logGuess(userGuess, arrHistoricGuesses);
        }
    }
}









