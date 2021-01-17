const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    login: { type: String, required: true },
    twitch_id: { type: String, required: true },
    display_name: String,
    profile_image_url: String,
    refresh_token: { type: String, required: true },
    shouldBeConnected: { type: Boolean, default: false }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('User', userSchema);
