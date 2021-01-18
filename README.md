# Twitchbot backend service for https://miabelle.tv

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

GET http://localhost:3000/refresh-token
    ?twitch_id=<TWITCH_ID>
    &refresh_token=<TOKEN>

Example response:

{
  "shouldBeConnected": true,
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

```js

GET http://localhost:3000/bot/initialize
    ?login=<LOGIN>
    &access_token=<TOKEN>
    &channel=<CHANNEL> (optional)

Example response:

{
  "shouldBeConnected": true,
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
