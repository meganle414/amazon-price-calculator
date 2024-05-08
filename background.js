console.log("Entered background script");

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
        chrome.runtime.sendMessage({ action: 'howResults', results: data });
      })
     .catch((error) => {
        console.error('Error fetching results:', error);
      });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getResults') {
    const url = request.url;
    fetch(`http://localhost:3000/calculate`, {
      method: 'GET',
      credentials: 'include'
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Server response:', data);
      chrome.runtime.sendMessage({ action: 'showResults', results: data });
    })
    .catch((error) => {
      console.error('Error fetching results:', error);
    });
  }
});

// chrome.tabs.sendMessage(activeTab.id, { message: "Hello from the background script" }, (response) => {
//   if (chrome.runtime.lastError) {
//     console.error("Error sending message:", chrome.runtime.lastError);
//   } else if (response && response.message) {
//     console.log("Recv response = " + response.message);
//   } else {
//     console.log("No response received");
//   }
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log('Background request: ', request.action)
//   if (request.action === 'getHtml') {
//     chrome.tabs.executeScript({ code: 'document.documentElement.outerHTML' }, (html) => {
//       const result = { html: html[0], url: sender.tab.url };
//       sendResponse(result);
//     });
//   } else if (request.action === 'parseHtml') {
//     console.log('Item count:', request.itemCount);
//     console.log('Total price:', request.totalPrice);
//     console.log('URL:', request.url);

//     // Display the extracted information in the popup
//     // You can use the DOM API to update the content of the popup
//   }
// });

// function parseHtml(html, url) {
//   console.log('Entered parseHTML')
//   const dom = new DOMParser().parseFromString(html, 'text/html');

//   // Extract the prices
//   let prices = [];
//   const elements = dom.querySelectorAll('span.a-price');
//   for (let i = 0; i < elements.length; i++) {
//     const priceText = elements[i].textContent.replace('$', '');
//     prices.push(parseFloat(priceText));
//   }

//   // Calculate the total price
//   const totalPrice = prices.reduce((acc, current) => acc + current, 0);

//   console.log('item count: ', prices.length)
//   console.log('total price: $', totalPrice.toFixed(2))
  
//   // Return the result
//   return {
//     itemCount: prices.length,
//     totalPrice: totalPrice.toFixed(2),
//   };
// }