const twitchAPI = require('../util/twitchAPI');

const mongoDB = require('../util/mongoDB');

const HttpError = require('../models/http-error');

const authenticateWithTwitch = async (req, res, next) => {
  const { code } = req.query;

  if (!code) {
    const error = new HttpError('No code supplied, please supply a code.', 401);
    return next(error);
  }

  try {
    const { access_token, refresh_token } = await twitchAPI.getAccessToken(
      code
    );

    const twitch_id = await twitchAPI.validateAccessToken(access_token);

    const {
      login,
      display_name,
      profile_image_url
    } = await twitchAPI.getUserById(access_token, twitch_id);

    const user = await mongoDB.saveUser({
      login,
      twitch_id,
      display_name,
      profile_image_url,
      refresh_token
    });

    return res.json({
      ...user._doc,
      access_token
    });
  } catch (error) {
    return next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  const { twitch_id, refresh_token } = req.query;

  if (!twitch_id || !refresh_token) {
    const error = new HttpError(
      'Twitch ID or Refresh token was not found, please supply both as a query',
      401
    );
    return next(error);
  }

  try {
    const user = await mongoDB.findUserByTwitchID(twitch_id);

    if (refresh_token !== user.refresh_token) {
      const error = new HttpError(
        'Refresh token does not match our records, please try again',
        401
      );
      throw error;
    }

    const access_token = await twitchAPI.refreshAccessToken(user.refresh_token);

    return res.json({
      ...user._doc,
      access_token
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { authenticateWithTwitch, refreshAccessToken };
