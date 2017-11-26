// External js file for pyschic game
//Turn on debugging
debug = true;

//Create blank variable for isWinner
//Will be set to true when the player wins
//Will be set to false when the player loses
//controls the do-while loop game plays until isWinner is set to either true or false.
isWinner = false;
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////////                 functions                            ///////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// Update html document
function writeHTML(id, value) {
    document.querySelector("#" + id).innerHTML = value;
    // console.log("writeHTML: ID: " + id + " value: " + value);
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
maxNumberOfAttempts = 4;

//Set a temporary variable to decrement as the game is played
remainingAttempts = maxNumberOfAttempts;

//Empty array for storing historical user guesses
arrHistoricGuesses = [];

//Empty array for storing wins and losses
winCounter = 0;
lossCounter = 0;

//Create blank variable for isMatch
isMatch = false;


// Standardized text of "not yet defined"
notYetDef = "<em>not yet defined</em>";

// Standardized text of "No match"
noMatch = "<strong>No Match</strong>";
match = "<strong>Match</strong>";

//Create pool of letters for computer to draw from
computerChoices = "abcdefghijklmnopqrstuvwxyz";

generateComputerGuess = true;
//Select the span with the id of "total-attempts" and, and insert the total number of attempts available.
writeHTML("total-attempts", maxNumberOfAttempts);


document.onkeyup = function (event) {
    //Generate the computer guess
    //Randomly generate a letter for the computer pick
    if (generateComputerGuess) {
        var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
        if (debug) {
            console.log("computerGuess generated as: " + computerGuess);
        }
    }
    // Select the span with the id of "computer-current-letter" and insert the following HTML into it.
    writeHTML("computer-current-letter", computerGuess);
    //Player picks a letter
    //If the player pick does not match the computer but there are still greater than 0 attempts available
    // for (i = 0; i < remainingAttempts; i++){
    // Need to add a for loop here (?) that allows us to loop through a maximum number of times as set by remainingAttempts
    // for (i = 0; i < remainingAttempts || isWinner; i++) {
    // if (!isMatch || remainingAttempts > 0) {
    // Determines which key was pressed.
    var userGuess = event.key;
    // console.log("userGuess: " + userGuess);
    console.log("userGuess: " + userGuess);
    //Write userGuess to document
    writeHTML("player-current-letter", userGuess);
    //Update list of previous user guesses with the letter selected
    arrHistoricGuesses.push(userGuess);
    writeHTML("player-guesses", arrHistoricGuesses);

    // Message to user that the computer is checking status
    writeHTML("match-status", "Checking...");
    //Decrement the attempt counter
    if (debug) {
        //Debug message
        console.log("remainingAttempts (before decrementing): " + remainingAttempts);
    }
    //decrement the picks remaining (remainingAttempts) by one every time the player chooses a letter 
    remainingAttempts--;
    writeHTML("remaining-guesses", remainingAttempts);
    if (debug) {
        //Debug message
        console.log("remainingAttempts (after decrementing): " + remainingAttempts);
    }

    //Determine is the player guess matches the computer pick
    //Determine if letter matches computer
    if (userGuess === computerGuess) {
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////                 Win scenario                         //////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        isMatch = true;
        console.log("Your pick of: *" + userGuess + "* matched the computer's guess of: *" + computerGuess + "*");
        writeHTML("match-status", match);
        // var arrHistoricGuesses = logGuess(userGuess, arrHistoricGuesses);
        isWinner = true;
        //Increment the wins counter
        winCounter++;
        if (debug) {
            //Debug message
            console.log("winCounter (after incrementing): " + winCounter);
        }
        //Alert that the user has won
        alert("You Win!");
        writeHTML("total-wins", winCounter);
        // trigger a regeneration of the computer guess
        generateComputerGuess = true;
    }
    if (!isMatch && remainingAttempts > 0) {
        isMatch = false;

        console.log("Sorry, the letter you chose: *" + userGuess + "* does not match the computer pick");
        writeHTML("match-status", noMatch);
        //Log number of attempts left
        console.log("Keep going, you still have: " + remainingAttempts + " left");
        generateComputerGuess = false;
    }
    if (!isMatch && remainingAttempts <= 0) {
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////                 Lose scenario                        //////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        isWinner = false;
        console.log("Exceeded the number of maximum number of attempts of: " + maxNumberOfAttempts);
        lossCounter++;
        if (debug) {
            //Debug message
            console.log("lossCounter (after incrementing): " + lossCounter);
        }
        alert("You lose!");
        writeHTML("total-losses", lossCounter);
        generateComputerGuess = true;
    }



}






