function scrapeAmazonPrices() {
    // Same code as before, but without the browser launch and page navigation
    const prices = [];
    let totalPrice = 0;
  
    // Get the HTML content
    const html = document.documentElement.outerHTML;
  
    // Parse the HTML using cheerio (similar to BeautifulSoup)
    const $ = cheerio.load(html);
  
    $('span.a-price').each((index, element) => {
      const priceText = $(element).find('span').first().text().replace('$', '');
      prices.push(parseFloat(priceText));
    });
  
    totalPrice = prices.reduce((acc, current) => acc + current, 0);
  
    // Send the results to the popup script
    chrome.runtime.sendMessage({ action: "updatePrices", prices, totalPrice });
  }
  
  // Run the scraper when the page is loaded
  document.addEventListener("DOMContentLoaded", scrapeAmazonPrices);