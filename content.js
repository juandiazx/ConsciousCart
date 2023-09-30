chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'scrapeData') {
      const data = {
        h1Content: document.getElementById('productTitle').textContent
      };
      chrome.runtime.sendMessage({ action: 'processData', data: data });
    }
  });