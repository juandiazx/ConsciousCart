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


// Background sends showData to popup.js receives {data}
//-----------------------------------------------------------------------
// ()------>JSON{action:"scrapeData"} -----> content.js
//-----------------------------------------------------------------------
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'showDataFinal') {
    document.getElementById('result').textContent = request.data;
  }
});
//-----------------------------------------------------------------------


//When X Closing Button pressed, the popup gets closed
//-----------------------------------------------------------------------
document.getElementById("close-button").addEventListener('click',function () {
  window.close()
})
//-----------------------------------------------------------------------

