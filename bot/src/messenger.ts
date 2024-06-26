import { Client, EmbedBuilder, Message } from 'discord.js';
import { buildImageEmbed, buildTextEmbed, EmbedType } from './embed';

type Match = {
    cardName: string;
    embedType: EmbedType;
}

type CardData = {
    name: string;
    imageUrl: string;
    embedType: EmbedType;
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
        parsedMatches.forEach(match => {
            promises.push(this.getData(match.cardName, match.embedType));
        });

        const responses: CardData|undefined[] = await Promise.all(promises);
        const embeds: EmbedBuilder[] = [];
        responses.forEach(card => {
            if (card) {
                embeds.push(this.buildEmbed(card));
            }
        })

        return embeds;
    }

    async getData(query: string, embedType: EmbedType) {
        const params = new URLSearchParams({ q: query });
        return await fetch(`${process.env.API_BASE_URL}/api/search?${params.toString()}`)
        .then(res => {
            if (!res.ok) {
                console.log(`Failed to find query: ${query}`);
            } else {
                return res.json();
            }
        })
        .then(res => {
            if (res) {
                res.embedType = embedType
                return res;
            }
        })
        .catch(e => console.error(e));
    }

    buildEmbed(card: any) {
        if (card.embedType == EmbedType.TEXT) {
            return buildTextEmbed(card.name, card.type, card.text, card.imageUrl);
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

                // Check if cardName begins with "!", this is a special command to return a TextEmbed.
                const isTextEmbed = cardName[0] === '!';
                if (isTextEmbed) {
                    cardName = cardName.substring(1);
                    parsedMatches.push({ cardName, embedType: EmbedType.TEXT });
                } else {
                    parsedMatches.push({ cardName, embedType: EmbedType.IMAGE });
                }
            });
        }
        return parsedMatches;
    }

    async send() {
        const resolvedMatches = await this.processMatches();
        if (resolvedMatches.length > 0) {
            this.msg.channel.send({ embeds: resolvedMatches });
        }
    }
}
