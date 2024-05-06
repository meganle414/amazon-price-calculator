// const messageListener = (request, sender, sendResponse) => {
//   if (request.action === "updatePrices") {
//     const itemCountContainer = document.getElementById("item-count-container");
//     const resultContainer = document.getElementById("result-container");

//     itemCountContainer.textContent = `Count: ${request.prices.length}`;
//     resultContainer.textContent = `Total Price: $${request.totalPrice.toFixed(2)}`;
//   }
// };

// // Check if the listener is already defined before adding a new listener
// if (!chrome.runtime.onMessage.hasListener(messageListener)) {
//   chrome.runtime.onMessage.addListener(messageListener);
// }
// if (request.action === "updatePrices") {
//   const itemCountContainer = document.getElementById("item-count-container");
//   const resultContainer = document.getElementById("result-container");

//   itemCountContainer.textContent = `Count: ${request.prices.length}`;
//   resultContainer.textContent = `Total Price: $${request.totalPrice.toFixed(2)}`;
// }

// const cheerio = require('cheerio')

document.addEventListener("DOMContentLoaded", function () {
  //...

  const calculateButton = document.getElementById('calculate-button');
  calculateButton.addEventListener('click', async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const activeTab = tabs[0];
      const url = activeTab.url;
      chrome.runtime.sendMessage({ action: 'calculate', url }, (response) => {
        if (response.error) {
          console.error(response.error);
        } else {
          const result = response.result;
          document.getElementById("item-count-container").innerHTML = `Count: ${result.itemCount}`;
          document.getElementById("total-price-container").innerHTML = `Total Price: $${result.totalPrice}`;
        }
      });
    });

    // Update the shortcut text dynamically
    const shortcutHelp = document.getElementById("shortcut-help");
    const shortcut = navigator.platform.includes("Mac")? "Cmd+Shift+Y" : "Ctrl+Shift+Y";
    shortcutHelp.querySelector("#shortcut").innerText = shortcut;
  });
});

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