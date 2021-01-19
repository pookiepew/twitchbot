const tmi = require('tmi.js');

const clients = {};

const createClient = (login, access_token, channel) => {
  /** @type {import('tmi.js').Client} */
  const client = new tmi.Client({
    connection: {
      secure: true,
      reconnect: true,
    },
    identity: {
      username: login,
      password: access_token,
    },
    channels: [channel],
    options: { debug: true },
  });

  clients[access_token] = client;

  return client;
};

const getClient = (access_token) => clients[access_token];

const deleteClient = (access_token) => {
  delete clients[access_token];
};

module.exports = {
  createClient,
  getClient,
  deleteClient,
};
