import { EmbedBuilder } from "discord.js";

export enum EmbedType {
    TEXT = 0,
    IMAGE = 1,
}

// todo: for development purposes, delete me.
const PLACEHOLDER = `https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg`;

export function buildTextEmbed(name: string, type: string, text: string, imageUrl: string) {
    /**
     * Discord caches embeds based on URL. Without this hack, the Text/Image embeds
     * for a single card will be messed up, and also it's impossible to have multiple
     * embeds in a single message.
     * 
     * When we are using real data, this will no longer be required.
     */
    const t = new Date().getTime();
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(name)
        .setURL(`${PLACEHOLDER}?t=${t}`)
        .setDescription(`${type}\n${text}`)
        .setThumbnail(`${PLACEHOLDER}?t=${t}`);
}

export function buildImageEmbed(name: string, imageUrl: string) {
    /**
     * Discord caches embeds based on URL. Without this hack, the Text/Image embeds
     * for a single card will be messed up, and also it's impossible to have multiple
     * embeds in a single message.
     * 
     * When we are using real data, this will no longer be required.
     */
    const t = new Date().getTime();
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(name)
        .setURL(`${PLACEHOLDER}?t=${t}`)
        .setImage(`${PLACEHOLDER}?t=${t}`);
}
