const NodeGeocoder = require("node-geocoder");

const { GEOCODER_PROVIDER, GEOCODER_API_KEY } = process.env;

const options = {
  provider: GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
