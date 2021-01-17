const twitchAPI = require('../util/twitchAPI');

const HttpError = require('../models/http-error');

const getUserDetails = async (req, res, next) => {
  const { access_token, login } = req.query;

  let response;

  if (!access_token) {
    const error = new HttpError(
      'No access_token supplied, please supply an access_token.',
      401
    );
    return next(error);
  }

  if (!login) {
    const error = new HttpError(
      'No twitch login username supplied, please supply a login.',
      401
    );
    return next(error);
  }
  try {
    response = await twitchAPI.getUserByLogin(access_token, login);
    if (response.message) {
      const error = new HttpError(response.message, response.status);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      err.response.data.message,
      err.response.data.status
    );
    return next(error);
  }

  // SAVE USER TO DB ??
  console.log(response);

  return res.json({
    user: { ...response }
  });
};

module.exports = { getUserDetails };
