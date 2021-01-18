# Twitchbot backend for https://miabelle.tv

###### Routes

- http://localhost:3000/authenticate  
  ?code=<CODE>

- http://localhost:3000/refresh-token  
  ?twitch_id=<TWITCH-ID>  
  &refresh_token=<TOKEN>

- http://localhost:3000/bot/initialize  
  ?login=<LOGIN>  
  &access_token=<TOKEN>  
  &channel=<CHANNEL> (optional)
