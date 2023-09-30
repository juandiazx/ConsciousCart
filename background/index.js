

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.action === 'scrapeData') {
    const productTitle = document.querySelector('your-selector-for-product-title').innerText;
    try {
      const response = await fetch('https://your-api-endpoint.com', {
        method: 'POST',
        body: JSON.stringify({ title: productTitle }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Send the response back to the popup
        sendResponse({ data: data.result });
      } else {
        sendResponse({ error: 'Error occurred while fetching data.' });
      }
    } catch (error) {
      console.error(error);
      sendResponse({ error: 'Error occurred while fetching data.' });
    }

    // Tell Chrome that you want to use sendResponse asynchronously
    return true;
  }
});




  
  