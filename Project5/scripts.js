//Project 5: Employee Directory Created by Public API. 

/*  Hi there! Welcome to my project.  The gallery segment of the project uses a functional approach and the modal window part uses an object oriented approach.
For interaction with a public API, I chose the fetch() method for its simplicity and efficient use of code space, compared to the normal AJAX XHR object approaxh.
*/


//Key DOM Element Selection Variables: 

const gallery = document.getElementById('gallery'); 
const body = document.querySelector('body');

//Part 1. The Gallery:  

//A.  Helper Functions:  Functions used to create the approriate div elements, extract information from the fetch response object, and place them in the appropriate HTML markups. 

function imageCreate(dataSet, div, i) { 
    let img = document.createElement('img'); 
    div.firstElementChild.appendChild(img);  
    img.setAttribute('class', `card-img ${i}`);
    img.setAttribute('src', `${dataSet.picture.large}`);
    img.setAttribute('alt', 'profile picture');
}

/* imageCreate() explanation:
*  Accepts user information from the API (dataSet), a selected div element, and an index i for class labeling purposes. 
*  Creates and appends an img element to the selected div and sets the attributes as required. 
*  Extracts image url information from dataSet and sets it as the src value for the img.
*/

function infoPlacement(dataSet, div, i) {
    //let infoDiv = document.querySelector('.card-info-container');  -> Keep and see if function works without this in final debugging. 
    let name =  document.createElement('h3'); // h3 code segment starts here
    div.firstElementChild.nextElementSibling.appendChild(name);
    name.setAttribute('id', 'name');
    name.setAttribute('class', `card-name cap ${i}`);
    name.textContent = `${dataSet.name.first} ${dataSet.name.last}`;
    let email =  document.createElement('p');  // email p code starts here. 
    div.firstElementChild.nextElementSibling.appendChild(email);
    email.setAttribute('class', `card-text ${i}`);
    email.textContent = `${dataSet.email}`
    let location =  document.createElement('p'); // location p code starts here.
    div.firstElementChild.nextElementSibling.appendChild(location);
    location.setAttribute('class', `card-text cap ${i}`);
    location.textContent = `${dataSet.location.city}`
}

/* infoPlacement() explanation:
*  Accepts user information from the API (dataSet), a selected div element, and an index i for class labeling purposes. 
*  Creates an h3 element to contain name information, a p element for email, and a p element for location information. 
*  For each element, the element is appended to the supplied div element and its attributes are set, all according to provided html mock ups.
*  Information is extracted from the API dataSet variable and set as the value to the approrpriate attribute / text content. 
*/

function profileContainerCreate(i) {
    let cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', `card ${i}`);
    gallery.appendChild(cardDiv);
    let imgDiv = document.createElement('div');
    imgDiv.setAttribute('class', `card-img ${i}`);
    cardDiv.appendChild(imgDiv);
    let infoDiv = document.createElement('div');
    infoDiv.setAttribute('class', `card-info-container ${i}`);
    cardDiv.appendChild(infoDiv);  
}

/* profileContainerCreate() explanation:
*  Accepts an index of i from a for loop for class labeling purposes. 
*  Creates, appends, and sets attribute information for the card, image, and information containing divs. 
*/


//B.  Fetch and gallery creation functions: The fetch request is made and the parsed response object is fed into the helper functions. 


function fetchData(url) {
    return fetch(url)
           .then(res => res.json()); 
  }

/* fetchData() explanation:
* Accepts the API url from a site, makes a fetch() request, and parses the response information to a usable object in Javascript. 
*/  

function createGallery() {
    const response = fetchData('https://randomuser.me/api/?results=12');
    response.then(function (dataSet) {
            for (let i = 0; i < dataSet.results.length; i++) {
                profileContainerCreate(i); 
                let div = document.querySelectorAll('.card')[i]; 
                imageCreate(dataSet.results[i], div, i); 
                infoPlacement(dataSet.results[i], div, i)
            }
            })
            .catch(error => console.log(error)); 
    return response;
}

/* createGallery() explanation:
* Calls fetchData with the randomuser API and obtains the parsed response object, containing information of 12 random employees.  
* then() callback function creates 12 user card divs, and calls on the helper functions iteratively to create the user profiles. 
* The approrpriate results of the response object, the card div, and the iteration value are used as arguments to correctly sort the information.
* A simple catch() method is placed for error handling (can be expanded later) and the response object is returned for use in the modal window.
*/  

const galleryInfo = createGallery(); //Gallery is generated and response object is obtained for future use. 


//Part 2. Modal window class and associated handling:


// Part A.  //Modal window class used to generate new windows when instantiated.  

class modalWindow {
    constructor(body, profile) {
        this.body = body; 
        this.profile = profile;
    }

/* constructor method explanation:
*  Designed to accept the selected body element and the results property information of a selected user from the response object. 
*/  

    markUpCreation() { 
        let elementCollection = ['div', 'div', 'button', 'div', 'img', 'h3', 'p', 'p', 'hr', 'p', 'p', 'p'];
        elementCollection = elementCollection.map( x => document.createElement(x));
        this.body.appendChild(elementCollection[0]).appendChild(elementCollection[1]);
        elementCollection[0].setAttribute('class', 'modal-container'); 
        elementCollection[1].appendChild(elementCollection[2]); 
        elementCollection[1].appendChild(elementCollection[3]);
        for (let i = 4; i < elementCollection.length ; i++) {
             elementCollection[3].appendChild(elementCollection[i]); 
        } 
    }

/* markupCreation() explanation:
*  Iteratively transforms strings in elementColltection Array to corresponding html elements. 
*  The modal-container div is appended to the body and the modal div is appended to the modal-container. 
*  The rest of the elements are appended as specified in the sturcture of the mockup modal html mark up. 
*/  

    setAttributes(element, elementArray, attributeArray, valueArray) { //Helps to set multiple attributes at once. 
        if (elementArray === false) {
            for (let i = 0; i < attributeArray.length; i++) {
                element.setAttribute(attributeArray[i], valueArray[i]);
            }
        } 
        else {
            for (let i = 0; i < elementArray.length; i++) {
                elementArray[i].setAttribute(attributeArray, valueArray);
            }
        }
    }

/*  setAttributes() explanation:
*  Accepts either an element or an array of elements, an array of attributes, and an array of values. 
*  The 1st loop is for a single element with multiple attributes and the 2nd loop is for a set of elements with only single attributes. 
*  1st loop: If elementArray is set to false (no element array present), then a list of attributes is defined and corresponding values are set for the element. 
*  2nd loop: If elementArray is present (and element is false), then singular attribute : value pairs are iteratively defined and set for each array element.
*/  


    infoHandler(button, img, name, profile) { 
        const textElements = Array.from(document.querySelectorAll('.modal-container .modal p')); //Also selects p element children  of the modal div. 
        button.innerHTML = '<strong>X</strong>';
        img.src = `${profile.picture.large}`; 
        name.innerHTML = `${profile.name.first} ${profile.name.last}`;
        textElements[0].innerHTML = `${profile.email}`; 
        textElements[1].innerHTML = `${profile.location.city}`;
        textElements[1].className += 'cap'
        textElements[2].innerHTML = `${profile.cell}`;
        textElements[3].innerHTML = `${profile.location.street}, ${profile.location.state} ${profile.location.postcode}`;
        textElements[3].className += 'cap'
        textElements[4].innerHTML = `Birthday: ${profile.dob.date.slice(5, 7)}/${profile.dob.date.slice(8, 10)}/${profile.dob.date.slice(2, 4)}`;
    }
    //1983-02-04
           

/* infoHandler explanation:
* Accepts the elements of button, img, and h3 (name) as well as the response object results corresponding to a selected person's profile info. 
* Sets all inner html and attributes of selected and input objects as specified in mock up, directly with information extracted from the profile input. 
* Adds the 'cap' class to capitalize the text of appropriate p elements. 
*/      
    
    attributeCreation(profile) { //Handles setting the attributes for the modal window 
        const modalContainer = document.querySelector('.modal-container'); 
        const modalDiv = modalContainer.firstElementChild;
        const modalInfoContainer = modalDiv.firstElementChild.nextElementSibling;
        const modalChildren = modalInfoContainer.children;
        const modalCloseButton = modalDiv.querySelector('div div button');
        const modalImg = modalChildren[0];
        const modalName = modalChildren[1];
        const modalText = document.querySelectorAll('.modal-container .modal p'); 
        modalDiv.setAttribute('class', 'modal');
        modalInfoContainer.setAttribute('class', 'modal-info-container');
        this.setAttributes(modalCloseButton, false, ['type', 'id', 'class'], ["button", "modal-close-btn", "modal-close-btn"]);
        this.setAttributes(modalImg, false, ['class', 'src', 'alt'], ["modal-img", "https://placehold.it/125x125", "profile picture"]);
        this.setAttributes(modalName, false, ['id', 'class'], ["name", "modal-name cap"]);
        this.setAttributes(false, modalText, 'class', 'modal-text');
        this.infoHandler(modalCloseButton, modalImg, modalName, profile);
    }

/* attributeCreation() explanation:
* Accepts profile information about user from response object.  
* Selects the elements of the modal window, and calls the setAttribute() method to set the attribute : value pairs for all relevant modal elements (button, img, h3, p).
* Also calls the infoHandler() method to set the user specific information of the modal window to their appropriate elements. 
*/  

    windowCreation(profile) { //Handles the actual cration of the window. 
        this.markUpCreation(); 
        this.attributeCreation(profile);
    }
    
/* windowCreation() explanation: 
* Accepts profile information about user from response object. 
* Calls the markupCreation() and attributeCreation() methods to actually create the modal window entirely.  
*/
}   


//B. Click Handlers for window creation and window closure: 

body.addEventListener('click', function(event){ //Window creation
    let selected = event.target.className.split(' '); 
    let identifier = parseInt(selected[1]); 
    if (selected.length === 3) {  // Used in case of h3 name element selection. There are two spaces in this class name.
        identifier = parseInt(selected[2]);  // This line adjusts the selection so that the number label is selected. 
    }
    galleryInfo.then(function (response) {
        for (i = 0; i < response.results.length; i++) {
            if (identifier === i) {
                let selectedProfile = response.results[i];
                const modal = new modalWindow(body, selectedProfile); 
                modal.windowCreation(selectedProfile);
            }
        }
    })
})

/* Window Creation handler explanation: 
* Uses event targetting and split method to obtain the value of a number label assigned to all gallery profile elements. 
* Modal window class is instantiated when the number label of the event target matches the appropriate results index of the response object. 
* The html body and the matched/selected profile are used for the modal window and it is created by calling windowCreation(). 
*/


body.addEventListener('click', function(event) { //Window closure
    let selected = event.target;
    if (selected.innerHTML === 'X' || selected.id === 'modal-close-btn') {
        const modalContainer = document.querySelector('.modal-container');
        body.removeChild(modalContainer);
    }
});

/* Window closure handler explanation: 
* Uses event targetting to see if element text content corresponds to close button text. 
* If there is a match, the window is closed by removal of the modal window div from the html body. 
*/








