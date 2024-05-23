import '@dotenvx/dotenvx';
import Palantir from './bot.js';

if (!process.env.DISCORD_TOKEN) {
	console.log('Error: Specify DISCORD_TOKEN in .env');
	process.exit(1);
}

new Palantir(process.env.DISCORD_TOKEN);
