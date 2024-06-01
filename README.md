# wotrcg-discord-bot

A Discord bot for fetching card data for War of the Ring: The Card Game.

To use it, add it to your Discord server using [this link.](https://discord.com/oauth2/authorize?client_id=1243265144822300793&permissions=2048&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.com%2Foauth2%2Fauthorize&scope=messages.read+bot)

It works by listening for listening for messages that contain cards names surrounded by double brackets e.g. [[Frodo Baggins]], [[bilbo]], or [[Minas Tirith]]. The bot will then post in the channel with an image of those cards!

If the card name begins with an '!', the bot will additionally print out extra data about the card e.g. [[!aragorn]] or [[!Grond, Hammer of the Underworld]].

Image assets and War of the Ring: The Card Game are property of ARES Games.

## Set Up

For local development, you will need to start up an instance of both the bot and the API. Naviagte to both directories and run:

```bash
npm run dev
```

### Data

The app is set up to card data from MongoDB Cloud Atlas, not your local machine, but you can spin up your own free cloud MongoDB instance and use the card data in `./api/src/data` to seed it.

Inside ./api, make a copy of `.env.example` and name it `.env`

Next, you will need to enter your own `MONGODB_URI` and `DB_NAME`

### Discord API

Similarly, you will need to make a copy of the `.env.example` inside of `./bot` and name it `.env`. There you need to enter the `DISCORD_TOKEN` unqiue to your discord bot, as well as enter the route where you're hosting the API e.g. http://localhost:6060
