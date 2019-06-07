//Project 6:  Webscraper for Mike's Shirts. 

//Required modules: 

const cheerio = require('cheerio');
const bluebird = require('bluebird');
const requestPromise = require('request-promise'); 
const fs = require('fs');
const converter = require('json-2-csv');

/* Explanation for module choices: 
A. Cheerio: Offers a easy way to use JQuery syntax to build customized webscraper code. 
B. bluebird: This module allows usage of many conventional promise based syntax for efficient handling of promises. 
C. requestPromise: Like request, but makes https requests using promise syntax with then() and catch() methodology.  
D. fs: File systems is used for writing the csv file as needed. 
E. json-2-csv: After using a couple json-csv conversion modules, I found this one to work for my generated data most efficiently and effectively.

Addendum: The project says for the use of 2 external modules.  requestPromise is noted to include the bluebird library as a part of its functionality. 
I consider bluebird to be an extension of requestPromise, rather than its own standalone module. 
*/


//JSON Class: 

class jsonObject {
    constructor
    (Title, Price, ImgURL, URL, time) {
      this.Title = Title;
      this.Price = Price;
      this.ImgURL = ImgURL;
      this.URL = URL;
      this.time = time;
    }
}

/* Explanation: 
* This class takes the necessary information and organizes them into JSON format to allow for conversion to csv. 
* The order of the object keys reflects the desired order for information to be written into the csv file.
*/


//Helper Functions: 


function endPointScraping (response) {
    const $ = cheerio.load(response);
    shirtLinks = [];
    $('.products li a').each(function () {
        shirtLinks.push($(this).attr('href')); 
    });
    const fullUrl = shirtLinks.map(link => 'https://shirts4mike.com/' + link)
    return fullUrl
}

/* function role: 
* Loads https response into cheerio and extracts the URL endpoints for each shirt into an array. 
* These endpoints are transformed into full shirt URLs and returned as an array. 
*/


function control (links) {
    const promises = links.map(link => {
        return requestPromise(link);
    })
    return jsonConversion(promises, links);
}

/* function role:
* Accepts array of shirt URLs and changes it to an array of promises, with each promise being a requestPromise instance of a shirt URL. 
* This array and the shirt URLs array are input into jsonConversion() to return a CSV value containing the specified information.
*/


function jsonConversion (promises, links) {
    const jsonData = bluebird.all(promises).then(promises => { 
        const jsonData = promises.map((promise, index) => { 
            const $ = cheerio.load(promise);   
            const title = $('.shirt-details h1').text();
            const price = $('.price').text();
            const imgURL = $('.shirt-picture span img').attr('src');
            const URL = links[index];
            const time = createTime();
            const jsonContainer = new jsonObject(title, price, imgURL, URL, time);
            return jsonContainer;
        })
        
        const csv = converter.json2csv(jsonData, (csv, error) => { 
            console.log(csv); 
            if (error) throw error; 
            csvFileWrite(csv);
        })
    })
}

/* function role: 
* Accepts array of promises and array of shirt URLs from the control() function. 
* The first block of the function processes each promise into information needed to instantiate a json object for each shirt. 
* Information is selected and processed by loading the promises (responses) into cheerio. 
* The result is an array of json objects that is then converted and written into a CSV file. 
*/


function csvFileWrite (csv) {
    if (!fs.existsSync('./data/')) {
        fs.mkdirSync('data', (err) =>  { 
            if (err) throw err;
          });
    } else {
        console.log('Folder Exists');
    }
   fs.writeFileSync(`./data/${createDate()}.csv`, csv, {encoding:'utf8',flag:'w'});
}

/* function role: 
* This function accepts the CSV value and writes it into a directory called 'data'. 
* 'data' is only created if there was no such directory previously existing. 
* The directory and files are sequentially and synchronously written to allow appropriate CSV placement.
*/


function createTime () {
    const date = new Date();
    const hour = date.getHours(); 
    const minutes = date.getMinutes();
    const fullTime = `${hour}:${minutes}`; 
    return fullTime;
}

function createDate () {
    const date = new Date(); 
    const day = date.getDay(); 
    const month = date.getMonth(); 
    const year = date.getFullYear().toString();
    const fullDate = `${year}-${month}-${day}`; 
    return fullDate;
}

/* Time function roles: 
* Both time functions generate the time and dates at the points they are called. 
* Each respectively generates a time (formatted as hour:minute) and a date (formatted as year-month-year).
* The time is used for the 'this.time' key in the jsonObject constructor method. 
* The date is used as the CSV file name, when it is written.
*/


// Main webscraper code and error handler. 

const infoScraper = requestPromise('https://shirts4mike.com/shirts.php')  //HTTPs request for shirt information is made. 

infoScraper.then(endPointScraping)  //URL end points extracted and assembled into array of individual shirt URLs.  

.then(control) //Shirt URL responses used to assemble JSON objects for each shirt and to write a CSV file of relevant shirt information.

.catch((error) => {
    const startIndex = error.message.length - 3
    const endIndex = error.message.length
    const eCode = error.message.slice(startIndex, endIndex);
    const eType = error.name;
    console.error(`Error ${eCode} - ${eType}: Cannot access website URL.`);
})

/*  Error handler explanation:
* Error handler is designed to handle requestErrors, ie errors due to connectivity issues with the main URL or due to issues with the URL itself.
* Information from the error object is used, via catch(), to process a more user friendly error message upon a request error issue. 
*/



