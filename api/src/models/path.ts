import { Schema, model } from 'mongoose';

const pathSchema = new Schema({
    artist: String,
    cardNumber: String,
    imageUrl: String,
    name: {
        type: String,
        required: true,
    },
    pathDefense: Number,
    pathNumber: Number,
    text: String,
    victoryPoints: Number,
});

export const Path = model('Path', pathSchema);
