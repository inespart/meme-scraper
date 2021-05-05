const fs = require('fs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';
const urlList = [];

const getMemeHtml = async () => {
  // get html text from websiteUrl
  const response = await fetch(websiteUrl);
  // using await to ensure that the promise resolves
  const body = await response.text();

  // parse the html text and extract url
  const $ = cheerio.load(body);

  // using CSS selector
  $('img').each((i, url) => {
    // console.log(url.attribs.src);
    if (i < 10) {
      urlList.push(url.attribs.src);
    }
  });

  console.log(urlList);

  console.log('urlList', urlList);
  for (const urlElement of urlList) {
    console.log('hello', urlElement);
    async function download() {
      const imageResponse = await fetch(urlElement);
      // console.log('hello', urlElement);
      const buffer = await imageResponse.buffer();
      fs.writeFile(
        `./memes/meme${urlList.indexOf(urlElement)}.jpg`,
        buffer,
        () => console.log('Download Finished'),
      );
    }
    download();
  }
};

getMemeHtml();
