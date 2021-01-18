const bot = require('../util/bot');

const HttpError = require('../models/http-error');

const initializeBot = async (req, res, next) => {
  const { login, access_token, channel } = req.query;

  if (!login || !access_token || !channel) {
    const error = new HttpError(
      'Login, access token and channel required, please try again',
      500
    );
    return next(error);
  }

  try {
    const user = await bot.connect(login, access_token, channel);

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = { initializeBot };
