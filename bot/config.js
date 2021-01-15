require('dotenv').config();

/**
 * @typedef EnviromentConfiguration
 * @prop {string} TWITCH_CLIENT_ID Client ID for the Twitch app.
 * @prop {string} TWITCH_CLIENT_SECRET Client OAuth Secret for the Twitch app.
 * @prop {string} TWITCH_CLIENT_REDIR_URI Client redirect.
 * @prop {string} TWITCH_BASE_OAUTH_URI Twitch base OAuth URI. Accept GET and POST.
 * @prop {string} BOT_REFRESH_TOKEN
 *
 */

/**
 * @type {EnviromentConfiguration}
 */
const config = {
  ...process.env
};

module.exports = config;
