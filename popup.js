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
    if (url.includes("amazon.com") && (url.includes("/wishlist") || url.includes("/registry") || url.includes("/baby-reg") || url.includes("/registries"))) {
      document.getElementById("result-container").innerText = url;
      chrome.runtime.sendMessage({ action: 'getResults', url })
      document.getElementById("result-container").innerText = url;
    } else {
      document.getElementById("result-container").innerText = url + " is not an Amazon List";
    }
  });
}

function updateShortcutText() {
  const shortcutHelp = document.getElementById("shortcut-help");
  const shortcut = navigator.platform.includes("Mac")? "Cmd+Shift+Y" : "Ctrl+Shift+Y";
  shortcutHelp.querySelector("#shortcut").innerText = shortcut;
}

function listenForMessages() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showResults' && request.results) {
      const result = request.results;
      document.getElementById("item-count-container").innerHTML = `<br><strong>Count: </strong>${result.itemCount}`;
      document.getElementById("total-price-container").innerHTML = `<strong>Total Price: </strong>$${result.totalPrice}`;
    }
  }
);
}