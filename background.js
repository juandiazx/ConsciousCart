/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Handle API request here, send data to your API endpoint
  // For example:
  // fetch('http://your-api-endpoint.com/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(request.data)
  // })
  // .then(response => response.json())
  // .then(data => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, { action: 'showData', data: data });
  //   });
  // });
});*/


chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.action === 'processData') {
    try {
      const title = request.data.h1Content;
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
      await chrome.runtime.sendMessage({action:"showDataFinal",data: title});
      //}
    } catch (error) {
      console.error(error);
    }

    // Tell Chrome that we want to use sendResponse asynchronously
    return true;
  }
});