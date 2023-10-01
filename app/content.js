//content.js

// Receives scrape request from popup.js, scrapes data from DOM and sends data to background.js
//-----------------------------------------------------------------------
//    <----------- JSON{action:"scrapeData"} <----- popup.js
// ()
//    -------------> JSON{
//                          action: "processData",
//                          data:JSON{
//                                      title:textContent -------> background.js
//                                      about:textContent
//                                   }
//                      }
//-----------------------------------------------------------------------
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'scrapeData') {
      const data = {
          title: document.getElementById('productTitle').textContent,
          about: document.getElementById('feature-bullets').textContent
      };
      chrome.runtime.sendMessage({ action: 'processData', data: data });
    }
  });