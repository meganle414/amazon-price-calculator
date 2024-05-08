chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getResults') {
    const url = request.url;
    fetch('http://localhost:3000/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    })
     .then((response) => response.json())
     .then((data) => {
        chrome.runtime.sendMessage({ action: 'showResults', results: data });
      })
     .catch((error) => {
        console.error('Error fetching results:', error);
      });
  }
});