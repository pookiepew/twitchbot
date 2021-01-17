const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    login: String,
    twitch_id: { type: String, unique: true },
    display_name: String,
    profile_image_url: String,
    refresh_token: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('User', userSchema);
