//Project 3: Interactive HTML Form. 

//I am aiming for a 'Meets Expectations' mark here. 


// 1. Setting Focus on the first text field: 

const nameField = document.getElementById('name');

document.addEventListener('DOMContentLoaded', function () {
    nameField.focus();
});

//Explanation: This event handler uses the DOMContentLoaded event in order to allow the nameField to have focus, upon loading the page. 
//This provides focus on the name input element as soon as the page loads. 



// 2. ”Job Role” section: 


//Relevant variables: 

const userTitleMenu = document.querySelector('#title');
const otherText = document.querySelector('#other-title');
const otherTextLabel = document.querySelector('[for="other-title"]');
otherText.style.display = 'none';
otherTextLabel.style.display = 'none';


//Implemented handlers and functions: 

userTitleMenu.addEventListener('change', function(e) {
    const selected = event.target.value;
    if (selected === 'other') {
        otherText.style.display = 'block';
        otherTextLabel.style.display = 'block';
    } else {
        otherText.style.display = 'none';
        otherTextLabel.style.display = 'none';
    }
});

/* 
*Change handler displays 'Other' text input and label if selected event reference value matches the term 'other'.
*This displays the 'Other' job text input and label as bllock elements. 
*/


// 3. ”T-Shirt Info” section: 


//Relevant Variables: 

const colorMenu = document.querySelector('#color');
const colorThemes = document.querySelector('#design')
const colorOptions = colorMenu.children;
const colorBank = Array.from(colorOptions); //Converts color options to arrays for removal and appending of option elements.


//Relevant Object Literal: 

const colorFilter = {
    removeShirts: function () {
          colorMenu.innerHTML = '';  
        },
    PunShirt: function () {
          for (let i = 0; i <= 2; i++) {
              colorMenu.appendChild(colorBank[i]); 
          }
    },
    JsLove: function () {
        for (let i = 3; i <= 5; i++) {
            colorMenu.appendChild(colorBank[i]); 
        }
    },
    colorInitialize: function () {
        const firstOption = document.createElement('option');
        firstOption.textContent = 'Please select a T-shirt theme'
        firstOption.setAttribute('value', 'Select Theme')
        colorMenu.insertBefore(firstOption, colorOptions[0]); 
        
    }
}

/* colorFilter Object does the following: 
*removeShirts(): Sets innerHTML of color drop down menu to empty. 
*PunShirt(): //Appends all 'JS Puns' options to color dropdown menu.
*JsLove(): Appends all 'I love JS" shirts to color drop down menu.
*colorInitialize(): Creates and appends a "Please Select a T-Shirt theme" option as first option in color drop down menu.
*/




//Pre-set T-Shirt Info Conditions: 

colorFilter.removeShirts();   
colorFilter.colorInitialize();

//Conditions remove all Shirt color option elements and adds a 'Please Select a T-shirt theme' option as only option to color dropdown menu.


//Implemented handlers and functions: 

colorThemes.addEventListener('change', function (event) {
    let selected = event.target.value;
    if (selected.includes("js puns")) {
        colorFilter.removeShirts();
        colorFilter.PunShirt();
    } 
    else if (selected.includes("Select Theme")) {
        colorFilter.removeShirts();
        colorFilter.colorInitialize();
    }
    else {
        colorFilter.removeShirts();
        colorFilter.JsLove();
    }
})

/* Change Handler does the following:
*All branches of handler remove options from the color menu and add all options relevant to the theme selected in the 'Design' menu.
*/


//4. ”Register for Activities” section.


// A. Conflictng Scheduled Workshops

//Relevant Variables: 

const activities = document.querySelector('.activities')
const activitiesList = document.querySelectorAll('.activities input')
const activitiesList2 = Array.from(activitiesList); //Convert activities to true array to make use of array methods more easily.


// Implemented handlers and functions: 

function timeMatcher(day, time, list) {
    let choiceBank = [];
    for (let i = 0; i < list.length; i++) {
    let selected = list[i];
    let selectedText = selected.parentNode.textContent;
    if (selectedText.includes(`${day} ${time}`) === true) {
            choiceBank.push(selected);
        }
    }  
    return choiceBank; 
}

/* timeMatcher() does the following:
* Accepts strings of 'day' and 'time' and accepts list of workshop inputs. 
* Loops through workshop inputs and finds workshop inputs with labels containing the 'day' and 'time' strings.
* Pushes these matched workshop inputs into a choiceBank array and returns it.
*/


function timeParameterGen(choiceText) {
    let presplit = choiceText.split(' — ');
    let mainsplit = presplit[1].split(',', 1);
    let timeParameters = mainsplit[0].split(' ');
    return timeParameters;
}

/* timeParameterGen() does the following: 
* Takes a parameter of choiceText (string) and splits text into array containing time parameter string elements.
*/


function workshopStrike(Workshops) {
    for (let i = 0; i < Workshops.length; i++) {
        if (Workshops[0].name !== Workshops[i].name) {
           let cancelledField = Workshops[i].name;
           let cancelledBox = document.querySelector(`.activities [name=${cancelledField}]`)
           cancelledBox.disabled = true;
           cancelledBox.parentNode.style.textDecoration = 'line-through';
           return cancelledBox;
        } 
   }
}

/* workshopStrike() does the following: 
* Accepts html collection of workshop inputs and loops through list.
* Takes name of ith workshop and uses it to select the relevant workshop input. 
* Selected input is disabled, has a line drawn through it, and is returned. 
*/


activities.addEventListener('change', function(event) {
    let choice = event.target;
    let choiceText = choice.parentNode.textContent;
    var timeParameters = timeParameterGen(choiceText);
    let choiceBank = timeMatcher(timeParameters[0], timeParameters[1], activitiesList2);
    choiceBank.unshift(choice);
    let cancelledBox = workshopStrike(choiceBank);
    if (choice.checked === false) {
        cancelledBox.disabled = false;
        cancelledBox.parentNode.style.textDecoration = '';
    }
})

/* change handler does the following: 
* Extracts text content of event target in order to extract array of time parameters.
* Time parameters with the activities list to obtain array of time conflicting workshop inputs.
* Selected workshop input/event target is removed from array and remaining workshop input is disabled and has line drawn through it.
* If selected input is unchecked, stylistic line-through is undone and the input enabled. 
*/


//Part B. Price Tracker.

//Relevant Variables: 

let Counter = 0; //Used a multiplier of $100 to obtain final price
const priceTotal = document.createElement('h3');

const priceTracking = {
    workShopAdd: function (selected, selectedText) {
        if (selected.checked === true && selectedText.includes('$100') === true) {
            Counter += 1;
         }
    },
    workShopSubtract: function (selected, selectedText) {
        if (selected.checked === false && selectedText.includes('$100') === true) {
            Counter -= 1;
         }
    },
    MainAdd: function (selected, selectedText) {
        if (selected.checked === true && selectedText.includes('$200') === true) {
            Counter += 2; // +/- 2 accounts for $200 dollar price of the main conference. 
         }
    },
    MainSubtract: function (selected, selectedText) {
        if (selected.checked === false && selectedText.includes('$200') === true) {
            Counter -= 2;
         }
    },
}

/* Object does the following:
* All methods accept a checkbox/workshop input and its label text content.
* All check for if input is checked and if input price is $100 or $200.
* If input is checked a multiplier of 1 or 2 is added to 'Counter'.  Deduction occurs if input is unchecked.
*/


//Implemented event handlers and functions: 

activities.addEventListener('change', function (event) {
    activities.appendChild(priceTotal);
    let selected = event.target;
    let selectedText = selected.parentNode.textContent;
    priceTracking.workShopAdd(selected, selectedText);
    priceTracking.workShopSubtract(selected, selectedText);
    priceTracking.MainAdd(selected, selectedText);
    priceTracking.MainSubtract(selected, selectedText);
    priceTotal.textContent = `Total: $${Counter*100}`;
});

/* Change handler does the following:
* Appends created h3 (priceTotal) element to activities div to keep track of price.  
* Inputs selected checkbox and it's label text content into priceTracking methods to come up with a total for the 'Counter' variable.
* Text content of priceTotal is updated with 'Counter' used a multiplier to obtain the combined price of all selected workshops.
*/



//5. "Payment Info" section.

//Relevant Variables: 

const payment = document.querySelector('#payment');
const paymentChoice = document.querySelectorAll('#payment option');
const creditCard = document.querySelector('#credit-card');
const payPal = creditCard.nextElementSibling;
const bitCoin = payPal.nextElementSibling;

//Preset Conditions: 

payPal.style.display = 'none';
bitCoin.style.display = 'none';
paymentChoice[0].disabled = true;
paymentChoice[1].selected = true;

//These conditions ensure that only the credit card div shows initially. 


//Implemented hanlders and functions: 

payment.addEventListener('change', function(event) {
    let selected = event.target.value;
    if (selected === 'credit card') {
        creditCard.style.display = 'block';
        payPal.style.display = 'none';
        bitCoin.style.display = 'none';
    } else if (selected === 'paypal') {
        creditCard.style.display = 'none';
        payPal.style.display = 'block';
        bitCoin.style.display = 'none';
    } else if (selected === 'bitcoin'){
        creditCard.style.display = 'none';
        payPal.style.display = 'none';
        bitCoin.style.display = 'block';
    }
})

/* change handler does the following: 
* Displays the appropriate payment option div, based on what payment dropdown menu option is selected.
* Hides all other unselected payment divs. 
*/



//6. Form validation and errors.


//Relevant Variables: 

const submit = document.querySelector('[type="submit"]');
const form = document.querySelector('[action="index.html"]');
const error = document.createElement('span')
const emailField = document.getElementById('mail');
const creditCardInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');


//Initial Condition(s): 

form.setAttribute('novalidate', '');

/*
*  form element attribute of 'novalidate' is used to prevent automatic browser validations (e.g. email validation) from occurring. 
*  This allows only for custom javascript validation code to be used. 
*/

//Implemented handlers and events: 

//All functions use a true/false return system, combined with appropriate validation conditions in order to allow the event handler to work correctly. 

function nameValidation () {
    if (nameField.value !== '') { // Checks to see if name input is filled in. 
        return true;
    } else {
        return false;
    }
}

function emailValidation() {
    function regexEmail(email) {
        return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
    }
    if (regexEmail(emailField.value)) { // Checks to see if email input contains a properly formatted email.
        return true;
    } else {
        return false;
    }
} 

function activityValidation() {
    for (i = 0; i < activitiesList.length; i++) {
        if (activitiesList[i].checked)  { // Loops through all workshop inputs to see if any are checked.
            return true 
        } 
    }
    return false
}

function paymentValidation() {
    let cardNumber = creditCardInput.value;
    let zip = zipInput.value;
    let cvv = cvvInput.value;
    function paymentStringValidation(cardNumber, zip, cvv) {
        const regex =  /^[0-9]+$/
        if (regex.test(cardNumber) && regex.test(zip) && regex.test(cvv)) {
            return true;
        } else {
            return false; 
        }
    }
    if (cardNumber.length >= 13 && cardNumber.length <= 16 && zip.length === 5 && cvv.length === 3 && paymentStringValidation(cardNumber, zip, cvv)) { //Checks to see if credit card, zip, and cvv numbers match required lengths.
        return true
    } else {
        return false 
    }
}


/* All validation functions above do the following: 
*  Evaluates an input value based on a certain set of validation criteria. 
*  If validation criteria are met, the validation function returns true.  If criteria are not met, false is returned. 
*  emailValidation() uses a regex within a callback function to ensure only properly formatted emails return true. 
*  paymentValidation() uses a regex in a callback function to ensure that card number, zip, and cvv values contain only numbers.
*/


form.addEventListener('submit', function(event) {
    if (!nameValidation()) {
        event.preventDefault();
        nameField.previousElementSibling.textContent = 'Name: Please enter a name'
        nameField.previousElementSibling.style.color = 'red'
    }
    if (!emailValidation()) {
        event.preventDefault(); 
        emailField.previousElementSibling.textContent = 'Email: Please enter an email (e.g. something@yahoo.com)'
        emailField.previousElementSibling.style.color = 'red'
    }
    if (!activityValidation()) {
        event.preventDefault();
        activities.firstElementChild.textContent = 'Register for Activities: Please select at least 1 activity';
        activities.firstElementChild.style.color = 'red'
    }
    if (!paymentValidation() &&  creditCard.style.display === 'block') {
        event.preventDefault(); 
    }
});

/* Submit handler does the following: 
* Checks to see if name, email, activity, and payment validation functions return true or false. 
* If any return false, then submission is prevented until the validaion requirement is met for the appropriate section.
* Red colored error messages appear for the name, email, and activity sections instructing the user on the needed requirement.
* Credit card errors are handled in separate handlers.
* Validation confirmation of credit card div only occurs if the div is displaying, otherwise this validation is not considered. 
*/


function errorCreation(message) {
    const error = document.createElement('div');
    const errorMessage = document.createElement('h6');
    errorMessage.textContent = message; 
    error.appendChild(errorMessage);
    return error;
}

/* errorCreation() function does the following:
* Creates a div and a child h6 element. 
* The h6 element text content is changed to a message that is input into the function. 
* The error div and h6 element are returned as error. 
*/

function paymentStringValidation2(number) {
    const regex =  /^[0-9]+$/
    if (regex.test(number)) {
        return true;
    } else {
        return false; 
    }
}

/* paymentStringValidation2() function does the following:
*  Accets 1 input which is tested against a regular expression evaluating exclusively for the presence of integer number values. 
*  If any other value types, including strings and floating point values, are used, a false is returned. 
*  If only integer values are present, a true boolean is returned. 
*/


function divRemoval(div, errorClass) {
     if (div.nextElementSibling !== null) {
        const correctedError = document.querySelectorAll(`.${errorClass}`);
        for (let i = 0; i <= correctedError.length; i++) {
            div.parentNode.removeChild(correctedError[i]);
        }
    } 
}

/* divRemoval() function does the following: 
*  Takes in two inputs of a refeence to the approrpriate credit card div reference(s) and an error class (from errorCreation()).
*  Loops through all error divs produced for a credit card payment input and removes error divs from the parent div of the credit card input. 
*  Applied to all three credit card input field to remove multiple error messages via following submit handlers. 
*/

form.addEventListener('submit', function() {
    if (creditCardInput.value.length < 13 || creditCardInput.value.length > 16 || !paymentStringValidation2(creditCardInput.value)) { 
       creditCardInput.style.borderColor = 'red';
       const error1 = errorCreation('Please enter a number between 13 and 16 digits');
       document.querySelector('.col-6').appendChild(error1);
       error1.setAttribute('class', 'Error1');
    }
    else {
        creditCardInput.style.borderColor = ''; 
        divRemoval(creditCardInput, 'Error1');
    }
})


form.addEventListener('submit', function() {
    if (zipInput.value.length < 5 || zipInput.value.length > 5 || !paymentStringValidation2(zipInput.value)) {
        zipInput.style.borderColor = 'red';
        const error2 = errorCreation('Please enter a 5 digit number');
        document.querySelector('.col-3').appendChild(error2);
        error2.setAttribute('class', 'Error2');
     }
     else {
        zipInput.style.borderColor = ''; 
        divRemoval(zipInput, 'Error2');
    }
})

form.addEventListener('submit', function() {
    if (cvvInput.value.length < 3 || cvvInput.value.length > 3 || !paymentStringValidation2(cvvInput.value)) {
        cvvInput.style.borderColor = 'red';
        const error3 = errorCreation('Please enter a 3 digit number');
        document.querySelectorAll('.col-3')[1].appendChild(error3);
        error3.setAttribute('class', 'Error3');
     }
     else {
        cvvInput.style.borderColor = ''; 
        divRemoval(cvvInput, 'Error3');
    } 
})




/* General pattern of credit card input change handlers: 
* Input value is evaluated on it's length and the presence of letter or punctuation (string) characters. 
* If validation requirements are not met, an error message will appear. 
* The input border color is changed to red and the errorCreation() function creates a specific error div for that input.
* The error div is appended to the parent div of the input and a specific 'Error' class is set to the error div.
* This applies custom created styling found at the bottom of the style.css file (.Error1, .Error2, .Error3).
* Upon change, if validation is met, the input border color is changed to normal and the error message is removed. 
*/