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

    // Example response to client:
    // {
    //   "connected": false,
    //   "_id": "600482329cc9a36b5b14bd4c",
    //   "twitch_id": "115415445",
    //   "createdAt": "2021-01-17T18:30:12.079Z",
    //   "display_name": "pookiepew",
    //   "login": "pookiepew",
    //   "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/8feac4b0-22a9-49cd-a8d5-d6075d8edc20-profile_image-300x300.png",
    //   "refresh_token": "TOKEN",
    //   "updatedAt": "2021-01-17T18:30:12.079Z",
    //   "access_token": "TOKEN"
    // }
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
