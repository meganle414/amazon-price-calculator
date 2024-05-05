function extractDataPrice() {
    const elements = document.querySelectorAll("[data-price]");
    let result = "";
    for (const element of elements) {
      result += element.innerHTML + "\n";
    }
    return result;
  }
  
  chrome.runtime.sendMessage({ action: "extractDataPrice", data: extractDataPrice() });