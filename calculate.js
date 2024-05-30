const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const scrapeAmazon = async (url) => {
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
    executablePath: '/app/.apt/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
    chrome_revision: '125.0.6422.112', // specify the Chrome version
  });
  try {
    const page = await browser.newPage();
  await page.goto(url);

  await autoScroll(page);

  const html = await page.content();
  const $ = cheerio.load(html);

  const prices = [];
  $('span.a-price').each((index, element) => {
    const priceText = $(element).find('span').first().text().replace('$', '');
    prices.push(parseFloat(priceText));
  });

  const imageUrls = [];
  $('#g-items li img').each((index, element) => {
    const imageUrl = $(element).attr('src');
    imageUrls.push(imageUrl);
  });
  imageUrls.pop();

  const titles = [];
  const urls = [];
  $('#g-items li a').each((index, element) => {
    const title = $(element).attr('title');
    const url = $(element).attr('href');
    if (title && !titles.includes(title)) {
      titles.push(title);
    }
    if (url.includes("/dp/") && !urls.includes(url) && !url.includes("_im")) {
      urls.push("https://www.amazon.com/" + url);
    }
  });
} catch (error) {
  console.error(`Error scraping ${url}:`, error);
  await browser.close();
  return { error: `Error scraping ${url}: ${error.message}`, prices: [], imageUrls: [], titles: [], urls: [] };
} finally {
  await browser.close();
}

  await browser.close();

  return { prices, imageUrls, titles, urls };
};

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Ready to calculate' });
// });

app.post('/calculate', async (req, res) => {
  console.log('Received request: ', req.body);
  try {
    const url = req.body.url;
    const { prices, imageUrls, titles, urls } = await scrapeAmazon(url);

    const result = {
      itemCount: prices.length,
      prices,
      totalPrice: prices.reduce((acc, current) => acc + current, 0).toFixed(2),
      imageUrls,
      urls,
      titles,
    };

    console.log('Sending response:', result);
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.json(result);
    console.log('Response sent');

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to calculate price' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight - window.innerHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}