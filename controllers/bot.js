const bot = require('../util/bot');

const HttpError = require('../models/http-error');

const initializeBot = async (req, res, next) => {
  const { login, access_token } = req.query;
  let { channel } = req.query;

  if (!login || !access_token) {
    const error = new HttpError(
      'Login and access token is required, please try again',
      500
    );
    return next(error);
  }

  if (!channel) channel = login;

  try {
    const user = await bot.connect(login, access_token, channel);

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

const disconnectBot = async (req, res, next) => {
  const { login } = req.query;
};

module.exports = { initializeBot, disconnectBot };
