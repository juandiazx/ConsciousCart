// popup.js

// When button scrape pressed, send message to content.js
//-----------------------------------------------------------------------
// ()------>JSON{action:"scrapeData"} -----> content.js
//-----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('scrape_button').addEventListener('click', function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeData' });
    })

  });
});


// background.js sends processed scores to popup.js
//-----------------------------------------------------------------------
// ()<----------- JSON{action:"showDataFinal", data:JSON{title,about}} <----- background.js
//-----------------------------------------------------------------------
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'showDataFinal') {
    document.getElementById('result').textContent = request.data.title + request.data.about;
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
  let arrayInPercentages = [60,15]
  generateProgressBars(arrayInPercentages)
});
//-----------------------------------------------------------------------

//   percentage:List<Integer> -----> generateProgressBars() ---->Generates the 3 main progress bars
function generateProgressBars(percentagesArray) {
  let arrayIds = ["first-progress", "second-progress"]
  for (let i = 0; i < 2; i++){
    let circle = document.getElementById(arrayIds[i]).querySelector('circle');
    let percentText = document.getElementById(arrayIds[i]).querySelector('text');

    // Calculate the circumference of the circle
    let radius = circle.r.baseVal.value;
    let circumference = 2 * Math.PI * radius;

    // Calculate the dash offset to represent the percentage
    let offset = circumference - (percentagesArray[i] / 100) * circumference;

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
const homeContainer = document.getElementById('home-container');
const insertTextContainer = document.getElementById('insert-text-container');

// Initial View
homeContainer.style.display = 'block';
insertTextContainer.style.display = 'none';

// Button Click Handlers
homeButton.addEventListener('click', () => {
  homeContainer.style.display = 'block';
  insertTextContainer.style.display = 'none';
  pasteButton.querySelector("i").classList.remove("active-icon")
  pasteButton.querySelector("i").classList.add("inactive-icon")
  homeButton.querySelector("i").classList.add("active-icon")
  homeButton.querySelector("i").classList.remove("inactive-icon")
});

pasteButton.addEventListener('click', () => {
  homeContainer.style.display = 'none';
  insertTextContainer.style.display = 'block';
  pasteButton.querySelector("i").classList.add("active-icon")
  pasteButton.querySelector("i").classList.remove("inactive-icon")
  homeButton.querySelector("i").classList.remove("active-icon")
  homeButton.querySelector("i").classList.add("inactive-icon")
});
//-----------------------------------------------------------------------
