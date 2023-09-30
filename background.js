//background.js

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.action === 'processData') {
    try {
      const data = {
        title: request.data.title,
        about: request.data.about
    };
      /*
      const response = await fetch('https://your-api-endpoint.com', {
        method: 'POST',
        body: JSON.stringify({ title: title }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Send the response back to the popup
        
      } else {*/
      await chrome.runtime.sendMessage({action:"showDataFinal",data: data});
      //}
    } catch (error) {
      console.error(error);
    }

    // Tell Chrome that we want to use sendResponse asynchronously
    return true;
  }
});