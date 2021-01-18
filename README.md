# Twitchbot backend for https://miabelle.tv

### Routes

```
GET http://localhost:3000/authenticate
    ?code=<CODE>
```

```
GET http://localhost:3000/refresh-token
    ?twitch_id=<TWITCH_ID>
    &refresh_token=<TOKEN>
```

```
GET http://localhost:3000/bot/initialize
    ?login=<LOGIN>
    &access_token=<TOKEN>
    &channel=<CHANNEL>(optional)
```
