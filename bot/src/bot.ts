import { Client, Events, GatewayIntentBits, Message } from 'discord.js';
import Messenger from './messenger.js';

export default class Palantir {
    token: string;
    client: Client;
    constructor(token: string) {
        this.token = token;
        this.client = this.initializeClient(token);
    }

    initializeClient(token: string) {
        const client = new Client({ intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ] });

        client.once(Events.ClientReady, (readyClient: Client) => {
            readyClient.user
            ? console.log(`Ready! Logged in as ${readyClient.user.tag}`)
            : console.error('client user not found.')
        });

        client.on('messageCreate', (msg: Message) => {
            if (!msg.author.bot) {
                if (msg.content == "ping") {
                    msg.reply("pong");
                }
                const messenger = new Messenger(client, msg);
                messenger.send();
            }
        })

        client.login(token)

        return client;
    }
}
