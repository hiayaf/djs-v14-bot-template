## A template bot with database support 
 v14 discord.js 
 JavaScript 

config.json
```json
{
    "token": "XXX-XXX-XXX-XXX-XXX-XXX-XXX-XXX-XXX-XXX-XXX-XXX",
    "guildId": "",
    "channels":
    {
        "logs": "123456789012345678",
        "join": "123456789012345678",
        "leave": "123456789012345678" 
    },
    "roles": {
        "admin": "123456789012345678",
        "moderator": "123456789012345678"

    },
    "webhooks": {
        "id": "123456789012345678",
        "token": "123456789012345678"
    },
    "database": {
        "host": "localhost",
        "user": "root",
        "password": "",
        "name": "bot",
        "pool": 300000,
        "ssl": false
    },
    "auto_role": {
       "account_time": 250,
       "role": "1006594844434628648"
    },
    "prefix": "#"
}
```
