const mongoose = require('mongoose');

const config = require('../config');

const User = require('../models/user');
const HttpError = require('../models/http-error');

const connect = async () => {
  const dbUser = config.MONGO_USER;
  const dbPW = config.MONGO_PASS;
  const dbIP = config.MONGO_IP;
  const dbName = config.MONGO_DBNAME;
  const dbRepl = config.MONGO_REPL;

  try {
    await mongoose.connect(
      `mongodb://${dbUser}:${dbPW}@${dbIP}/${dbName}?replicaSet=${dbRepl}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    );

    console.log(`MongoDB connected. User: '${dbUser}' @ DB: '${dbName}'`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const saveUser = async twitchUser => {
  const {
    login,
    twitch_id,
    display_name,
    profile_image_url,
    refresh_token
  } = twitchUser;

  try {
    const user = await User.findOneAndUpdate(
      {
        twitch_id
      },
      {
        login,
        twitch_id,
        display_name,
        profile_image_url,
        refresh_token
      },
      {
        new: true,
        upsert: true
      }
    );
    return user;
  } catch (err) {
    const error = new HttpError(
      'Saving new user to DB failed, please try again',
      500
    );
    throw error;
  }
};

const findUserByTwitchID = async twitch_id => {
  try {
    const user = await User.findOne({ twitch_id });

    if (!user) {
      const error = new HttpError(
        'Did not find a user with that twitch ID, please try again',
        404
      );
      throw error;
    }

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  connect,
  saveUser,
  findUserByTwitchID
};
