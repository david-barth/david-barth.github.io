//Project 4.  OOP Game App.
//Phrase.js Notes


//A game 'Phrase' Class is defined as follows to generate phrases for the game object. 

class Phrase { 
    constructor(Phrase) {
      this.Phrase = Phrase.toLowerCase(); 
    }
//This constructor method accepts a Phrase parameter, which is used to obtain a lower case phrase for the game. 

    addPhraseToDisplay() {
        for (let i = 0; i < this.Phrase.length; i++) {
            let letter = document.createElement('li');
            let character = this.Phrase.charAt(i); 
            letter.className = `letter ${this.Phrase.charAt(i)} hide`;
            phrase.appendChild(letter);  
            if (character === ' ') {
                letter.className = 'space'
            }
        }
    }
/* addPhraseToDisplay() method does the following:
*  Creates a number of list elements equal to the length of the phrase used in the constructor method.
*  Assigns the class of 'hide' to each character in the phrase and appends each letter to the phrase and thus adding it to the game board/<ul>. 
*  If there is no character, the 'space' class is assigned to the character. 
*/

    checkLetter(Button) {
        let letter = Button.textContent; 
        for (let i = 0; i < phrase.children.length; i++) {
            let match = phrase.children[i].className[7];
            if (letter === match) {
                return true; 
            }
        }
    }
/* checkLetter() method does the following: 
*  Accepts the parameter of button, representing a selected key.
*  Checks to see if the text content of the pressed key matches the appropriate class names of the unkown list elements.
*  If the guessed letter matches a list element class name, this method returns true. 
*/

    showMatchedLetter(Button) {
        let letter = Button.textContent;  
        for (let i = 0; i < phrase.children.length; i++) {
            let match = phrase.children[i].className[7];
            if (letter === match) {  
                phrase.children[i].className = `letter ${match} show`
                phrase.children[i].textContent = Button.textContent;
            }
        }
    }
/* showMatchedLetter() method does the following. 
*  Accepts the parameter of button, representing a selected key. 
*  If the checkLetter() method returns true, all matching list elements are revealed by changing their class names from 'hide' to 'show' and by adding the letter to the list element text content.
*/
  }

 



  