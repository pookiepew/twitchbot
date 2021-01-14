const twitchAPI = require('../util/twitchAPI');

const HttpError = require('../models/http-error');

const config = require('../config');

const exchangeCodeForTokens = async (req, res, next) => {
  const { code } = req.query;

  if (!code) {
    const error = new HttpError('No code supplied, please supply a code.', 401);
    return next(error);
  }
  try {
    const { access_token, refresh_token } = await twitchAPI.getAccessToken(
      code
    );
  } catch (error) {}

  // const qs = new URLSearchParams({
  //   client_id: config.TWITCH_CLIENT_ID,
  //   client_secret: config.TWITCH_CLIENT_SECRET,
  //   code,
  //   grant_type: 'authorization_code',
  //   redirect_uri: config.TWITCH_CLIENT_REDIR_URI
  // });

  // try {
  //   const { data } = axios.post(config.TWITCH_BASE_OAUTH_URI + '/token', qs);
  //   console.log(data);
  // } catch (error) {}
  // res.status(200).json({
  //   code
  // });

  res.status(200).json({
    code
  });
};

module.exports = { exchangeCodeForTokens };
