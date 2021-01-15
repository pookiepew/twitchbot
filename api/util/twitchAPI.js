const axios = require('axios');

const HttpError = require('../models/http-error');

const config = require('../config');

const getAccessToken = async (code) => {
  try {
    const qs = new URLSearchParams({
      client_id: config.TWITCH_CLIENT_ID,
      client_secret: config.TWITCH_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: config.TWITCH_CLIENT_REDIR_URI,
    });
    const {
      data: { access_token, refresh_token },
    } = await axios.post(`https://id.twitch.tv/oauth2/token?${qs}`);
    return {
      access_token,
      refresh_token,
    };
  } catch (err) {
    console.error(err.response.data);
    const error = new HttpError(
      err.response.data.message,
      err.response.data.status
    );
    throw error;
  }
};

const refreshAccessToken = async (token) => {};

const getUserById = async (token, twitchId) => {};

module.exports = {
  getAccessToken,
  refreshAccessToken,
  getUserById,
};
