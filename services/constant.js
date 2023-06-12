const api_url = process.env.NODE_ENV == "development" ? "http://127.0.0.1:5001" : "https://api.privy.sg";
module.exports = {
  api_url,
};
