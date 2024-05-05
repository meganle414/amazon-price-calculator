// scraper.js
// Find all the items on the page and extract the prices
const items = document.querySelectorAll("span.a-list-item");
const prices = [];

items.forEach((item) => {
  const price = item.querySelector("span.a-price");
  if (price) {
    prices.push(price.innerText);
  }
});

console.log(prices)

// // Send the extracted prices back to the popup.js script
// chrome.runtime.sendMessage({ prices: prices });

// Send the extracted prices back to the popup.js script
chrome.runtime.sendMessage({ action: "extractPrices", prices: prices });