document.addEventListener("DOMContentLoaded", function () {
  updateResultContainer();
  updateShortcutText();
  listenForMessages();
});

function updateResultContainer() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    const tabId = activeTab.id;
    const url = activeTab.url;
    document.getElementById("result-container").innerText = url;
    console.log("Send");
    chrome.runtime.sendMessage({ action: 'getResults', url })
  });
}

// function handleResponse(response) {
//   if (response && response.title) {
//     console.log("Recv response = " + response.title);
//     document.getElementById("total-price-container").innerText = response.url;
//   } else {
//     console.error("Invalid response received");
//   }
// }

function updateShortcutText() {
  const shortcutHelp = document.getElementById("shortcut-help");
  const shortcut = navigator.platform.includes("Mac")? "Cmd+Shift+Y" : "Ctrl+Shift+Y";
  shortcutHelp.querySelector("#shortcut").innerText = shortcut;
}

function listenForMessages() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Recv. Send response = " + request.result);
    if (request.result === 'showResults') {
      const result = request.result;
      document.getElementById("item-count-container").innerHTML = `Count: ${result.itemCount}`;
      document.getElementById("total-price-container").innerHTML = `Total Price: $${result.totalPrice}`;
    }
  }
);
}

// document.addEventListener("DOMContentLoaded", function () {
//   // Get the active tab's URL and update the result container
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     const activeTab = tabs[0];
//     const url = activeTab.url;
//     document.getElementById("result-container").innerText = url;
//   });

//   // Update the shortcut text dynamically
//   const shortcutHelp = document.getElementById("shortcut-help");
//   const shortcut = navigator.platform.includes("Mac")? "Cmd+Shift+Y" : "Ctrl+Shift+Y";
//   shortcutHelp.querySelector("#shortcut").innerText = shortcut;

//   chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
//     const activeTab = tabs[0];
//     const url = activeTab.url;
//     console.log('Sending message to calculate');
//     console.log('URL: ', url);
//     const port = chrome.tabs.connect(activeTab.id, { name: 'parseHtml' });
//     port.onMessage.addListener((response) => {
//       console.log('Results: ', response);
//       itemCount = response.result.itemCount;
//       console.log('Item Count: ', itemCount);
//     });

//     const script = document.createElement('script');
//     script.src = chrome.runtime.getURL('contentScript.js');
//     script.onload = () => {
//       port.postMessage({ action: 'parseHtml' });
//     };
//     document.head.appendChild(script);
//   });
// });



// document.addEventListener("DOMContentLoaded", function () {
//   // Update the shortcut text dynamically
//   const shortcutHelp = document.getElementById("shortcut-help");
//   const shortcut = navigator.platform.includes("Mac")? "Cmd+Shift+Y" : "Ctrl+Shift+Y";
//   shortcutHelp.querySelector("#shortcut").innerText = shortcut;

//   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     console.log('Received message:', request);
//     chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
//       const activeTab = tabs[0];
//       const url = activeTab.url;
//       document.getElementById("result-container").innerText = url;
//       chrome.runtime.sendMessage({ action: 'calculate', url }, (response) => {
//         if (response.error) {
//           console.error(response.error);
//         } else {
//           const result = response.result;
//           document.getElementById("item-count-container").innerHTML = `Count: ${result.itemCount}`;
//           document.getElementById("total-price-container").innerHTML = `Total Price: $${result.totalPrice}`;

//           // // Update the shortcut text dynamically
//           // const shortcutHelp = document.getElementById("shortcut-help");
//           // const shortcut = navigator.platform.includes("Mac")? "Cmd+Shift+Y" : "Ctrl+Shift+Y";
//           // shortcutHelp.querySelector("#shortcut").innerText = `Shortcut: ${shortcut}`;
//         }
//       });
//     });
//   });
// });

// function scrapeAmazonPrices() {
//   const prices = [];
//   let totalPrice = 0;

//   // Get the HTML content
//   const html = document.documentElement.outerHTML;

//   console.log("HTML:\n", html);

//   // Parse the HTML using cheerio
//   const $ = cheerio.load(html);

//   console.log("Cheerio:\n", $);

//   $('span.a-price').each((index, element) => {
//     const priceText = $(element).find('span').first().text().replace('$', '');

//     prices.push(parseFloat(priceText));
//   });

//   console.log("Prices: ", prices);

//   totalPrice = prices.reduce((acc, current) => acc + current, 0);

//   console.log("Total Price: $", totalPrice);

//   document.getElementById("result-container").innerText = "Total Price: $", totalPrice;
// }

// document.addEventListener("DOMContentLoaded", function () {
//   scrapeAmazonPrices()
//   // Get the active tab's URL and update the result container
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     const activeTab = tabs[0];
//     const url = activeTab.url;
//     document.getElementById("result-container").innerText = url;
//   });

//   // Update the shortcut text dynamically
//   const shortcutHelp = document.getElementById("shortcut-help");
//   const shortcut = navigator.platform.includes("Mac")? "Cmd+Shift+Y" : "Ctrl+Shift+Y";
//   shortcutHelp.querySelector("#shortcut").innerText = shortcut;
// });


// document.addEventListener("DOMContentLoaded", function () {
//   // Get the active tab's URL and update the result container
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     const activeTab = tabs[0];
//     const url = activeTab.url;
//     document.getElementById("result-container").innerText = url;

//     // const items = document.getElementById("g-items");
//     const items = document.querySelectorAll(".a-price");
    
//     items.forEach((item) => {
//       console.log(item.innerHTML);
//       // const price = item.getAttribute('data-price');
//       // console.log(price);
//     });
    
//     console.log("Items: ", items);
    
//     // Check if the URL is an Amazon item list page
//     // if (url.includes("amazon.com") && (url.includes("/wishlist") || url.includes("/registry") || url.includes("/baby-reg") || url.includes("/registries"))) {
//     //   // Find all the items on the page and extract the prices
//     //   // const items = document.getElementById("g-items");
//     //   // const items = document.getElementsByClassName("a-list-item");
//     //   // const items = document.querySelectorAll("span.a-list-item");
//     //   // // const items = Array.from(document.getElementsByClassName("a-price"));
//     //   // const items = [...document.querySelectorAll('span.a-price')];
//     //   // // const items = document.querySelectorAll("a-price");
//     //   // const prices = [];

//     //   // items.forEach((item) => {
//     //   //   prices.push(item.innerText);
//     //   // });

//     //   // const prices = document.getElementsByClassName("a-price");

//     //   const items = [...document.querySelectorAll('span.a-price')];
//     //   // const items = [...document.querySelectorAll('.a-price')];
//     //   const prices = [];

//     //   items.forEach((item) => {
//     //     const priceText = item.querySelector('span.a-offscreen').textContent;
//     //     const priceValue = parseFloat(priceText.replace('$', ''));
//     //     prices.push(priceValue);
//     //   });
      

//     //   // const prices = items.map((item) => parseFloat(item.textContent.replace(/[^\d\.]/g, '')));
//     //   // const totalPrice = prices.reduce((acc, current) => acc + current, 0);

//     //   console.log("Items: ", items);
//     //   // console.log("Items Length:", items.length);
//     //   console.log("Prices: ", prices);
//       // console.log("Total Price: ", totalPrice);

//       // items.forEach((item) => {
//       //   const price = document.getElementsByClassName("a-price");
//       //   // const price = item.querySelector("span.a-price");
//       //   if (price) {
//       //     prices.push(price.innerText);
//       //   }
//       // });

//       // const itemCountContainer = document.getElementById("item-count-container");
//       // itemCountContainer.innerText = "Count: " + prices.length;

//       // const resultContainer = document.getElementById("result-container");
//       // resultContainer.innerText = "Total: $" + prices.join("\n");
//     // } else {
//     //   // If the URL is not an Amazon item list page, just show the URL
//     //   document.getElementById("result-container").innerText = url;
//     // }
//   });

//   // Update the shortcut text dynamically
//   const shortcutHelp = document.getElementById("shortcut-help");
//   const shortcut = navigator.platform.includes("Mac")? "Cmd+Shift+Y" : "Ctrl+Shift+Y";
//   shortcutHelp.querySelector("#shortcut").innerText = shortcut;
// });