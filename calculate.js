const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const scrapeAmazon = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

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

  await browser.close();

  return { prices, imageUrls, titles, urls };
};

app.get('/', (req, res) => {
  const url = req.body.url;
  res.status(500).json({ error: `url is ${url}` });
});

app.post('/calculate', async (req, res) => {
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

    res.status(300).json({ error: `CALCULATE url is ${url}` });
    // console.log('Sending response:', result);
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