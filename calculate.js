const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
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

// const scrapeCamelCamelCamel = async (urls) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   const historicalPrices = [];
//   for (const url of urls) {
//     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
//     await page.goto(`https://camelcamelcamel.com/`);
//     // Print the HTML content of the page
//     console.log(await page.content());
//     await page.type('#sq', url);
//     await page.click('button[value="Search"]');
//     await page.waitForSelector('.grid-x');

//     const html = await page.content();
//     const $ = cheerio.load(html);

//     const amazonRow = $('tr.pt.amazon').first();
//     const lowestEver = amazonRow.find('td:nth-child(2)').text().trim();
    
//     if (lowestEver === '') {
//       lowestEver = 0;
//     }

//     historicalPrices.push(lowestEver);
//   }

//   await browser.close();

//   return historicalPrices;
// };

app.post('/calculate', async (req, res) => {
  try {
    const url = req.body.url;
    const { prices, imageUrls, titles, urls } = await scrapeAmazon(url);
    // const historicalPrices = await scrapeCamelCamelCamel(urls);

    const result = {
      itemCount: prices.length,
      prices,
      totalPrice: prices.reduce((acc, current) => acc + current, 0).toFixed(2),
      imageUrls,
      urls,
      titles,
      // historicalPrices,
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

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});