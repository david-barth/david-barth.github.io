/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//Variables List 
const studentPool = document.getElementsByClassName('student-item');
const studentHeader = document.querySelector('.page-header h2')
const headerDiv = document.querySelector('.cf')
const pageDiv = document.querySelector('.page')
let paginationDiv = document.querySelector('pagination');

//Student pool represents the total list of students that will be used for the subsequent pagination functions.
//All other selected elements are used for dynamic addition of elements created within the unobstrusive javascript to follow. 
//The pagination div is subject to removal within the appendPageLinks function, and so is used as let rather than const.

//Functions

const listEraser = (list) => {
    for (i = 0; i<list.length; i++) {
        list[i].style.display = 'none';
    }
}
//This function ensures that the previous list of "studentPool" is left out of display for when pagination is 
//aplied to the search list. 

const noList = (list) => {
    if (list.length === 0) {
        studentHeader.textContent = 'No students'
    } else {
        studentHeader.textContent = 'Students'
    }
}
//This function ensures that, uf the search list contains no student entries, than the header of "students" is changed to "No Stuents".
//This reflects that there are no returned search results. 


const showPage = (list, page) => {
    listEraser(studentPool);
    noList(list)
    for (let i = 0; i<list.length; i+=1) { 
        if (i>=page*10 && i<=(page*10)+9) {  
            list[i].style.display = 'block';
        } else {
            list[i].style.display = 'none';  
        } 
    } 
}
//The above two functions are used as callback functions for generated search lists, to ensure that searched students are displayed only.
//The list of students (either searched or the complete list) is looped through and students are only displayed in sets of 10.
//The i variable of the for loop is adjusted in the conditional programming with a further page argument. 
//This page argument represents the number of pages that groups of 10 students should be rendered on display on the page.
//The page argument also orders the student displays numerically. 


const appendPageLinks = (list) => {
    if (pageDiv.lastChild.className === 'pagination') {
        pageDiv.removeChild(pageDiv.lastChild); 
    };
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'pagination';
    pageDiv.appendChild(paginationDiv);
    const paginationUl = document.createElement('ul');
    paginationDiv.appendChild(paginationUl);   
    //This segment of code removes previous pagination and dynamically adds the necessary pagination Div and the unordered list to the markup
    for (let i=0; i<=((Math.ceil(list.length/10)-1)); i+= 1) {
        const paginationLi = document.createElement('li');
        const paginationa = document.createElement('a');
        paginationUl.appendChild(paginationLi);
        paginationLi.appendChild(paginationa); 
        let selected = document.querySelectorAll('.pagination ul li a');
        selected[i].innerHTML = `${i+1}`;
        selected[i].setAttribute('href', `#${i+1}`);
    }
    //This segment loops through through the total number of pages (defined as the list length divided by 10 and rounded up).
    //The loop dynamically adds list elements and anchor elements to the unordered list created previously.
    //The inner html and href attribute of the generated anchor elements are adjusted because the provided list is an array-like object with indices starting at 0.
    //The limit of the loop also substracts 1 here to generate a "0" value for the pagination in the loop.
        showPage(list, 0)
    //The previous showpage function is used with a 0 page value in order to show all pages starting from students 0-9 in the list.
    paginationDiv.addEventListener('click', function() {
         let pageNum = parseInt(event.target.textContent) - 1; 
         showPage(list, pageNum);
         const paginationLinks = document.querySelectorAll('.pagination ul li a');
         for (let i=0; i<paginationLinks.length; i++) {
            paginationLinks[i].className = 'active';
            if (paginationLinks[i].className === 'active') {
                paginationLinks[i].classList.remove('active');
            }
        }
         event.target.className = 'active';
    });
    //The final segment of code within the event listener uses event delegation to handle clicks to different pages. 
    //Event targetting is used to obtain a reference to the page number clicked.  This reference is adjusted as per the array index of the collection of html objects.
    //The selection of "paginationLinks" is used to set the length of the for loop in order to add the "active" class to the pages and remove any previous active classes. 
    //Finally the active class is added to the event target. 
    //This code is bound to a click event listener. 
    let pageNumber = Math.ceil(list.length/10) //This is the defined page number variable for the list.
}

const searchBar = () => {
    const searchContainer = document.createElement('div');
    headerDiv.appendChild(searchContainer);
    searchContainer.setAttribute('class', 'student-search');
    const searchInput = document.createElement('input');
    searchContainer.appendChild(searchInput);
    searchInput.setAttribute('placeholder', 'Search for students...');
    const searchButton = document.createElement('button');
    searchContainer.appendChild(searchButton);
    searchButton.textContent = 'Search'
    const searchFunctionality = () => {
        let searchValue = searchInput.value;
        let List = Array.from(studentPool);
        var List2 = [];
        for (let i = 0; i < studentPool.length; i++) {
        if (List[i].textContent.includes(searchValue) === true) {
            List2.splice(i, 0, List[i]);
        }
    }
        appendPageLinks(List2);
    };
    searchButton.addEventListener('click', searchFunctionality);
    searchInput.addEventListener('keyup', searchFunctionality);
}
//This function handles the search functionality of the project.
//The first segment of code (lines 102-110) creates the necessary html markup for the search bar.
//The searchFunctionality callback function takes in the search input and uses matching criteria as follows. 
//The total student list (list1 here) is converted to an array in order to allow more flexible array methods to be used.
//List2 is defined with var in order to be used in the global scope, since it's use in other functions as the 'list' argument is needed.
//Using array method includes(), and a for loop over the total student list, any matches of search input and student entries return true values. 
//These true values allow for the List1 item to be spliced into list2, to be returned as a search result. 
//List2, as defined in the global scope, is then fed into the appendPageLinks function and thus the showPage function.
//This acheives pagination of the search results
//Finally, this search functionality is made responsive in real time to key typing and to click events.


appendPageLinks(studentPool); //This function calling paginates the default total list
searchBar(); //This function calling implements the search bar markup and the search function


//All 'active' classes and search bar html elements are automatically styled in the CSS external stylingsheet. 
//In total this code creates unobtrusive JS based pagination for the student list.  























