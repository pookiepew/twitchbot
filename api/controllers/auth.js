const axios = require('axios');

const config = require('../config');

const twitchCodeURI = `${config.TWITCH_BASE_OAUTH_URI}/authorize`;

const getCodeFromTwitch = async (req, res, next) => {
  const qs = new URLSearchParams({
    client_id: config.TWITCH_CLIENT_ID,
    redirect_uri: config.TWITCH_CLIENT_REDIR_URI,
    response_type: 'code',
    scope: 'chat:read',
  });
  let resp;
  try {
    resp = await axios.get(twitchCodeURI, qs);
    console.log(resp);
  } catch (error) {
    next(error);
  }
  res.status(200).json({
    resp,
  });
};

const exchangeCodeForTokens = async (req, res, next) => {
  const { code /* state */ } = req.query;

  const qs = new URLSearchParams({
    client_id: config.TWITCH_CLIENT_ID,
    client_secret: config.TWITCH_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: config.TWITCH_CLIENT_REDIR_URI,
  });

  try {
    const { data } = axios.post(config.TWITCH_BASE_OAUTH_URI + '/token', qs);
    console.log(data);
  } catch (error) {}
  res.status(200).json({
    code,
  });
};

exports.exchangeCodeForTokens = exchangeCodeForTokens;
exports.getCodeFromTwitch = getCodeFromTwitch;
