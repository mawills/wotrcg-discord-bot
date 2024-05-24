import '@dotenvx/dotenvx';
import Palantir from './bot';

if (!process.env.DISCORD_TOKEN) {
	console.log('Error: Specify DISCORD_TOKEN in .env');
	process.exit(1);
}

if (!process.env.API_BASE_URL) {
	console.error('Error: Specify API_BASE_URL in .env');
	process.exit(1);
}

new Palantir(process.env.DISCORD_TOKEN);
