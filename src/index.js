import '@dotenvx/dotenvx';
import { Client, Events, GatewayIntentBits } from 'discord.js';

const { DISCORD_TOKEN } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN)
	.catch(e => {
		if (!DISCORD_TOKEN) {
			console.error('DISCORD_TOKEN was not defined. Make sure it exists in your .env file.');
		}
		console.error(e);
	});
