//Random Quote Generator - David Barth

// List of Variables and Arrays:

var quotes = [
  {
    quote:"You must go forth into the world, with passion, courage in your conviction, and most importantly be true to yourself. I did it!", 
    source:"Donald Trump", 
    citation:"Commencement Speech", 
    year:"2017", 
    tag:"Self Indulgence",
  },
  
  {
    quote:"In my life, there are two things I've found I'm very good at: overcoming obstacles and motivating good people to do their best work.", 
    source:"Donald Trump", 
    citation:"Art of the Deal", 
    year: "1987", 
    tag:"Self Indulgence", 
  },
  
  {
    quote:"I judge people based on their capability, honesty, and merit.", 
    source:"Donald Trump", 
    citation:"Art of the Deal", 
    year:"1987", 
    tag:"Irony",
  },
  
  {
    quote:"I look at things for the art sake and the beauty sake and for the deal sake" ,
    source:"Donald Trump" , 
    citation:"Magazine Publication", 
    year:"1988", 
    tag:"Truth",
  },
  
  {
    quote:"I like to hire people that I've seen in action. I often hire people that were on the    opposing side of a deal that I respect.", 
    source:"Donald Trump", 
    citation:"Washington Post", 
    year:"1989", 
    tag:"Irony",
  },
  
  {
    quote:"I have featured and will always continue to feature my name prominently in all my enterprises.", 
    source:"Donald Trump", 
    citation:"Business Week", 
    year:"1985",  
    tag:"Truth", 
  },
];  //Primary quotes array 
  

var viewedQuotes = [

]; //Viewed quotes arrau to ensure duplicate quotes are reduced/eliminated

var selector; //The number generaed by the getRandomQuote function.

var selected; //The selected quote. 

var refresh = window.setInterval(printQuote, 30000); //This ensures a quote refresh every 30 seconds.
  

//List of Functions

function colorGen() { 
    var red = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    var color = "rgb" + "(" + red + "," + green + "," + blue + ")";
    document.body.style.background = color;
 }
//This function randomly generators a (red, blue, green) or rgb color coordinate value, which is then applied to the document background color.  This is an inner function to the printQuote function. 

function Quote_mover() { 
selected = quotes.splice(selector, 1); 
viewedQuotes.push(selected);   
if (quotes.length === 0) { 
    location.reload(); 
  }  
}; 
//This function splices/inserts the selected quote into the viewedQuotes array by removing it from the quotes array.  Once the quotes array is empty, quote_Mover forces a page reload to refresh the quotes array.  This function reduces duplicate quote occurrences and is an inner function to printQuote.

function getRandomQuote(array) {
    selector = Math.floor(Math.random() * quotes.length);
    return array[selector];
  }    
//This function obtains the quote selection criterion via random number generation and matches with the corresponding array index in order to pull a quote object out of the quotes array. This object is returned as a variabele in the printQuote function.  

function printQuote() {
  selected = getRandomQuote(quotes);
  document.getElementById("quote-box").innerHTML ='<p class="QUOTE">' + selected.quote + '</p>' + '<p class="source">' + selected.source + '<span class="citation">' + selected.citation +'</span>' + '<span  class="year">' + selected.year + '</span>' + '<span class="tag">' + selected.tag +    '</span>' +'</p>'; 
  colorGen();
  Quote_mover(); 
  document.getElementById('loadQuote').addEventListener("click", printQuote, false);
};
 
//This function takes the selected quote object and prints out the corresponding object properties to the DOM as a concatenated string, complete with appropriate html elements. All other functions are inner functions of this function, and are called once this function is called.  The event listener ensures that this function is called when the "load quote" is clicked. 


printQuote(); 


//Notes for the future:

//The location.reload method is an incovenient method of reducing duplication, as array splicing is more effective.  However this method is already used online by other students.  I chose this method for pedagogical purposes.  I will implement the splicing method at a later date, during portfolio showcasing. 

//I tried implementing a conditional humor rating system, that assigns a 1 of 5 humor ratings based on random number generation.  However, the code was bulky and the CSS formatting of the string addition looked awkward. I will try to add this feature in the future when my knowlede is more advanced. 

//Further CSS effects will be added to quote transitions and to the background effects, once further knowledge is learned. 

//Thank you for your time.