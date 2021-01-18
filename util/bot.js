const tmi = require('tmi.js');

const HttpError = require('../models/http-error');

const mongoDB = require('../util/mongoDB');

const twitchAPI = require('./twitchAPI');

const connect = async (login, access_token, channel) => {
  /** @type {import('tmi.js').Client} */
  let client;

  if (client && client.opts.identity.username === login) {
    const error = new HttpError('Already connected!', 400);
    throw error;
  }

  try {
    client = new tmi.Client({
      connection: {
        secure: true,
        reconnect: true
      },
      identity: {
        username: login,
        password: access_token
      },
      channels: [channel],
      options: { debug: true }
    });

    await client.connect();

    client.on('connected', (address, port) => {
      console.log('Connected to twitch chat!', address, port);
    });

    const user = await mongoDB.setConnection(login, true);

    client.on(
      'message',
      async (channel, tags, message, self) =>
        await messageHandler(channel, tags, message, self, client)
    );

    return user;
  } catch (err) {
    const error = new HttpError(
      'Connecting with TMI failed, please try again',
      500
    );
    throw error;
  }
};

const messageHandler = async (channel, tags, message, self, client) => {
  if (self || tags['message-type'] === 'whisper') return;

  if (message === '!dance') {
    await client.say(
      channel,
      'blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance '
    );
  }

  if (message === '!pooksie') {
    await client.say(channel, 'POOKSIE');
  }
};

const connectIfDisconnected = async () => {
  try {
    const users = await mongoDB.getAllUsers();

    for (let i = 0; i < users.length; i++) {
      if (users[i].shouldBeConnected) {
        const access_token = await twitchAPI.refreshAccessToken(
          users[i].refresh_token
        );
        await connect(users[i].login, access_token, users[i].login);
      }
    }
  } catch (err) {
    const error = new HttpError('Connecting bots failed', 500);
    throw error;
  }
};

module.exports = {
  connect,
  connectIfDisconnected
};
