const tmi = require('tmi.js');

const HttpError = require('../models/http-error');

const clients = {};

const createClient = (login, access_token, channel) => {
  if (
    clients[access_token] &&
    clients[access_token].opts.identity.username === login
  ) {
    const error = new HttpError('Already connected!', 400);
    throw error;
  }

  /** @type {import('tmi.js').Client} */
  const client = new tmi.Client({
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

  clients[access_token] = client;

  return client;
};

const getClient = access_token => {
  const client = clients[access_token];

  if (!client) {
    const error = new HttpError('Unable to find client, please try again', 404);
    throw error;
  }

  return client;
};

const deleteClient = access_token => {
  delete clients[access_token];
};

module.exports = {
  createClient,
  getClient,
  deleteClient
};
