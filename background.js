//background.js
const apiUrl = "http://127.0.0.1:5000/";
/*
fetch(apiUrl)
    .then(response => response.text())
    .then(data => {
        alert(data);  // This should print "Hello, World!" if everything is set up correctly
    })
    .catch(error => {
      alert("There was an error fetching data from the Flask server:", error);
    });
*/
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
