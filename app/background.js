//background.js

const apiUrl = "http://127.0.0.1:5000/";


// Receives processData request from content.js, sends data to API, receives and send to popup.js
//-----------------------------------------------------------------------
//    <----------- JSON{
//                          action: "processData",
//                          data:JSON{
//                                      title:textContent    <----- content.js
//                                      about:textContent
//                                   }
//                      }
// ()
//    -------------> JSON{
//                          action: "showDataFinal",
//                          data:JSON{
//                                      sent_score:Float -------> popup.js
//                                      bio_score:Float
//                                      materials:String
//                                      harm_score:Float
//                                      chemicals:String
//                                   }
//                      }
//-----------------------------------------------------------------------
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.action === 'processData') {
    try {
      const data = {
        title: request.data.title,
        about: request.data.about
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        await chrome.runtime.sendMessage({action: "showDataFinal", data: responseData});
      } else {
        console.error("Error fetching data from Flask server:", await response.text());
      }
    } catch (error) {
      console.error(error);
    }

    // Tell Chrome that we want to use sendResponse asynchronously
    return true;
  }
});
//-----------------------------------------------------------------------


// Receives processDataDescription request from popup.js, sends data to API, receives and sends to popup.js
//-----------------------------------------------------------------------
//    <----------- JSON{
//                          action: "processDataDescription",
//                          data:JSON{
//                                      description:String    <----- popup.js
//                                   }
//                      }
// ()
//    -------------> JSON{
//                          action: "showDataFinalDescription",
//                          data:JSON{
//                                      sent_score:Float -------> popup.js
//                                      bio_score:Float
//                                      materials:String
//                                      harm_score:Float
//                                      chemicals:String
//                                   }
//                      }
//-----------------------------------------------------------------------
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.action === 'processDataDescription') {
    try {
      const data = {
        description: request.data.description,
      };
/*
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
*/
      //if (true) {
        //const responseData = await response.json();
        await chrome.runtime.sendMessage({action: "showDataFinalDescription", data: data});
      //} else {
        //console.error("Error fetching data from Flask server:", await response.text());
      //}
    } catch (error) {
      console.error(error);
    }

    // Tell Chrome that we want to use sendResponse asynchronously
    return true;
  }
});
