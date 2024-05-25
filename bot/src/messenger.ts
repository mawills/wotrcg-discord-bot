import { Client, EmbedBuilder, Message } from 'discord.js';
import { buildImageEmbed, buildTextEmbed, EmbedType } from './embed';

type Match = {
    cardName: string;
    embedType: EmbedType
}

export default class Messenger {
    client: Client;
    msg: Message;
    pattern: RegExp;
    matches: RegExpMatchArray|null;
    constructor(client: Client, msg: Message) {
        this.client = client;
        this.msg = msg;
        this.pattern = /\[\[([^\]]+)\]\]/g;
        this.matches = msg.content.match(this.pattern);
    }

    async processMatches() {
        const parsedMatches = this.parseMatches();

        const promises: Promise<any>[] = [];
        const embedTypeStack: EmbedType[] = [];
        parsedMatches.forEach(match => {
            promises.push(this.getData(match.cardName));
            embedTypeStack.push(match.embedType);
        });

        const data = await Promise.all(promises);
        const embeds: EmbedBuilder[] = [];
        data.forEach(card => {
            const embedType = embedTypeStack.pop() ?? EmbedType.IMAGE;
            embeds.push(this.buildEmbed(card, embedType));
        })

        return embeds;
    }

    async getData(query: string) {
        const params = new URLSearchParams({ name: query });
        return await fetch(`${process.env.API_BASE_URL}/api/search?${params.toString()}`)
        .then(response => response.json())
        .catch(e => console.error(e));
    }

    buildEmbed(card: any, embedType: EmbedType) {
        if (embedType == EmbedType.TEXT) {
            const result = buildTextEmbed(card.name, card.type, card.text, card.imageUrl);
            return result;
        } else {
            return buildImageEmbed(card.name, card.imageUrl);
        }
    }

    parseMatches() {
        const parsedMatches: Match[] = [];
        if (this.matches) {
            this.matches.forEach((match: string) => {
                // Remove surrounding brackets "[[cardName]]""
                let cardName = match.slice(2, -2);

                // Check if cardName begins with "!", this is a special command to return an ImageEmbed.
                const isImageEmbed = cardName[0] === '!';
                if (isImageEmbed) {
                    cardName = cardName.substring(1);
                    parsedMatches.push({ cardName, embedType: EmbedType.IMAGE });
                }

                parsedMatches.push({ cardName, embedType: EmbedType.TEXT });
            });
        }
        return parsedMatches;
    }

    async send() {
        const resolvedMatches = await this.processMatches();
        console.log('RESOLVED MATCHES: ', resolvedMatches);
        if (resolvedMatches) {
            this.msg.channel.send({ embeds: resolvedMatches });
        }
    }
}
