//Project 4.  OOP Game App.
//Game.js Notes


//Part A. Important defined variables
const scoreBoard = document.querySelectorAll('#scoreboard ol li');


// Part B. A game 'game' Class is defined as follows to generate a game object when the start button is clicked. 

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = ['Freemasons', 'Golden Dawn', 'Crowley', 'Regardie', 'Chicken Qaballah'];
        this.activePhrase = null; 
    }
/* The constructor method includes the preselected list of phrases, initializes the number of wrong guesses to 0, and initializes the active phrase to a blank slate.
*  Note: These properties could just as easily be set to parameters that are provided to the game object upon pressing the start button.   
*/

    get getRandomPhrase() {
        let randomIndex = Math.floor(Math.random()*5);
        let randomPhrase = this.phrases[randomIndex]; 
        return randomPhrase;
    }
/* getRandomPhrase() method does the following: 
*  A getter method that returns a randomly selected phrase from the constructor method phrases array. 
*  This is done by a randomly generated index. 
*/

    
    handleInteraction(pressedButton) {
        pressedButton.disabled = true; 
        if (this.activePhrase.checkLetter(pressedButton)) {
            pressedButton.className = 'chosen';
            this.activePhrase.showMatchedLetter(pressedButton); 
            const win = this.checkForWin(); 
            if (win) {
                this.gameOver(win)
            }
        } else {
            pressedButton.className = 'wrong';
            this.removeLife();
        }
    }
/* handleInteraction() method does the following: 
*  Accepts a parameter representing the selected key.  This selected key is disabled. 
*  If letters match, the phrase object's showMatchedLetter() method is called to show all matching letters and to check for if all letters have been shown via checkForWin(). 
*  If a winning condition is reached, the gameOver() method is called to end the game. 
*  If the pressed key is wrong, the key class name is changed to 'wrong' and a life is removed through calling the removeLife() method. 
*/


    removeLife() {
        this.missed += 1; 
        scoreBoard[`${this.missed - 1}`].firstElementChild.setAttribute('src', 'lostHeart.png');
        if (this.missed === 5) {
              this.gameOver(this.checkForWin());
            }
        }
/* removeLife() method does the following: 
*  The game object 'missed' property is increased by 1. 
*  The 'liveHeart' png image is replaced by a 'lostHeart' image.  This method accounts for the current number of live and lost hearts, based on the missed property.
*  If all 5 guesses are incorrect, a game over is initiated by calling the gameOver() method, using the checkForWin() returned value as a parameter.
*/

    checkForWin() {
        const phraseElements = document.querySelectorAll('#phrase ul li')
        let showCounter = 0; 
        let spaceCounter = 0; 
        let win = false; 
        for (let i = 0; i < phraseElements.length; i++) {
            if (phraseElements[i].className.includes('show')) {
                 showCounter += 1;
        } else if (phraseElements[i].className.includes('space')) {
                 spaceCounter += 1;
            }
        }
        if (phraseElements.length - spaceCounter === showCounter) {
             win = true; 
        }
        return win;
    }
/* checkForWin() method does the following: 
*  Initializes the win condition to false and initializes other counters in order to do a check for the number of revealed letters and spaces. 
*  The number of revealed letters and spaces in the phrase are counted. 
*  A win condition is set to true if all letters are shown, based on matching the showed letter number with the phrase length (adjusted for a lack of spaces in the guessed phrase).
*  The win condition, either true or false, is returned. 
*/

    gameOver(checkForWin) {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'flex'
        const gameOverMessage = document.getElementById('game-over-message')
        if (checkForWin === true) {
              gameOverMessage.textContent = 'You win!'
        } else {
              gameOverMessage.textContent = 'You lose! Try Again.'
        }
    }   
/* gameOver() method does the following: 
*  Accepts a parameter of checkForWin(), based on the returned win condition value of true/false based on the checkforWin() method. 
*  Primes the game overlay to display the game over message by setting the overlay display to 'flex'.
*  Based on the win condition, a winning or losing message will be printed to the screen. 
*/

    startGame() {
        overlay.style.display = 'none'
        this.activePhrase = new Phrase(this.getRandomPhrase); 
        this.activePhrase.addPhraseToDisplay(); 
    }
/* startGame() method does the following: 
*  Initializes the game overlay screen by setting the overlay display to 'none'. 
*  Instantiates a new phrase object, by calling on the getRandomPhrase method(), and setting the phrase object to the 'activePhrase' property in the constructor method. 
*  Adds the phrase to the display by calling the addPhraseToDisplay() method from the Phrase object. 
*/

  }


 






  










 




