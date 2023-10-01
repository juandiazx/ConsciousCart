// popup.js

// When button scrape pressed, send message to content.js
//-----------------------------------------------------------------------
// ()------>JSON{action:"scrapeData"} -----> content.js
//-----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('scrape_button_1').addEventListener('click', function () {
    //chrome.runtime.sendMessage({ action: 'scrapeData'});
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeData' });
    })
  });
});

// When button check text pressed, send description text to background.js
//-----------------------------------------------------------------------
// ()------>JSON{action:"processDataDescription",} -----> background.js
//-----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("scrape_button_2").addEventListener('click', function () {

    const data = {
      description: document.getElementById('multiline-input').value,
    };
    console.log(data.description)
  chrome.runtime.sendMessage({ action: 'processDataDescription', data: data });

  });
});


// background.js sends scraped processed scores to popup.js
//-----------------------------------------------------------------------
// ()<----------- JSON{action:"showDataFinal", data:JSON{title,about}} <----- background.js
//-----------------------------------------------------------------------
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'showDataFinal') {
    const resultText = `Environmental Score: ${request.data.env_score}, Health Score: ${request.data.safety_score}`
    document.getElementById('result').textContent = resultText;
    generateProgressBars([request.data.env_score, request.data.safety_score],["first-progress-1", "second-progress-1"])
  }
});
//-----------------------------------------------------------------------

// background.js sends description processed scores to popup.js
//-----------------------------------------------------------------------
// ()<----------- JSON{action:"showDataFinal", data:JSON{title,about}} <----- background.js
//-----------------------------------------------------------------------
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'showDataFinalDescription') {
    //const resultText = `Sentiment Score: ${request.data.sent_score}, Bio Score: ${request.data.bio_score}, Materials: ${request.data.materials.join(', ')}, Harm Score: ${request.data.harm_score}, Chemicals: ${request.data.chemicals.join(', ')}`
    const resultText = `Environmental Score: ${request.data.env_score}, Health Score: ${request.data.safety_score}`
    document.getElementById('result').textContent = resultText;
    generateProgressBars([request.data.env_score, request.data.safety_score],["first-progress-2", "second-progress-2"])
  }
});
//-----------------------------------------------------------------------


//When X Closing Button pressed, the popup gets closed
//-----------------------------------------------------------------------
document.getElementById("close-button").addEventListener('click',function () {
  window.close()
})
//-----------------------------------------------------------------------

//When popup loaded generate the progress bars
//-----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  generateProgressBars([15,70],["first-progress-1", "second-progress-1"])
});
//-----------------------------------------------------------------------

//   percentage:List<Integer> -----> generateProgressBars() ---->Generates the 3 main progress bars
function generateProgressBars(percentagesArray,arrayIds) {
  for (let i = 0; i < 2; i++){
    let circle = document.getElementById(arrayIds[i]).querySelector('circle');
    let percentText = document.getElementById(arrayIds[i]).querySelector('text');

    // Calculate the circumference of the circle
    let radius = circle.r.baseVal.value;
    let circumference = 2 * Math.PI * radius;

    // Calculate the dash offset to represent the percentage
    let offset = circumference - (percentagesArray[i] / 100) * circumference;

    // Set the stroke-dasharray property to the full circumference
    circle.style.strokeDasharray = circumference;

    // Set the stroke-dashoffset property to create the progress effect
    circle.style.strokeDashoffset = offset;

    // Set the percentage text and position it at the center
    percentText.textContent = `${percentagesArray[i]}%`;
  }
}
//-----------------------------------------------------------------------


//Handle bottom navigation
//-----------------------------------------------------------------------
// DOM Elements
const homeButton = document.getElementById('home-button');
const pasteButton = document.getElementById('search-button');
const homeContainer = document.getElementById("container-progress-bars-1");
const insertTextContainer = document.getElementById("second-switch-container");

const button1 = document.getElementById("container-button-1")
const button2 = document.getElementById("container-button-2")

// Initial View
homeContainer.style.display = 'flex';
insertTextContainer.style.display = 'none';

// Button Click Handlers
homeButton.addEventListener('click', () => {
  homeContainer.style.display = 'flex';
  insertTextContainer.style.display = 'none';
  var h1Element = document.querySelector('#home-container h1');
  button1.style.display = "flex"
  button2.style.display = "none"

    // Check if the h1 element exists
    if (h1Element) {
        // Create a new span element
        var newSpan = document.createElement('span');
        newSpan.className = 'bold-words'; // Apply the same class as the existing span elements
        newSpan.textContent = 'social';

        // Create another new span element
        var anotherNewSpan = document.createElement('span');
        anotherNewSpan.className = 'bold-words'; // Apply the same class as the existing span elements
        anotherNewSpan.textContent = 'environmental';

        // Replace the content of the h1 element with the new spans and text
        h1Element.innerHTML = 'Automatically checks the ' + newSpan.outerHTML + ' and ' + anotherNewSpan.outerHTML + ' score of your current online product';
  }
  //GENERATE BARS
  generateProgressBars([15,88],["first-progress-1", "second-progress-1"])
});

pasteButton.addEventListener('click', () => {
  homeContainer.style.display = 'none';
  insertTextContainer.style.display = 'flex';
  var h1Element = document.querySelector('#home-container h1');
  button2.style.display = "flex"
  button1.style.display = "none"

    // Check if the h1 element exists
    if (h1Element) {
        // Create a new span element
        var newSpan = document.createElement('span');
        newSpan.className = 'bold-words'; // Apply the same class as the existing span elements
        newSpan.textContent = 'social';

        // Create another new span element
        var anotherNewSpan = document.createElement('span');
        anotherNewSpan.className = 'bold-words'; // Apply the same class as the existing span elements
        anotherNewSpan.textContent = 'environmental';

        // Replace the content of the h1 element with the new spans and text
        h1Element.innerHTML = 'Check the ' + newSpan.outerHTML + ' and ' + anotherNewSpan.outerHTML + ' score of any online product description';
  }
  //GENERATE BARS
  generateProgressBars([5,45],["first-progress-2", "second-progress-2"])
});
//-----------------------------------------------------------------------


const buttons = document.querySelectorAll('.button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
});

