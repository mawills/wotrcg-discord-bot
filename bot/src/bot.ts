import { Client, Events, GatewayIntentBits, } from 'discord.js';
import Parser from './parser.js';

export default class Palantir {
    token: string;
    client: Client;
    constructor(token: string) {
        this.token = token;
        this.client = this.initializeClient(token);
    }

    initializeClient(token: string) {
        const client = new Client({ intents: [GatewayIntentBits.Guilds] });
        client.once(Events.ClientReady, (readyClient: Client) => {
            if (readyClient.user) {
                console.log(`Ready! Logged in as ${readyClient.user.tag}`);
            } else {
                console.error('client user not found.');
            }
        });
        client.on('message', (msg: any) => {
            new Parser(client, msg);
        })
        client.login(token)
        return client;
    }
}
