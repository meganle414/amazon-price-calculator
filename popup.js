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
      const itemsContainer = document.getElementById("items-container");

      itemsContainer.innerHTML = ''; // clear the container

      result.imageUrls.forEach((imageUrl, index) => {
        const title = document.createElement('p');
        title.innerHTML = result.titles[index] + "<br>";
        title.style.textAlign = 'center';
        itemsContainer.append(title);
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = result.titles[index]; // set the alt text to the corresponding title
        img.style.display = 'block';
        img.style.margin = '0 auto';
        itemsContainer.appendChild(img);
        // itemsContainer.append("<br>");
        const price = document.createElement('p');
        price.innerHTML = "$" + result.prices[index] + "<br>";
        price.style.textAlign = 'right';
        itemsContainer.append(price);
      });
      
      if (result.imageUrls.length !== 0) {
        document.getElementById("final-item-count-container").innerHTML = `<br><strong>Count: </strong>${result.itemCount}`;
        document.getElementById("final-total-price-container").innerHTML = `<strong>Total Price: </strong>$${result.totalPrice}`;
      } else {
        document.getElementById("final-item-count-container").innerHTML = `<br><strong>Please make sure the list is being shared!</strong>`;
      }
    }
  }
);
}