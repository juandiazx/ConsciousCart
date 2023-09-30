// popup.js

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('scrapeButton').addEventListener('click', async function() {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const response = await chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeData' });
      
      // Handle the response from content script
      if (response.error) {
        console.error(response.error);
        document.getElementById('results').textContent = 'Error occurred while fetching data.';
      } else {
        document.getElementById('results').textContent = response.data;
      }
    } catch (error) {
      console.error(error);
      document.getElementById('results').textContent = 'Error occurred while fetching data.';
    }
  });
});