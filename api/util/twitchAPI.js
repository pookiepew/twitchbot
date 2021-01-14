const axios = require('axios');

const config = require('../config');

const twithOauth = axios.create({
  baseURL: config.TWITCH_OAUTH_URI
});

const getAccessToken = async () => {};

const getUser = async () => {};

module.exports = {
  getAccessToken,
  getUser
};
