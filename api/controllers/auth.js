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
    return res.json({
      access_token,
      refresh_token,
    });
  } catch (error) {
    return next(error);
  }

  // try {
  //
  //   console.log(data);
  // } catch (error) {}
  // res.status(200).json({
  //   code
  // });

  // res.status(200).json({
  //   code,
  // });
};

module.exports = { exchangeCodeForTokens };
