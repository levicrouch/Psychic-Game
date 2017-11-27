///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////////        External js file for pyschic game             ///////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////////              User configurations                     ///////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// Feel free to tweak these values as desired

// Set the number of attempts
maxNumberOfAttempts = 10;

// Turn on debugging
// Note for person grading: set to true to see the computer's guess in real time.
debug = false;


///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////////                 functions                            ///////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// Function to update html document as vaules change
function writeHTML(id, value) {
    document.querySelector("#" + id).innerHTML = value;
}

// Function to generate the computer's guess
function generateComputerGuess() {
    // Randomly generate a letter for the computer pick
    var randomLetter = computerChoices[Math.floor(Math.random() * computerChoices.length)];
    if (debug) {
        console.log("computerGuess generated as: " + randomLetter);
    }
    // Select the span with the id of "computer-current-letter" and insert the following HTML into it.
    if (debug){
        writeHTML("computer-current-letter", randomLetter);
    }else {
        writeHTML("computer-current-letter", notDisplayed);
    }
    return randomLetter
}

// Function to determine whether or not the player's pick matches the computer pick
// returns a boolean whether or not there is a match
function determineMatch(playerPick, computerPick) {
    if (playerPick === computerPick) {

        // If the player pick matches the set matches to true
        var matches = true;
        return matches;

        // If the player pick does not match, then set matches to false
    } else {
        var matches = false;
        return matches;
    }
}
// Function to reset the game variables back to their defaults for the next game
function resetGame(userPick,computerPick,winner,array) {
    // If isWinner is not null (meaning either a win or loss *has* been determined), reset variables and generate new guesses
    // reset remainingAttempts to default
    remainingAttempts = maxNumberOfAttempts;
    writeHTML("remaining-guesses", remainingAttempts);

    // reset userGuess to nothing
    var userGuess = "";
    writeHTML("player-current-letter", notYetDef);

    // reset isMatch variable
    isMatch = null;
    writeHTML("status-text", pressLetter);

    // reset historical guesses array
    arrHistoricGuesses = [];
    writeHTML("player-guesses", notYetDef);

    // reset computer guesses
    computerGuess = "";
    writeHTML("computer-current-letter", notDisplayed);

    // reset the solution
    if (winner){
        // if the player won, display the winning picks
        writeHTML("solution-computer-guess", computerPick);
        writeHTML("solution-player-guess", userPick);
        writeHTML("solution-player-array", array);
    }else {
        // if player lost show the computer pick
        writeHTML("solution-computer-guess", computerPick);
        writeHTML("solution-player-array", array);
    }
    
    
    // Regenerate a new computer guess and play again
    computerGuess = generateComputerGuess();
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////                 Global Variables                     //////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////                     Status text                      //////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// Standardized text of "not yet defined"
notYetDef = "Not yet defined";

// Standardized text of "Press any letter to play..."
pressLetter = "<span class=\"label label-primary\">Press any letter to play...</span>";

// Standardized text of checking for a match...
checkForMatch = "<span class=\"label label-info\">Checking for a match...</span>";

// Standardized text of "No match"
// noMatch = "<strong>No Match</strong>";
// match = "<strong>Match</strong>";
noMatch = "<span class=\"label label-danger\">That letter did not Match!</span>";
match = "<span class=\"label label-success\">Match!!!</span>";
notDisplayed = "Not Displayed";

// Create null variable for isWinner
// Will be set to a boolean whether or not the ultimate result of the players guesses results in a win or not
isWinner = null;

// Create null variable for isMatch
// Will be set to a boolean whether or not the player and computer guesses match
isMatch = null;


// Empty array for storing historical user guesses
arrHistoricGuesses = [];

// Empty arrays for storing wins and losses
winCounter = 0;
lossCounter = 0;

//Create pool of letters for computer to draw from
computerChoices = "abcdefghijklmnopqrstuvwxyz";

// Set a different variable to decrement as the game is played
remainingAttempts = maxNumberOfAttempts;

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////             Set default HTML values                  //////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// Set the default values for the HTML document

// Could have set the default values in HTML (lines 40, 44, 48, 52, and 56 in index.html),
// but it seemed to make more sense to set the values here
// so they could be consistent as the status' change during the game.
writeHTML("status-text",pressLetter);
writeHTML("computer-current-letter", notDisplayed);
writeHTML("player-current-letter", notYetDef);
writeHTML("player-guesses", notYetDef);
writeHTML("remaining-guesses", notYetDef);
writeHTML("solution-computer-guess", notYetDef);
writeHTML("solution-player-guess", notYetDef);
writeHTML("solution-player-array", notYetDef);

//Select the span with the id of "total-attempts" and, and insert the total number of attempts available.
writeHTML("total-attempts", maxNumberOfAttempts);

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////                 Play game                            //////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// Generate the computerGuess global variable by calling the generateComputerGuess function
computerGuess = generateComputerGuess();

// function that is triggered when a key on the keyboard is pressed
document.onkeyup = function (event) {

    //Player picks a letter
    // Determines which key was pressed.
    var userGuess = event.key;
    // records the user guess to the console
    console.log("userGuess: " + userGuess);

    //Writes userGuess to HTML document
    writeHTML("player-current-letter", userGuess);

    //Update list of previous user guesses with the letter selected
    arrHistoricGuesses.push(userGuess);

    // Writes the updated historical guesses array to the HTML document
    writeHTML("player-guesses", arrHistoricGuesses);

    // Message to user that the computer is checking status
    writeHTML("status-text",checkForMatch);

    // Decrement the attempt counter
    if (debug) {
        // Debug message
        console.log("remainingAttempts (before decrementing): " + remainingAttempts);
    }

    // decrement the attempts remaining (remainingAttempts) by one every time the player chooses a letter 
    remainingAttempts--;

    // Writes the new remaining guesses value to the HTML document
    writeHTML("remaining-guesses", remainingAttempts);
    if (debug) {
        //Debug message
        console.log("remainingAttempts (after decrementing): " + remainingAttempts);
    }

    // Calls the determineMatch function.
    // The return value sets the isMatch global variable to a boolean
    isMatch = determineMatch(userGuess, computerGuess);

    // If the global variable "isMatch" is true then iterate through the win scenario
    if (isMatch) {
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////                 Win scenario                         //////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////

        // Log a message to the console
        console.log("Your pick of: *" + userGuess + "* matched the computer's guess of: *" + computerGuess + "*");

        // Update the HTML document's status-text id to indicate a match
        writeHTML("status-text", match);

        // As we have a match we also want to set the "isWinner" global variable to true
        isWinner = true;

        //Increment the wins counter
        winCounter++;
        if (debug) {
            //Debug message
            console.log("winCounter (after incrementing): " + winCounter);
        }

        //Alert that the user has won
        alert("You Win!");

        // Update HTML document
        writeHTML("total-wins", winCounter);

        // call the resetGame function to reset key variables 
        // to allow another game without resetting the win or loss counter
        resetGame(userGuess,computerGuess,isWinner,arrHistoricGuesses);
    } else {
        // This else statement handles the situation where we did not match 
        // the computer's letter but still have attempts remaining

        // Update HTML to show that the letter guessed does not match
        writeHTML("status-text", noMatch);
    }

    // If we do not match the computer letter, and have exhausted all our available attempts
    // we have triggered the lose scenario.
    if (!isMatch && remainingAttempts <= 0) {
        
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////                 Lose scenario                        //////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////

        // Set the isWinner boolean to false as we did not win
        isWinner = false;

        // Update HTML document to indicate that there was not a successful match
        writeHTML("status-text", noMatch);

        // Log message to the console
        console.log("Exceeded the number of maximum number of attempts of: " + maxNumberOfAttempts);
        console.log("¯\\_(ツ)_/¯ --- You did not guess the computer's guess of: *" + computerGuess + "*");

        // Increment the loss counter
        lossCounter++;
        if (debug) {
            //Debug message
            console.log("lossCounter (after incrementing): " + lossCounter);
        }

        // Update the loss counter on the HTML document
        writeHTML("total-losses", lossCounter);

        // Alert the player that they have lost
        alert("You lose!");

        //  call the resetGame function to reset key variables 
        // to allow another game without resetting the win or loss counter
        resetGame(userGuess,computerGuess,isWinner,arrHistoricGuesses);
    }

}






