require('dotenv').config();

/**
 * @typedef EnviromentConfiguration
 * @prop {string} HOST The host address
 * @prop {string} PORT The port to listen on
 * @prop {string} TWITCH_CLIENT_ID Client ID for the Twitch app.
 * @prop {string} TWITCH_CLIENT_SECRET Client OAuth Secret for the Twitch app.
 * @prop {string} TWITCH_CLIENT_REDIR_URI Client redirect. http://localhost:3000/authenticate.
 * @prop {string} TWITCH_OAUTH_URI Twitch OAuth URI. https://id.twitch.tv/oauth2.
 * @prop {string} MONGO_USER Mongo DB username.
 * @prop {string} MONGO_PASS Mongo db password
 * @prop {string} MONGO_DBNAME Name of mongo database
 * @prop {string} MONGO_IP IP to mongodb host
 * @prop {string} MONGO_REPL Name of replicaset if any
 *
 */

/**
 * @type {EnviromentConfiguration}
 */
const config = {
  ...process.env,
};

module.exports = config;
