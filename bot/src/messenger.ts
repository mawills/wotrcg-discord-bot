import { Client, EmbedBuilder, Message } from 'discord.js';
import { buildImageEmbed, buildTextEmbed, EmbedType } from './embed';

type Match = {
    cardName: string;
    embedType: EmbedType
}

export default class Messenger {
    promises: Promise<any>[];
    matches: Match[];
    client: Client;
    msg: Message
    pattern: RegExp;
    constructor(client: Client, msg: Message) {
        this.promises = [];
        this.matches = [];
        this.client = client;
        this.msg = msg;
        this.pattern = /\[\[([^\]]+)\]\]/g;
    }

    parse(msg: Message) {
        const matches = msg.content.match(this.pattern);

        console.log(matches);

        if (matches) {
            matches.forEach((match: string) => {
                // Remove surrounding brackets "[[cardName]]""
                let cardName = match.slice(2, -2);

                // Check if cardName begins with "!", this is a special command to return an Image Response.
                const isImageResponse = cardName[0] === '!';
                if (isImageResponse) {
                    cardName = cardName.substring(1);
                    this.matches.push({ cardName, embedType: EmbedType.IMAGE });
                }

                this.matches.push({ cardName, embedType: EmbedType.TEXT });
            });
        }
    }

    send() {
        this.parse(this.msg);
        let embeds: EmbedBuilder[] = [];
        this.matches.map(async (match: Match) => {
            const params = new URLSearchParams({ name: match.cardName })
            await fetch(`${process.env.API_BASE_URL}/api/search?${params.toString()}`)
            .then(response => response.json())
            .then(card => {
                if (match.embedType == EmbedType.TEXT) {
                    embeds.push(buildTextEmbed(card.name, card.type, card.text, card.imageUrl));
                } else if (match.embedType == EmbedType.IMAGE) {
                    embeds.push(buildImageEmbed(card.name, card.imageUrl));
                }
            })
            .catch(e => {
                console.error(e);
            })
        })

        this.msg.channel.send({ embeds: embeds });    
    }
}
