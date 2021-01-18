const axios = require('axios');

const HttpError = require('../models/http-error');

const config = require('./config');

const getAccessToken = async code => {
  try {
    const qs = new URLSearchParams({
      client_id: config.TWITCH_CLIENT_ID,
      client_secret: config.TWITCH_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: config.TWITCH_CLIENT_REDIR_URI
    });
    const {
      data: { access_token, refresh_token }
    } = await axios.post(`https://id.twitch.tv/oauth2/token?${qs}`);
    return {
      access_token,
      refresh_token
    };

    // Twitch Oauth Returns:
    // {
    //   "access_token": "<user access token>",
    //   "refresh_token": "<refresh token>",
    //   "expires_in": <number of seconds until the token expires>,
    //   "scope": ["<your previously listed scope(s)>"],
    //   "token_type": "bearer"
    // }
  } catch (err) {
    console.error(err.response.data);
    const error = new HttpError(
      err.response.data.message,
      err.response.data.status
    );
    throw error;
  }
};

const validateAccessToken = async access_token => {
  try {
    const {
      data: { user_id }
    } = await axios.get('https://id.twitch.tv/oauth2/validate', {
      headers: {
        Authorization: `OAuth ${access_token}`
      }
    });
    return user_id;
  } catch (err) {
    throw err;
  }

  // Example response from Twitch:
  // {
  //   "client_id": "wbmytr93xzw8zbg0p1izqyzzc5mbiz",
  //   "login": "twitchdev",
  //   "scopes": [
  //     "channel:read:subscriptions"
  //   ],
  //   "user_id": "141981764",
  //   "expires_in": 5520838
  // }
};

const refreshAccessToken = async refresh_token => {
  const qs = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token,
    client_id: config.TWITCH_CLIENT_ID,
    client_secret: config.TWITCH_CLIENT_SECRET
  });

  try {
    const {
      data: { access_token }
    } = await axios.post(`https://id.twitch.tv/oauth2/token?${qs}`);
    return access_token;
  } catch (err) {
    const error = new HttpError(
      err.response.data.message,
      err.response.data.status
    );
    throw error;
  }

  // Example response from Twitch:
  // {
  //   "access_token": "VALUE",
  //   "expires_in": 14060,
  //   "refresh_token": "VALUE",
  //   "scope": [ 'chat:edit', 'chat:read' ],
  //   "token_type": 'bearer'
  // }
};

const getUserById = async (access_token, twitch_id) => {
  if (!access_token || !twitch_id) {
    const error = new HttpError(
      'Token or Twitch ID missing, please make sure to pass them through',
      401
    );
    throw error;
  }

  try {
    const {
      data: { data }
    } = await axios.get(`https://api.twitch.tv/helix/users?id=${twitch_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Client-ID': config.TWITCH_CLIENT_ID
      }
    });

    if (!data[0]) {
      return {
        message: `Didn't find user with id ${twitch_id} - please try again`,
        status: 404
      };
    }

    return data[0];

    // Example response from Twitch:
    // {
    //   "data": [{
    //     "id": "44322889",
    //     "login": "dallas",
    //     "display_name": "dallas",
    //     "type": "staff",
    //     "broadcaster_type": "",
    //     "description": "Just a gamer playing games and chatting. :)",
    //     "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/dallas-profile_image-1a2c906ee2c35f12-300x300.png",
    //     "offline_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/dallas-channel_offline_image-1a2c906ee2c35f12-1920x1080.png",
    //     "view_count": 191836881,
    //     "email": "login@provider.com" --- user:read:email scope required ---
    //   }]
    // }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAccessToken,
  validateAccessToken,
  refreshAccessToken,
  getUserById
};
