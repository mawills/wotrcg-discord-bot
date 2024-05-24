import { Client, Events, GatewayIntentBits, Message, TextChannel } from 'discord.js';
import Messenger from './messenger.js';

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
        client.on('message', (msg: Message) => {
            console.log(msg.content);
            const messenger = new Messenger(client, msg);
            messenger.send();
        })
        client.login(token)
        return client;
    }
}
