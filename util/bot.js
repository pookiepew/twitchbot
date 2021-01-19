const tmi = require('./client');

const HttpError = require('../models/http-error');

const mongoDB = require('../util/mongoDB');

const twitchAPI = require('./twitchAPI');

const connect = async (login, access_token, channel) => {
  try {
    const client = tmi.createClient(login, access_token, channel);

    await client.connect();

    const user = await mongoDB.setConnection(login, true);

    client.on(
      'message',
      async (channel, tags, message, self) =>
        await messageHandler(channel, tags, message, self, client)
    );

    console.log(login, ' ', access_token);

    return user;
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Connecting with TMI failed, please try again',
      500
    );
    throw error;
  }
};

const disconnect = async access_token => {
  try {
    const client = tmi.getClient(access_token);
    const {
      opts: {
        identity: { username }
      }
    } = client;
    await client.disconnect();
    tmi.deleteClient(access_token);
    await mongoDB.setConnection(username, false);
    return (message = `${username} disconnected from twitch`);
  } catch (err) {
    const error = new HttpError('Disconnecting from twitch failed!', 500);
    throw error;
  }
};

const messageHandler = async (channel, tags, message, self, client) => {
  if (self || tags['message-type'] === 'whisper') return;

  if (message === '!dance') {
    await client.say(
      channel,
      'blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance blobDance'
    );
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
  disconnect,
  connectIfDisconnected
};
