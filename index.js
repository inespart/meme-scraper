// import libraries and declare variables
const fs = require('node:fs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const websiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';
const urlList = [];

const getMemeHtml = async () => {
  // get html text from websiteUrl and wait for fetch, then continue
  const response = await fetch(websiteUrl);
  // using await to ensure that the promise resolves
  const body = await response.text();

  // parse the html text and extract url
  const $ = cheerio.load(body);

  // using CSS selector
  $('img').each((i, url) => {
    if (i < 10) {
      urlList.push(url.attribs.src);
    }
  });

  // console.log(urlList);

  // create loop that counts to 10
  for (const urlElement of urlList) {
    async function download() {
      // fetch image data from the list of 10 URLs
      const imageResponse = await fetch(urlElement);
      const buffer = await imageResponse.buffer();
      // create files with .jpg extensions and store them in the memes folder
      fs.writeFile(
        `./memes/meme${urlList.indexOf(urlElement)}.jpg`,
        buffer,
        () =>
          // control message after each iteration
          console.log(
            `Download of meme${urlList.indexOf(
              urlElement,
            )}.jpg was successful.`,
          ),
      );
    }
    download();
  }
};

getMemeHtml();
