# Twitchbot backend service for https://miabelle.tv

### TODO

- [ ] Check for security issues
- [ ] Fix security issues found ⬆
- [x] 🎉 Extract 'client' to be a global thing 🎉
- [x] 🎉 Create a disconnect route 🎉
- [ ] Create an unauthorize route (will unauthorize this service from twitch)

- [ ] 📢 Restrict service to a few predefined known names to prevent public access to client & tmi

## The two use cases for this service

### Viewer

- Grants this service access by logging in with twitch
- Gets access token from twitch through this service
- Uses access token to connect from browser to twitch using TMI.js
- When using services in the frontend, events will happen in chat

### Streamer

- Grants this service access by logging in with twitch
- Gets access token from twitch through this service
- Uses access token to connect from this service to twitch using TMI.js
- This service holds the connection and refreshes tokens if needed
- Streamer can close their browser without disconnecting the "bot" from chat

### Routes

```js

GET http://localhost:3000/authenticate
    ?code=<CODE>

Example response:

{
  "shouldBeConnected": false,
  "_id": "600482329cc9a36b5b14bd4c",
  "twitch_id": "444832527",
  "createdAt": "2021-01-17T18:30:12.079Z",
  "display_name": "pooksibot",
  "login": "pooksibot",
  "profile_image_url": "https://static-cdn.jtvnw.net/user-default-pictures-uv/de130ab0-def7-11e9-b668-784f43822e80-profile_image-300x300.png",
  "refresh_token": <TOKEN>,
  "updatedAt": "2021-01-17T18:30:12.079Z",
  "access_token": <TOKEN>
}

```

```js

GET http://localhost:3000/bot/initialize
    ?login=<LOGIN>
    &access_token=<TOKEN>
    &channel=<CHANNEL> (optional)

// If channel is not provided -> channel = login

Example response:

{
  "_id": "60048bc41b4590302018c8cb",
  "twitch_id": "444832527",
  "createdAt": "2021-01-17T18:30:12.079Z",
  "display_name": "pooksibot",
  "login": "pooksibot",
  "profile_image_url": "https://static-cdn.jtvnw.net/user-default-pictures-uv/de130ab0-def7-11e9-b668-784f43822e80-profile_image-300x300.png",
  "refresh_token": <TOKEN>,
  "updatedAt": "2021-01-17T20:38:57.722Z"
}

```

```js

GET http://localhost:3000/bot/disconnect
    ?access_token=<TOKEN>


Example response:

{
  "message": "<botname> disconnected from twitch"
}

```

```js

GET http://localhost:3000/refresh-token
    ?twitch_id=<TWITCH_ID>
    &refresh_token=<TOKEN>

Example response:

{
  "_id": "600483399cc9a36b5b14c4ae",
  "twitch_id": "444832527",
  "createdAt": "2021-01-17T18:34:35.604Z",
  "display_name": "pooksibot",
  "login": "pooksibot",
  "profile_image_url": "https://static-cdn.jtvnw.net/user-default-pictures-uv/de130ab0-def7-11e9-b668-784f43822e80-profile_image-300x300.png",
  "refresh_token": <TOKEN>,
  "updatedAt": "2021-01-18T18:40:40.835Z",
  "access_token": <TOKEN>
}

```
