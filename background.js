import { calculate } from './calculate';

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'calculate') {
    const url = request.url;
    try {
      const result = await calculate(url);
      sendResponse({ result });
    } catch (error) {
      sendResponse({ error: 'Failed to calculate price' });
    }
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    chrome.tabs.sendMessage(tabId, { action: 'calculate', url: tab.url }, (response) => {
      if (response.error) {
        console.error(response.error);
      } else {
        const result = response.result;
        document.getElementById("item-count-container").innerHTML = `Count: ${result.itemCount}`;
        document.getElementById("total-price-container").innerHTML = `Total Price: $${result.totalPrice}`;
      }
    });
  }
});