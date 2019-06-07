//Project 4.  OOP Game App.
//App.js Code Notes

//Part A.  DOM Selection and Other Variables

const phrase = document.querySelector('#phrase ul');
const startButton = document.getElementById('btn__reset');
const overlay = document.getElementById('overlay');
const keyboard = document.getElementById('#qwerty')
const keys = document.querySelectorAll('.keyrow button');
let game; 

// All relevant DOM elements are selected.  The game variable is left empty, in order to be defined when the game starts. 


//Part B. Click Handler to start the game. 



    startButton.addEventListener('click', function() { 
        for (let i = 0; i < keys.length; i++ ) { 
            keys[i].disabled = false; 
            keys[i].className = 'key'; 
        }
        for (let i = 0; i < scoreBoard.length; i++) {
            scoreBoard[i].firstElementChild.setAttribute('src', 'liveHeart.png');
        }
        game = new Game(0);
        phrase.innerHTML = '';
        game.startGame();
    })

    for (i = 0; i < keys.length; i++) {
        keys[i].addEventListener('click', function(event) {
            let pressedButton = event.target;
            game.handleInteraction(pressedButton);
        });
    }

/* This click handler starts the game with the following order of code: 
*  The first part uses a for loop to initialize all key elements for the game to start.
*  The second for loop links the 'liveHeart.png' image to all 5 scoreboard elements.
*  A new game object is instantiated, the unknown phrase is prepared, and the new game is started.
*  The final part assigns click handlers to each key element to handle game interactions whenever a key is pressed. 
*/
    