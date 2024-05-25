import { EmbedBuilder } from "discord.js";

export enum EmbedType {
    TEXT = 0,
    IMAGE = 1,
}

export function buildTextEmbed(name: string, type: string, text: string, imageUrl: string) {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(name)
        .setURL('https://discord.js.org/')
        .setDescription(`${type}\n${text}`)
        // .setThumbnail(imageUrl)
        .setThumbnail('https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg')
}

export function buildImageEmbed(name: string, imageUrl: string) {
    return new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(name)
    .setURL('https://discord.js.org/')
    // .setImage(imageUrl)
    .setThumbnail('https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg')
}
