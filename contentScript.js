console.log("contentScript.js");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Recv. Send response = " + document.url);
  sendResponse({ title: document.title, url: document.url });

  return true;
});

chrome.runtime.sendMessage({ message: "Hello from Amazon.com" }, (response) => {
  console.log("Recv response = " + response.message);
});

// document.addEventListener("DOMContentLoaded", function () {
//   // Get the active tab's URL and update the result container
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     const activeTab = tabs[0];
//     const url = activeTab.url;
//     document.getElementById("result-container").innerText = url;

//     alert("Content Script injected on " + url);
//   });
// });

// // const url = window.location.hostname;


// console.log('Entered content script');
// function parseHtml(html, url) {
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

//   console.log('Total Price: $', totalPrice);

//   // Send the extracted information back to the background script
//   chrome.runtime.sendMessage({
//     itemCount: prices.length,
//     totalPrice: totalPrice.toFixed(2),
//     url: url
//   });
// }

// // Extract the HTML and URL of the current tab
// chrome.runtime.sendMessage({ action: 'getHtml' }, (response) => {
//   console.log("sending message");
//   parseHtml(response.html, response.url);
// });