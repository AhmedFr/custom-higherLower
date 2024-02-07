const { GiphyFetch } = require("@giphy/js-fetch-api");

const gf = new GiphyFetch(process.env.GIPHY_API_KEY);

async function getGiphyUrl(query) {
  const { data: gifs } = await gf.search(query, {
    sort: "relevant",
    limit: 1,
  });
  return gifs[0].images.original.url;
}

module.exports = {
  getGiphyUrl,
};
