import { EmbedBuilder } from "discord.js";

export enum EmbedType {
    TEXT = 0,
    IMAGE = 1,
}

export function buildTextEmbed(name: string, type: string, text: string, imageUrl: string) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(name)
        .setURL(imageUrl)
        .setDescription(`${type}\n${text}`)
        .setThumbnail(imageUrl);
}

export function buildImageEmbed(name: string, imageUrl: string) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(name)
        .setURL(imageUrl)
        .setImage(imageUrl);
}
