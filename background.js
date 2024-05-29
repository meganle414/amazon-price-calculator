chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getResults') {
    const url = request.url;
    // was http://localhost:3000/calculate
    fetch('https://amazon-price-calculator-7caab1aba55b.herokuapp.com/calculate', {
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